import { Platforms } from "../../..";
import { VoiceRequest } from "../voiceRequest";
import { AlexaRawRequest } from "./requestSchema";

export { AlexaRawRequest, isAlexaRawRequest } from "./requestSchema";

export class AlexaRequest extends VoiceRequest<AlexaRawRequest> {
  constructor(public request: AlexaRawRequest) {
    super();
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