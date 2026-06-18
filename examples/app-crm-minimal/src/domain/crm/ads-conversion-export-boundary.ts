import type { InMemoryCrmRepository } from "./in-memory-crm-repository";
import type {
  AuditAction,
  AuditLog,
  Contact,
  CrmCollectionName,
  SourceAttribution,
} from "./types";

export type AdsConversionEventName =
  | "Lead Created"
  | "MQL"
  | "SQL"
  | "Assessment Scheduled"
  | "Contract Closed"
  | "Revenue Initial"
  | "Renewal";

export type AdsExportBlockedReason =
  | "marketing_consent_not_granted"
  | "do_not_contact"
  | "missing_contact"
  | "missing_allowed_identifier"
  | "sensitive_metadata_present";

export interface AdsConversionSourceRef {
  auditLogId: string;
  auditAction: AuditAction;
  entityType: CrmCollectionName;
  entityId: string;
  contactId?: string;
}

export interface AdsConversionPayload {
  eventName: AdsConversionEventName;
  conversionTimestamp: string;
  attributionIdentifiers: AdsAttributionIdentifiers;
  userIdentifiers?: AdsUserIdentifiers;
  valueCents?: number;
  currency?: "BRL";
}

export interface AdsAttributionIdentifiers {
  channel?: SourceAttribution["channel"];
  campaign?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  latestChannel?: SourceAttribution["channel"];
  latestCampaign?: string;
  latestUtmSource?: string;
  latestUtmMedium?: string;
  latestUtmCampaign?: string;
  latestUtmContent?: string;
  latestUtmTerm?: string;
  latestGclid?: string;
  latestGbraid?: string;
  latestWbraid?: string;
}

export interface AdsUserIdentifiers {
  normalizedEmail?: string;
  normalizedPhoneE164?: string;
}

export interface AdsConversionExportableEvent {
  status: "exportable";
  source: AdsConversionSourceRef;
  payload: AdsConversionPayload;
}

export interface AdsConversionBlockedEvent {
  status: "ads_export_blocked";
  reason: AdsExportBlockedReason;
  source: AdsConversionSourceRef;
}

export type AdsConversionExportEvent =
  | AdsConversionExportableEvent
  | AdsConversionBlockedEvent;

interface CandidateAdsConversionEvent {
  eventName: AdsConversionEventName;
  auditLog: AuditLog;
  valueCents?: number;
}

const sensitiveMetadataKeys = new Set([
  "clinicalnote",
  "clinicalnotes",
  "symptom",
  "symptoms",
  "exam",
  "exams",
  "examresult",
  "examresults",
  "medication",
  "medications",
  "hormone",
  "hormones",
  "diagnosis",
  "diagnoses",
  "adverseevent",
  "adverseevents",
]);

export const buildAdsConversionExportBoundary = (
  repository: InMemoryCrmRepository,
): AdsConversionExportEvent[] => {
  return repository.listAuditLogs().flatMap((auditLog) => {
    return candidatesFromAuditLog(repository, auditLog).map((candidate) =>
      buildExportEvent(repository, candidate),
    );
  });
};

const buildExportEvent = (
  repository: InMemoryCrmRepository,
  candidate: CandidateAdsConversionEvent,
): AdsConversionExportEvent => {
  const source = sourceRefFromAuditLog(candidate.auditLog);

  if (hasSensitiveMetadata(candidate.auditLog.metadata)) {
    return {
      status: "ads_export_blocked",
      reason: "sensitive_metadata_present",
      source,
    };
  }

  const contact = source.contactId
    ? repository.getContact(source.contactId)
    : undefined;

  if (!contact) {
    return {
      status: "ads_export_blocked",
      reason: "missing_contact",
      source,
    };
  }

  if (contact.communicationPreferences.doNotContact) {
    return {
      status: "ads_export_blocked",
      reason: "do_not_contact",
      source,
    };
  }

  if (!repository.canSendMarketingCommunication(contact.id)) {
    return {
      status: "ads_export_blocked",
      reason: "marketing_consent_not_granted",
      source,
    };
  }

  const attributionIdentifiers = buildAttributionIdentifiers(
    repository,
    candidate.auditLog,
    contact.id,
  );
  const userIdentifiers = buildUserIdentifiers(contact);

  if (
    !hasAnyIdentifier(attributionIdentifiers) &&
    !hasAnyIdentifier(userIdentifiers)
  ) {
    return {
      status: "ads_export_blocked",
      reason: "missing_allowed_identifier",
      source,
    };
  }

  return {
    status: "exportable",
    source,
    payload: {
      eventName: candidate.eventName,
      conversionTimestamp: candidate.auditLog.createdAt,
      attributionIdentifiers,
      ...(hasAnyIdentifier(userIdentifiers) ? { userIdentifiers } : {}),
      ...(typeof candidate.valueCents === "number"
        ? { valueCents: candidate.valueCents, currency: "BRL" as const }
        : {}),
    },
  };
};

const candidatesFromAuditLog = (
  repository: InMemoryCrmRepository,
  auditLog: AuditLog,
): CandidateAdsConversionEvent[] => {
  if (auditLog.action === "lead.created") {
    return [{ eventName: "Lead Created", auditLog }];
  }

  if (auditLog.action === "lifecycle_stage.changed") {
    if (auditLog.to === "mql") {
      return [{ eventName: "MQL", auditLog }];
    }

    if (auditLog.to === "sql") {
      return [{ eventName: "SQL", auditLog }];
    }
  }

  if (auditLog.action === "deal_stage.changed") {
    if (auditLog.to === "medical_review_pending") {
      return [{ eventName: "Assessment Scheduled", auditLog }];
    }

    if (auditLog.to === "won") {
      const deal = repository.getDeal(auditLog.entityId);

      return [
        {
          eventName: "Contract Closed",
          auditLog,
          valueCents: deal?.valueCents,
        },
      ];
    }

    if (auditLog.to === "renewed") {
      const deal = repository.getDeal(auditLog.entityId);

      return [
        {
          eventName: "Renewal",
          auditLog,
          valueCents: deal?.valueCents,
        },
      ];
    }
  }

  if (auditLog.action === "contract.created") {
    const contract = repository.getContract(auditLog.entityId);

    return [
      {
        eventName: "Contract Closed",
        auditLog,
        valueCents: contract?.valueCents,
      },
      {
        eventName: "Revenue Initial",
        auditLog,
        valueCents: contract?.valueCents,
      },
    ];
  }

  if (
    auditLog.action === "contract_status.changed" &&
    auditLog.to === "renewed"
  ) {
    const contract = repository.getContract(auditLog.entityId);

    return [
      {
        eventName: "Renewal",
        auditLog,
        valueCents: contract?.valueCents,
      },
    ];
  }

  return [];
};

const buildAttributionIdentifiers = (
  repository: InMemoryCrmRepository,
  auditLog: AuditLog,
  contactId: string,
): AdsAttributionIdentifiers => {
  const attribution = getPrimarySourceAttribution(repository, auditLog, contactId);

  if (!attribution) {
    return {};
  }

  return stripUndefined({
    channel: attribution.channel,
    campaign: attribution.campaign,
    utmSource: attribution.utmSource,
    utmMedium: attribution.utmMedium,
    utmCampaign: attribution.utmCampaign,
    utmContent: attribution.utmContent,
    utmTerm: attribution.utmTerm,
    gclid: attribution.gclid,
    gbraid: attribution.gbraid,
    wbraid: attribution.wbraid,
    latestChannel: attribution.latestChannel,
    latestCampaign: attribution.latestCampaign,
    latestUtmSource: attribution.latestUtmSource,
    latestUtmMedium: attribution.latestUtmMedium,
    latestUtmCampaign: attribution.latestUtmCampaign,
    latestUtmContent: attribution.latestUtmContent,
    latestUtmTerm: attribution.latestUtmTerm,
    latestGclid: attribution.latestGclid,
    latestGbraid: attribution.latestGbraid,
    latestWbraid: attribution.latestWbraid,
  });
};

const getPrimarySourceAttribution = (
  repository: InMemoryCrmRepository,
  auditLog: AuditLog,
  contactId: string,
): SourceAttribution | undefined => {
  const ids = getSourceAttributionIds(repository, auditLog);

  for (const id of ids) {
    const attribution = repository.getSourceAttribution(id);

    if (attribution) {
      return attribution;
    }
  }

  return repository
    .listSourceAttributionsByContact(contactId)
    .sort((left, right) => left.firstTouchAt.localeCompare(right.firstTouchAt))[0];
};

const getSourceAttributionIds = (
  repository: InMemoryCrmRepository,
  auditLog: AuditLog,
): string[] => {
  if (auditLog.entityType === "leads") {
    return repository.getLead(auditLog.entityId)?.sourceAttributionIds ?? [];
  }

  if (auditLog.entityType === "deals") {
    return repository.getDeal(auditLog.entityId)?.sourceAttributionIds ?? [];
  }

  if (auditLog.entityType === "contracts") {
    return repository.getContract(auditLog.entityId)?.sourceAttributionIds ?? [];
  }

  return [];
};

const buildUserIdentifiers = (contact: Contact): AdsUserIdentifiers => {
  return stripUndefined({
    normalizedEmail: normalizeEmail(contact.email),
    normalizedPhoneE164: normalizeBrazilPhoneToE164(contact.phone),
  });
};

const normalizeEmail = (email: string | undefined): string | undefined => {
  const normalized = email?.trim().toLowerCase();

  return normalized || undefined;
};

const normalizeBrazilPhoneToE164 = (
  phone: string | undefined,
): string | undefined => {
  const digits = phone?.replace(/\D/g, "");

  if (!digits) {
    return undefined;
  }

  const withoutInternationalPrefix = digits.startsWith("00")
    ? digits.slice(2)
    : digits;
  const withBrazilCountryCode = withoutInternationalPrefix.startsWith("55")
    ? withoutInternationalPrefix
    : `55${withoutInternationalPrefix}`;

  return `+${withBrazilCountryCode}`;
};

const hasSensitiveMetadata = (metadata: AuditLog["metadata"]): boolean => {
  if (!metadata) {
    return false;
  }

  return Object.keys(metadata).some((key) =>
    sensitiveMetadataKeys.has(normalizeMetadataKey(key)),
  );
};

const normalizeMetadataKey = (key: string): string =>
  key.toLowerCase().replace(/[^a-z]/g, "");

const sourceRefFromAuditLog = (auditLog: AuditLog): AdsConversionSourceRef => ({
  auditLogId: auditLog.id,
  auditAction: auditLog.action,
  entityType: auditLog.entityType,
  entityId: auditLog.entityId,
  contactId: auditLog.contactId,
});

const hasAnyIdentifier = (value: Record<string, unknown>): boolean =>
  Object.values(value).some((identifier) => identifier !== undefined);

const stripUndefined = <T extends Record<string, unknown>>(value: T): T => {
  return Object.fromEntries(
    Object.entries(value).filter(([, entry]) => entry !== undefined),
  ) as T;
};
