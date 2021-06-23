import { Platforms } from "react-voice-renderer";

export abstract class VoiceRequest<Request = any> {
  abstract readonly platform: Platforms;
  abstract readonly userId: string;
  abstract readonly personId?: string;
  abstract readonly sessionAttributes?: Record<string, any>;

  constructor(public request: Request) { }
}