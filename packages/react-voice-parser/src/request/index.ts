
import { AlexaRequest, isAlexaRawRequest } from "./alexa";
import { inspect } from "util";
import { VoiceRequest } from "./voiceRequest";


export * from "./voiceRequest";

export const parseRequest = (request: any): VoiceRequest => {
  if (isAlexaRawRequest(request)) {
    return new AlexaRequest(request);
  }

  console.error(`Could not determine platform for request`, inspect(request));

  throw new Error(`Could not determine request platform`);
}