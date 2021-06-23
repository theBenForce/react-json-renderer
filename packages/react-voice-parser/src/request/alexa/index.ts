import { VoiceRequest } from "../voiceRequest";
import { AlexaRawRequest } from "./requestSchema";
import { Platforms } from "react-voice-renderer";

export { AlexaRawRequest, isAlexaRawRequest } from "./requestSchema";

export class AlexaRequest extends VoiceRequest<AlexaRawRequest> {
  constructor(request: AlexaRawRequest) {
    super(request);
  }

  get platform() {
    return Platforms.Alexa;
  }

  get userId() {
    return this.request.session.user.userId;
  }

  get personId() {
    return this.request.context.System.person?.personId;
  }

  get sessionAttributes() {
    return this.request.session.attributes;
  }
}