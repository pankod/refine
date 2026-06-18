import { describe, expect, it } from "vitest";

import {
  buildAdsConversionExportBoundary,
  contractPlanTypes,
  createContractFromDeal,
  createInMemoryCrmRepository,
  createLeadWithAttribution,
  dealStages,
  lifecycleStages,
  listPipelineDeals,
  markContractsDueForRenewal,
  moveDealThroughPipeline,
  moveLeadToDeal,
  recordAttributionTouch,
} from ".";

describe("CRM lead → deal → contract domain model", () => {
  it("declares the lifecycle, deal pipeline, and contract plan vocabulary", () => {
    expect(lifecycleStages).toEqual([
      "subscriber",
      "lead",
      "mql",
      "sql",
      "opportunity",
      "patient",
      "active_care",
      "renewal_due",
      "retained",
      "inactive",
      "lost",
      "do_not_contact",
    ]);

    expect(dealStages).toEqual([
      "new_lead",
      "qualification",
      "medical_review_pending",
      "medical_review_completed",
      "proposal_requested",
      "proposal_sent",
      "negotiation",
      "payment_pending",
      "won",
      "contract_active",
      "renewal_due",
      "renewed",
      "lost",
    ]);

    expect(contractPlanTypes).toEqual(["monthly", "semiannual", "annual"]);
  });

  it("can create and read every first-slice entity in the in-memory persistence layer", () => {
    const repository = createInMemoryCrmRepository({
      clock: () => new Date("2026-06-18T00:00:00.000Z"),
    });

    const contact = repository.createContact({
      fullName: "Lead LuzPerformance",
      email: "lead@example.com",
    });
    const attribution = repository.createSourceAttribution({
      contactId: contact.id,
      channel: "blog",
      campaign: "artigo-hipertrofia-segura",
      utmSource: "luzperformance-blog",
      utmMedium: "organic",
      utmCampaign: "crm-issue-3",
    });
    const lead = repository.createLead({
      contactId: contact.id,
      lifecycleStage: "mql",
      sourceAttributionIds: [attribution.id],
      interest: "Acompanhamento médico para performance com redução de danos",
    });
    const deal = repository.createDeal({
      contactId: contact.id,
      leadId: lead.id,
      stage: "proposal_sent",
      sourceAttributionIds: [attribution.id],
      title: "Consultoria semestral LuzPerformance",
      valueCents: 600000,
    });
    const contract = repository.createContract({
      contactId: contact.id,
      dealId: deal.id,
      planType: "semiannual",
      sourceAttributionIds: [attribution.id],
      startDate: "2026-06-18",
      endDate: "2026-12-18",
      renewalDueAt: "2026-12-18",
      valueCents: 600000,
    });
    const task = repository.createTask({
      contactId: contact.id,
      leadId: lead.id,
      dealId: deal.id,
      contractId: contract.id,
      title: "Agendar follow-up operacional",
      dueAt: "2026-06-20T12:00:00.000Z",
    });
    const consent = repository.createConsent({
      contactId: contact.id,
      purpose: "marketing",
      source: "landing-page-lgpd-checkbox",
      grantedAt: "2026-06-18T00:00:00.000Z",
    });
    const auditLog = repository.createAuditLog({
      actorId: "test-agent",
      action: "deal_stage.changed",
      entityType: "deals",
      entityId: deal.id,
      contactId: contact.id,
      from: "proposal_sent",
      to: "won",
    });

    expect(repository.getContact(contact.id)).toMatchObject({
      id: contact.id,
      fullName: contact.fullName,
      email: contact.email,
      lifecycleStage: "active_care",
    });
    expect(repository.getSourceAttribution(attribution.id)).toMatchObject(
      attribution,
    );
    expect(repository.getLead(lead.id)).toMatchObject(lead);
    expect(repository.getDeal(deal.id)).toMatchObject(deal);
    expect(repository.getContract(contract.id)).toMatchObject(contract);
    expect(repository.getTask(task.id)).toMatchObject(task);
    expect(repository.getConsent(consent.id)).toMatchObject(consent);
    expect(repository.getAuditLog(auditLog.id)).toMatchObject(auditLog);
  });

  it("stores LGPD consent records with purpose, source, timestamp, and status", () => {
    const repository = createInMemoryCrmRepository({
      clock: () => new Date("2026-06-18T10:00:00.000Z"),
    });
    const contact = repository.createContact({
      fullName: "Lead com consentimento LGPD",
      email: "lgpd@example.com",
    });

    const consent = repository.createConsent({
      contactId: contact.id,
      purpose: "marketing",
      source: "formulario-blog",
      decidedAt: "2026-06-18T09:45:00.000Z",
    });

    expect(consent).toMatchObject({
      contactId: contact.id,
      purpose: "marketing",
      source: "formulario-blog",
      decidedAt: "2026-06-18T09:45:00.000Z",
      status: "granted",
      grantedAt: "2026-06-18T09:45:00.000Z",
    });
    expect(repository.listAuditLogs()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          action: "consent.created",
          entityType: "consents",
          entityId: consent.id,
          contactId: contact.id,
          metadata: {
            purpose: "marketing",
            source: "formulario-blog",
            status: "granted",
          },
        }),
      ]),
    );
  });

  it("blocks marketing communication for opt-out and do-not-contact contacts", () => {
    const repository = createInMemoryCrmRepository({
      clock: () => new Date("2026-06-18T10:00:00.000Z"),
    });
    const marketingContact = repository.createContact({
      fullName: "Lead com marketing permitido",
      email: "marketing@example.com",
    });
    repository.createConsent({
      contactId: marketingContact.id,
      purpose: "marketing",
      source: "whatsapp-opt-in",
    });

    expect(
      repository.canSendMarketingCommunication(marketingContact.id),
    ).toBe(true);

    const optedOut = repository.markMarketingOptOut(marketingContact.id, {
      actorId: "dr-vinicius",
      source: "pedido-whatsapp",
      changedAt: "2026-06-18T10:05:00.000Z",
    });

    expect(optedOut.communicationPreferences).toMatchObject({
      marketingOptOut: true,
      marketingOptedOutAt: "2026-06-18T10:05:00.000Z",
    });
    expect(
      repository.canSendMarketingCommunication(marketingContact.id),
    ).toBe(false);

    const operationalPaused = repository.setOperationalCommunicationPermission(
      marketingContact.id,
      false,
      {
        actorId: "dr-vinicius",
        source: "preferencia-do-lead",
        changedAt: "2026-06-18T10:06:00.000Z",
      },
    );

    expect(operationalPaused.communicationPreferences).toMatchObject({
      operationalCommunicationAllowed: false,
      operationalCommunicationUpdatedAt: "2026-06-18T10:06:00.000Z",
    });
    expect(
      repository.canSendOperationalCommunication(marketingContact.id),
    ).toBe(false);

    const doNotContactLead = repository.createContact({
      fullName: "Lead bloqueado para contato",
      email: "dnc@example.com",
    });
    repository.createConsent({
      contactId: doNotContactLead.id,
      purpose: "marketing",
      source: "landing-page",
    });

    const blocked = repository.markDoNotContact(doNotContactLead.id, {
      actorId: "dr-vinicius",
      source: "pedido-explicito",
      changedAt: "2026-06-18T10:10:00.000Z",
    });

    expect(blocked.communicationPreferences).toMatchObject({
      doNotContact: true,
      doNotContactAt: "2026-06-18T10:10:00.000Z",
    });
    expect(repository.getContact(doNotContactLead.id)?.lifecycleStage).toBe(
      "do_not_contact",
    );
    expect(
      repository.canSendMarketingCommunication(doNotContactLead.id),
    ).toBe(false);
    expect(
      repository.canSendOperationalCommunication(doNotContactLead.id),
    ).toBe(false);

    expect(repository.listAuditLogs()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          actorId: "dr-vinicius",
          action: "communication_preferences.changed",
          entityType: "contacts",
          entityId: marketingContact.id,
          contactId: marketingContact.id,
          from: "false",
          to: "true",
          metadata: {
            preference: "marketingOptOut",
            source: "pedido-whatsapp",
          },
        }),
        expect.objectContaining({
          actorId: "dr-vinicius",
          action: "communication_preferences.changed",
          entityType: "contacts",
          entityId: doNotContactLead.id,
          contactId: doNotContactLead.id,
          from: "false",
          to: "true",
          metadata: {
            preference: "doNotContact",
            source: "pedido-explicito",
          },
        }),
        expect.objectContaining({
          actorId: "dr-vinicius",
          action: "communication_preferences.changed",
          entityType: "contacts",
          entityId: marketingContact.id,
          contactId: marketingContact.id,
          from: "true",
          to: "false",
          metadata: {
            preference: "operationalCommunicationAllowed",
            source: "preferencia-do-lead",
          },
        }),
      ]),
    );
  });

  it("audits consent status changes and updates marketing eligibility", () => {
    const repository = createInMemoryCrmRepository({
      clock: () => new Date("2026-06-18T10:00:00.000Z"),
    });
    const contact = repository.createContact({
      fullName: "Lead revogando consentimento",
      email: "revoga@example.com",
    });
    const consent = repository.createConsent({
      contactId: contact.id,
      purpose: "marketing",
      source: "formulario-blog",
    });

    const revoked = repository.updateConsentStatus(consent.id, "revoked", {
      actorId: "dr-vinicius",
      source: "pedido-whatsapp",
      decidedAt: "2026-06-18T10:15:00.000Z",
    });

    expect(revoked).toMatchObject({
      status: "revoked",
      source: "pedido-whatsapp",
      decidedAt: "2026-06-18T10:15:00.000Z",
      revokedAt: "2026-06-18T10:15:00.000Z",
    });
    expect(repository.canSendMarketingCommunication(contact.id)).toBe(false);
    expect(repository.listAuditLogs()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          actorId: "dr-vinicius",
          action: "consent.status_changed",
          entityType: "consents",
          entityId: consent.id,
          contactId: contact.id,
          from: "granted",
          to: "revoked",
          metadata: {
            purpose: "marketing",
            source: "pedido-whatsapp",
          },
        }),
      ]),
    );
  });

  it("moves a lead into a deal and then a contract while preserving attribution and audit", () => {
    const repository = createInMemoryCrmRepository({
      clock: () => new Date("2026-06-18T00:00:00.000Z"),
    });

    const { contact, lead, attribution } = createLeadWithAttribution(
      repository,
      {
        contact: {
          fullName: "Paciente Operacional",
          phone: "+5548999999999",
        },
        attribution: {
          channel: "ads",
          campaign: "avaliacao-performance-responsavel",
          landingPage: "/lp/performance",
          utmSource: "meta",
          utmMedium: "paid_social",
          utmCampaign: "avaliacao-responsavel",
        },
        lead: {
          lifecycleStage: "sql",
          interest: "Quer entender acompanhamento médico antes de contrato",
        },
      },
    );

    const deal = moveLeadToDeal(repository, lead.id, {
      title: "Avaliação + acompanhamento anual",
      stage: "won",
      valueCents: 1200000,
      expectedCloseDate: "2026-06-25",
    });

    const contract = createContractFromDeal(repository, deal.id, {
      planType: "annual",
      startDate: "2026-07-01",
      valueCents: 1200000,
    });

    expect(deal.contactId).toBe(contact.id);
    expect(contract.dealId).toBe(deal.id);
    expect(contract.endDate).toBe("2027-07-01");
    expect(contract.renewalDueAt).toBe("2027-07-01");
    expect(deal.sourceAttributionIds).toEqual([attribution.id]);
    expect(contract.sourceAttributionIds).toEqual([attribution.id]);
    expect(repository.getDeal(deal.id)?.stage).toBe("contract_active");
    expect(repository.getContact(contact.id)?.lifecycleStage).toBe(
      "active_care",
    );

    expect(repository.listByContact("tasks", contact.id)).toEqual([
      expect.objectContaining({
        contactId: contact.id,
        dealId: deal.id,
        contractId: contract.id,
        title: "Preparar renovação do contrato anual entre os meses 10 e 11",
        dueAt: "2027-05-01T12:00:00.000Z",
        status: "open",
      }),
    ]);

    expect(repository.listAuditLogs()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          action: "lead.created",
          entityType: "leads",
          entityId: lead.id,
          contactId: contact.id,
        }),
        expect.objectContaining({
          action: "deal.created",
          entityType: "deals",
          entityId: deal.id,
          contactId: contact.id,
        }),
        expect.objectContaining({
          action: "contract.created",
          entityType: "contracts",
          entityId: contract.id,
          contactId: contact.id,
        }),
        expect.objectContaining({
          action: "deal_stage.changed",
          entityType: "deals",
          entityId: deal.id,
          contactId: contact.id,
          from: "won",
          to: "contract_active",
        }),
        expect.objectContaining({
          action: "task.created",
          entityType: "tasks",
          contactId: contact.id,
        }),
      ]),
    );
  });

  it("stores first-touch UTM and click IDs when creating a lead", () => {
    const repository = createInMemoryCrmRepository({
      clock: () => new Date("2026-06-18T00:00:00.000Z"),
    });

    const { attribution } = createLeadWithAttribution(repository, {
      contact: {
        fullName: "Lead vindo de mídia paga",
      },
      attribution: {
        channel: "ads",
        campaign: "lp-avaliacao-junho",
        content: "criativo-medico-responsavel",
        landingPage: "https://luzperformance.com.br/lp/performance",
        referrer: "https://google.com/search?q=luzperformance",
        utmSource: "google",
        utmMedium: "cpc",
        utmCampaign: "lp-avaliacao-junho",
        utmContent: "criativo-medico-responsavel",
        utmTerm: "medico-performance",
        gclid: "first-touch-gclid",
        gbraid: "first-touch-gbraid",
        wbraid: "first-touch-wbraid",
      },
    });

    expect(attribution).toMatchObject({
      channel: "ads",
      campaign: "lp-avaliacao-junho",
      content: "criativo-medico-responsavel",
      landingPage: "https://luzperformance.com.br/lp/performance",
      referrer: "https://google.com/search?q=luzperformance",
      utmSource: "google",
      utmMedium: "cpc",
      utmCampaign: "lp-avaliacao-junho",
      utmContent: "criativo-medico-responsavel",
      utmTerm: "medico-performance",
      gclid: "first-touch-gclid",
      gbraid: "first-touch-gbraid",
      wbraid: "first-touch-wbraid",
      latestChannel: "ads",
      latestUtmSource: "google",
      latestUtmTerm: "medico-performance",
      latestGclid: "first-touch-gclid",
      firstTouchAt: "2026-06-18T00:00:00.000Z",
      lastTouchAt: "2026-06-18T00:00:00.000Z",
    });
  });

  it("preserves first-touch attribution while latest-touch source updates through the deal", () => {
    const touchDates = [
      "2026-06-18T00:00:00.000Z",
      "2026-06-19T00:00:00.000Z",
    ];
    const repository = createInMemoryCrmRepository({
      clock: () => new Date(touchDates.shift() ?? "2026-06-20T00:00:00.000Z"),
    });
    const { contact, lead, attribution: firstTouch } = createLeadWithAttribution(
      repository,
      {
        contact: {
          fullName: "Lead com múltiplos toques",
        },
        attribution: {
          channel: "ads",
          campaign: "meta-junho",
          landingPage: "https://luzperformance.com.br/lp/performance",
          utmSource: "meta",
          utmMedium: "paid_social",
          utmCampaign: "meta-junho",
          gclid: "gclid-original",
        },
      },
    );

    const latestTouch = recordAttributionTouch(repository, {
      contactId: contact.id,
      attribution: {
        channel: "organic",
        landingPage: "https://luzperformance.com.br/blog/performance-segura",
        referrer: "https://google.com/search?q=performance+segura",
        utmSource: "google",
        utmMedium: "organic",
        utmCampaign: "blog-performance-segura",
      },
    });
    const deal = moveLeadToDeal(repository, lead.id, {
      title: "Acompanhamento semestral",
      stage: "proposal_sent",
      valueCents: 600000,
    });

    expect(latestTouch.id).toBe(firstTouch.id);
    expect(latestTouch).toMatchObject({
      channel: "ads",
      campaign: "meta-junho",
      utmSource: "meta",
      utmMedium: "paid_social",
      utmCampaign: "meta-junho",
      gclid: "gclid-original",
      latestChannel: "organic",
      latestLandingPage:
        "https://luzperformance.com.br/blog/performance-segura",
      latestReferrer: "https://google.com/search?q=performance+segura",
      latestUtmSource: "google",
      latestUtmMedium: "organic",
      latestUtmCampaign: "blog-performance-segura",
      firstTouchAt: "2026-06-18T00:00:00.000Z",
      lastTouchAt: "2026-06-19T00:00:00.000Z",
    });
    expect(deal.sourceAttributionIds).toEqual([firstTouch.id]);
  });

  it("does not let internal blog navigation overwrite original campaign attribution", () => {
    const repository = createInMemoryCrmRepository({
      clock: () => new Date("2026-06-18T00:00:00.000Z"),
    });
    const { contact, attribution: firstTouch } = createLeadWithAttribution(
      repository,
      {
        contact: {
          fullName: "Lead navegando pelo blog",
        },
        attribution: {
          channel: "ads",
          campaign: "google-search-junho",
          landingPage: "https://luzperformance.com.br/lp/performance",
          referrer: "https://google.com/search?q=terapia+hormonal+segura",
          utmSource: "google",
          utmMedium: "cpc",
          utmCampaign: "google-search-junho",
          gclid: "gclid-canonico",
        },
      },
    );

    const afterInternalNavigation = recordAttributionTouch(repository, {
      contactId: contact.id,
      attribution: {
        channel: "blog",
        landingPage: "https://luzperformance.com.br/blog/artigo-interno",
        referrer: "https://luzperformance.com.br/lp/performance",
      },
    });

    expect(afterInternalNavigation).toEqual(firstTouch);
    expect(repository.getSourceAttribution(firstTouch.id)).toMatchObject({
      channel: "ads",
      campaign: "google-search-junho",
      utmSource: "google",
      utmMedium: "cpc",
      utmCampaign: "google-search-junho",
      gclid: "gclid-canonico",
      latestChannel: "ads",
      latestUtmSource: "google",
      latestGclid: "gclid-canonico",
      firstTouchAt: "2026-06-18T00:00:00.000Z",
      lastTouchAt: "2026-06-18T00:00:00.000Z",
    });
  });

  it("ignores internal site events without referrer before moving attribution to a deal", () => {
    const repository = createInMemoryCrmRepository({
      clock: () => new Date("2026-06-18T00:00:00.000Z"),
    });
    const { contact, lead, attribution: firstTouch } = createLeadWithAttribution(
      repository,
      {
        contact: {
          fullName: "Lead com evento interno sem referrer",
        },
        attribution: {
          channel: "ads",
          campaign: "meta-junho",
          landingPage: "https://luzperformance.com.br/lp/performance",
          referrer: "https://instagram.com/luzperformance",
          utmSource: "meta",
          utmMedium: "paid_social",
          utmCampaign: "meta-junho",
          gbraid: "gbraid-original",
          wbraid: "wbraid-original",
        },
      },
    );

    const internalEvent = recordAttributionTouch(repository, {
      contactId: contact.id,
      attribution: {
        channel: "blog",
        landingPage: "https://luzperformance.com.br/blog/artigo-interno",
      },
    });
    const deal = moveLeadToDeal(repository, lead.id, {
      title: "Acompanhamento com atribuição preservada",
      stage: "proposal_sent",
      valueCents: 600000,
    });

    expect(internalEvent).toEqual(firstTouch);
    expect(deal.sourceAttributionIds).toEqual([firstTouch.id]);
    expect(
      repository.getSourceAttribution(deal.sourceAttributionIds[0]),
    ).toMatchObject({
      channel: "ads",
      campaign: "meta-junho",
      utmSource: "meta",
      utmMedium: "paid_social",
      utmCampaign: "meta-junho",
      gbraid: "gbraid-original",
      wbraid: "wbraid-original",
      latestChannel: "ads",
      latestGbraid: "gbraid-original",
      latestWbraid: "wbraid-original",
      firstTouchAt: "2026-06-18T00:00:00.000Z",
      lastTouchAt: "2026-06-18T00:00:00.000Z",
    });
  });

  it("generates renewal work for monthly, semiannual, and annual contract plans", () => {
    const repository = createInMemoryCrmRepository({
      clock: () => new Date("2026-06-18T00:00:00.000Z"),
    });

    const scenarios = [
      {
        planType: "monthly" as const,
        startDate: "2026-07-01",
        expectedEndDate: "2026-08-01",
        expectedTaskTitle: "Check-in de retenção do contrato mensal",
        expectedTaskDueAt: "2026-07-15T12:00:00.000Z",
      },
      {
        planType: "semiannual" as const,
        startDate: "2026-07-01",
        expectedEndDate: "2027-01-01",
        expectedTaskTitle:
          "Preparar renovação do contrato semestral antes do mês 5",
        expectedTaskDueAt: "2026-11-01T12:00:00.000Z",
      },
      {
        planType: "annual" as const,
        startDate: "2026-07-01",
        expectedEndDate: "2027-07-01",
        expectedTaskTitle:
          "Preparar renovação do contrato anual entre os meses 10 e 11",
        expectedTaskDueAt: "2027-05-01T12:00:00.000Z",
      },
    ];

    for (const scenario of scenarios) {
      const { contact, lead } = createLeadWithAttribution(repository, {
        contact: {
          fullName: `Paciente ${scenario.planType}`,
        },
        attribution: {
          channel: "direct",
        },
      });
      const deal = moveLeadToDeal(repository, lead.id, {
        title: `Contrato ${scenario.planType}`,
        stage: "won",
        valueCents: 100000,
      });

      const contract = createContractFromDeal(repository, deal.id, {
        planType: scenario.planType,
        startDate: scenario.startDate,
        valueCents: 100000,
      });

      expect(contract).toMatchObject({
        planType: scenario.planType,
        status: "active",
        startDate: scenario.startDate,
        endDate: scenario.expectedEndDate,
        renewalDueAt: scenario.expectedEndDate,
      });
      expect(repository.listByContact("tasks", contact.id)).toEqual([
        expect.objectContaining({
          contactId: contact.id,
          dealId: deal.id,
          contractId: contract.id,
          title: scenario.expectedTaskTitle,
          dueAt: scenario.expectedTaskDueAt,
          status: "open",
        }),
      ]);
    }
  });

  it("prevents active contracts from proposal-stage deals", () => {
    const repository = createInMemoryCrmRepository({
      clock: () => new Date("2026-06-18T00:00:00.000Z"),
    });
    const { lead } = createLeadWithAttribution(repository, {
      contact: {
        fullName: "Lead ainda em proposta",
      },
      attribution: {
        channel: "whatsapp_dm",
      },
    });
    const deal = moveLeadToDeal(repository, lead.id, {
      title: "Proposta ainda não ganha",
      stage: "proposal_sent",
      valueCents: 300000,
    });

    expect(() =>
      createContractFromDeal(repository, deal.id, {
        planType: "monthly",
        startDate: "2026-07-01",
        valueCents: 300000,
      }),
    ).toThrow("Contract can only be created from a won or active deal");
  });

  it("marks contracts, deals, and contacts as renewal due when renewal date arrives", () => {
    const repository = createInMemoryCrmRepository({
      clock: () => new Date("2026-06-18T00:00:00.000Z"),
    });
    const { contact, lead } = createLeadWithAttribution(repository, {
      contact: {
        fullName: "Paciente em janela de renovação",
      },
      attribution: {
        channel: "referral",
      },
    });
    const deal = moveLeadToDeal(repository, lead.id, {
      title: "Contrato mensal em renovação",
      stage: "won",
      valueCents: 100000,
    });
    const contract = createContractFromDeal(repository, deal.id, {
      planType: "monthly",
      startDate: "2026-07-01",
      valueCents: 100000,
    });

    expect(markContractsDueForRenewal(repository, "2026-07-31")).toEqual([]);

    expect(markContractsDueForRenewal(repository, "2026-08-01")).toEqual([
      expect.objectContaining({
        id: contract.id,
        status: "renewal_due",
      }),
    ]);
    expect(repository.getContract(contract.id)?.status).toBe("renewal_due");
    expect(repository.getDeal(deal.id)?.stage).toBe("renewal_due");
    expect(repository.getContact(contact.id)?.lifecycleStage).toBe(
      "renewal_due",
    );

    expect(repository.listAuditLogs()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          action: "contract_status.changed",
          entityType: "contracts",
          entityId: contract.id,
          contactId: contact.id,
          from: "active",
          to: "renewal_due",
        }),
        expect.objectContaining({
          action: "deal_stage.changed",
          entityType: "deals",
          entityId: deal.id,
          contactId: contact.id,
          from: "contract_active",
          to: "renewal_due",
        }),
        expect.objectContaining({
          action: "lifecycle_stage.changed",
          entityType: "contacts",
          entityId: contact.id,
          contactId: contact.id,
          from: "active_care",
          to: "renewal_due",
        }),
      ]),
    );
  });

  it("builds a safe offline Ads conversion export boundary from CRM transitions", () => {
    const repository = createInMemoryCrmRepository({
      clock: () => new Date("2026-06-18T12:00:00.000Z"),
    });
    const { contact, lead, attribution } = createLeadWithAttribution(
      repository,
      {
        contact: {
          fullName: "Lead Ads Seguro",
          email: " LEAD@EXAMPLE.COM ",
          phone: "(48) 99999-9999",
        },
        attribution: {
          channel: "ads",
          campaign: "google-junho",
          utmSource: "google",
          utmMedium: "cpc",
          utmCampaign: "avaliacao-segura",
          gclid: "gclid-permitido",
        },
        lead: {
          interest:
            "Acompanhamento médico com redução de danos, sem exportar contexto clínico",
        },
      },
    );
    repository.createConsent({
      contactId: contact.id,
      purpose: "marketing",
      source: "landing-page-lgpd-checkbox",
    });
    repository.updateContactLifecycleStage(contact.id, "mql");
    repository.updateContactLifecycleStage(contact.id, "sql");
    const deal = moveLeadToDeal(repository, lead.id, {
      title: "Avaliação médica LuzPerformance",
      stage: "qualification",
      valueCents: 600000,
    });
    moveDealThroughPipeline(repository, {
      dealId: deal.id,
      toStage: "medical_review_pending",
      actorId: "crm-agent",
    });
    moveDealThroughPipeline(repository, {
      dealId: deal.id,
      toStage: "won",
      actorId: "crm-agent",
    });
    const contract = createContractFromDeal(repository, deal.id, {
      planType: "semiannual",
      startDate: "2026-07-01",
      valueCents: 600000,
    });
    repository.updateContractStatus(contract.id, "renewed");

    const events = buildAdsConversionExportBoundary(repository);
    const exportableEvents = events.filter(
      (event) => event.status === "exportable",
    );

    expect(exportableEvents.map((event) => event.payload.eventName)).toEqual(
      expect.arrayContaining([
        "Lead Created",
        "MQL",
        "SQL",
        "Assessment Scheduled",
        "Contract Closed",
        "Revenue Initial",
        "Renewal",
      ]),
    );
    expect(exportableEvents[0]?.payload).toMatchObject({
      attributionIdentifiers: {
        channel: "ads",
        campaign: "google-junho",
        utmSource: "google",
        utmMedium: "cpc",
        utmCampaign: "avaliacao-segura",
        gclid: "gclid-permitido",
      },
      userIdentifiers: {
        normalizedEmail: "lead@example.com",
        normalizedPhoneE164: "+5548999999999",
      },
    });
    expect(attribution.gclid).toBe("gclid-permitido");
    expect(
      exportableEvents.find(
        (event) => event.payload.eventName === "Revenue Initial",
      )?.payload,
    ).toMatchObject({
      valueCents: 600000,
      currency: "BRL",
    });
    expect(JSON.stringify(exportableEvents)).not.toContain("interest");
    expect(JSON.stringify(exportableEvents)).not.toContain("clinical");
    expect(JSON.stringify(exportableEvents)).not.toContain("symptoms");
    expect(JSON.stringify(exportableEvents)).not.toContain("hormones");
    expect(JSON.stringify(exportableEvents)).not.toContain("diagnosis");
  });

  it("marks Ads exports as blocked when governance or sensitive metadata forbids export", () => {
    const repository = createInMemoryCrmRepository({
      clock: () => new Date("2026-06-18T12:00:00.000Z"),
    });
    const { contact: noConsentContact } = createLeadWithAttribution(
      repository,
      {
        contact: {
          fullName: "Lead sem consentimento",
          email: "sem-consentimento@example.com",
        },
        attribution: {
          channel: "ads",
          gclid: "gclid-sem-consentimento",
        },
      },
    );
    const { contact: sensitiveContact, lead: sensitiveLead } =
      createLeadWithAttribution(repository, {
        contact: {
          fullName: "Lead com dado sensível no evento",
          email: "sensivel@example.com",
        },
        attribution: {
          channel: "ads",
          gclid: "gclid-sensivel",
        },
      });
    repository.createConsent({
      contactId: sensitiveContact.id,
      purpose: "marketing",
      source: "landing-page-lgpd-checkbox",
    });
    const sensitiveAuditLog = repository.createAuditLog({
      actorId: "crm-agent",
      action: "lead.created",
      entityType: "leads",
      entityId: sensitiveLead.id,
      contactId: sensitiveContact.id,
      metadata: {
        clinicalNotes: "não pode sair do CRM",
      },
    });
    const { contact: blockedContact } = createLeadWithAttribution(repository, {
      contact: {
        fullName: "Lead do-not-contact",
        email: "dnc@example.com",
      },
      attribution: {
        channel: "ads",
        gclid: "gclid-dnc",
      },
    });
    repository.createConsent({
      contactId: blockedContact.id,
      purpose: "marketing",
      source: "landing-page-lgpd-checkbox",
    });
    repository.markDoNotContact(blockedContact.id, {
      actorId: "dr-vinicius",
      source: "pedido-explicito",
    });

    const events = buildAdsConversionExportBoundary(repository);

    expect(events).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          status: "ads_export_blocked",
          reason: "marketing_consent_not_granted",
          source: expect.objectContaining({
            contactId: noConsentContact.id,
          }),
        }),
        expect.objectContaining({
          status: "ads_export_blocked",
          reason: "sensitive_metadata_present",
          source: expect.objectContaining({
            auditLogId: sensitiveAuditLog.id,
          }),
        }),
        expect.objectContaining({
          status: "ads_export_blocked",
          reason: "do_not_contact",
          source: expect.objectContaining({
            contactId: blockedContact.id,
          }),
        }),
      ]),
    );
  });

  it("groups deals by pipeline stage for the board view", () => {
    const repository = createInMemoryCrmRepository({
      clock: () => new Date("2026-06-18T00:00:00.000Z"),
    });
    const { lead: firstLead } = createLeadWithAttribution(repository, {
      contact: {
        fullName: "Lead em avaliação médica",
      },
      attribution: {
        channel: "blog",
      },
    });
    const { lead: secondLead } = createLeadWithAttribution(repository, {
      contact: {
        fullName: "Lead em proposta",
      },
      attribution: {
        channel: "ads",
      },
    });

    const reviewDeal = moveLeadToDeal(repository, firstLead.id, {
      title: "Avaliação médica pendente",
      stage: "medical_review_pending",
      valueCents: 600000,
    });
    const proposalDeal = moveLeadToDeal(repository, secondLead.id, {
      title: "Proposta semestral enviada",
      stage: "proposal_sent",
      valueCents: 600000,
    });

    expect(listPipelineDeals(repository)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          stage: "medical_review_pending",
          label: "Avaliação médica pendente",
          deals: [reviewDeal],
        }),
        expect.objectContaining({
          stage: "proposal_sent",
          label: "Proposta enviada",
          deals: [proposalDeal],
        }),
      ]),
    );
  });

  it("moves a deal through the pipeline and records who, when, from, and to", () => {
    const repository = createInMemoryCrmRepository({
      clock: () => new Date("2026-06-18T09:30:00.000Z"),
    });
    const { contact, lead } = createLeadWithAttribution(repository, {
      contact: {
        fullName: "Lead pronto para proposta",
      },
      attribution: {
        channel: "whatsapp_dm",
      },
    });
    const deal = moveLeadToDeal(repository, lead.id, {
      title: "Acompanhamento anual",
      stage: "medical_review_completed",
      valueCents: 1200000,
    });

    const movedDeal = moveDealThroughPipeline(repository, {
      dealId: deal.id,
      toStage: "proposal_sent",
      actorId: "dr-vinicius",
    });

    expect(movedDeal.stage).toBe("proposal_sent");
    expect(repository.listAuditLogs()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          actorId: "dr-vinicius",
          action: "deal_stage.changed",
          entityType: "deals",
          entityId: deal.id,
          contactId: contact.id,
          from: "medical_review_completed",
          to: "proposal_sent",
          createdAt: "2026-06-18T09:30:00.000Z",
        }),
      ]),
    );
  });

  it("requires a loss reason when moving a deal to lost/cancelled", () => {
    const repository = createInMemoryCrmRepository({
      clock: () => new Date("2026-06-18T09:30:00.000Z"),
    });
    const { contact, lead } = createLeadWithAttribution(repository, {
      contact: {
        fullName: "Lead que cancelou",
      },
      attribution: {
        channel: "referral",
      },
    });
    const deal = moveLeadToDeal(repository, lead.id, {
      title: "Contrato mensal",
      stage: "negotiation",
      valueCents: 100000,
    });

    expect(() =>
      moveDealThroughPipeline(repository, {
        dealId: deal.id,
        toStage: "lost",
        actorId: "dr-vinicius",
      }),
    ).toThrow("Moving a deal to lost requires a loss reason");

    const lostDeal = moveDealThroughPipeline(repository, {
      dealId: deal.id,
      toStage: "lost",
      actorId: "dr-vinicius",
      lossReason: "Optou por não seguir com avaliação comercial agora",
    });

    expect(lostDeal).toMatchObject({
      stage: "lost",
      lossReason: "Optou por não seguir com avaliação comercial agora",
      lostAt: "2026-06-18T09:30:00.000Z",
    });
    expect(repository.listAuditLogs()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          actorId: "dr-vinicius",
          action: "deal_stage.changed",
          entityType: "deals",
          entityId: deal.id,
          contactId: contact.id,
          from: "negotiation",
          to: "lost",
          metadata: {
            lossReason: "Optou por não seguir com avaliação comercial agora",
          },
        }),
      ]),
    );
  });
});
