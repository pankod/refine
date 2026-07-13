import { useState } from "react";

export type SurveyOption = 1 | 2 | 3 | 4 | 5;

export enum SurveyTypeEnum {
  EMOJI = "EMOJI",
  THUMBS = "THUMBS",
}

export type Survey = {
  id: string;
  name: string;
  slug: string;
  options: SurveyOption[];
  source: string;
  entityType: string;
  surveyType: SurveyTypeEnum;
  createdAt: string;
  updatedAt: string;
};

export type SurveyMetaData = Record<string, any>;

export type DocSurveyCreateDto = {
  response: number;
  entityId: string;
  responseText?: string;
  metaData?: SurveyMetaData;
};

export type DocSurveyUpdateDto = {
  response: number;
  responseText?: string;
  metaData?: SurveyMetaData;
};

export type DocSurveyResponse = {
  response: number;
  entityId: string;
  survey: Survey;
  responseText?: string | null;
  metaData: SurveyMetaData;
  id: string;
  createdAt: string;
  updatedAt: string;
};

type Props = {
  type: SurveyTypeEnum;
};

export const useRefineCloudSurveyAPI = (props: Props) => {
  const [survey, setSurvey] = useState<DocSurveyResponse | null>(null);

  const API_URL = URL_MAP[props.type];

  const createSurvey = async ({ body }: { body: DocSurveyCreateDto }) => {
    const response = await fetch(`${API_URL}/responses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return null;
    }

    const data: DocSurveyResponse = await response.json();
    if (!data) return;
    setSurvey(data);
    return data;
  };

  const updateSurvey = async ({
    surveyId,
    body,
  }: {
    surveyId?: string;
    body: DocSurveyUpdateDto;
  }) => {
    const response = await fetch(`${API_URL}/responses/${surveyId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return null;
    }

    const data: DocSurveyResponse = await response.json();
    if (!data) return;
    setSurvey(data);
    return data;
  };

  return {
    survey,
    setSurvey,
    createSurvey,
    updateSurvey,
  };
};

const BASE_URL = "https://cloud2.refine.dev/.refine/surveys";

const PAGES_SURVEY_URL = `${BASE_URL}/documentation-pages-survey`;

const SECTIONS_SURVEY_URL = `${BASE_URL}/documentation-sections-survey`;

const URL_MAP = {
  [SurveyTypeEnum.EMOJI]: PAGES_SURVEY_URL,
  [SurveyTypeEnum.THUMBS]: SECTIONS_SURVEY_URL,
};
