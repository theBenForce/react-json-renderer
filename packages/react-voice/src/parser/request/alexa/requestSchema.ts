
interface User {
  userId: string;
  accessToken?: string;
  permissions?: {
    consentToken: string;
  }
}

interface Person {
  personId: string;
  accessToken: string;
}

interface ApplicationInfo {
  applicationId: string;
};

export interface AlexaRawRequest {
  version: "1.0";
  session: {
    new: boolean;
    sessionId: string;
    application: ApplicationInfo;
    attributes?: Record<string, any>;
    user: User;
  };
  context: {
    System: {
      application: ApplicationInfo;
      user: User;
      person: Person;
      apiEndpoint: string;
      apiAccessToken: string;
    }
  };
  request: {};
}

export function isAlexaRawRequest(request: any): request is AlexaRawRequest {
  return request.version === "1.0" && request.context && request.request;
}