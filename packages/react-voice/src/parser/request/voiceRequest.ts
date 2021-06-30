import { Platforms } from "../..";

export abstract class VoiceRequest<RequestType = any> {
  abstract readonly platform: Platforms;
  abstract readonly userId: string;
  abstract readonly personId?: string;
  abstract readonly sessionAttributes?: Record<string, any>;
  abstract readonly request: RequestType;

  constructor() { }
}