
import { AlexaRequest, isAlexaRawRequest } from "./alexa";
import { inspect } from "util";
import { VoiceRequest } from "./voiceRequest";


export * from "./voiceRequest";

export const parseRequest = <RequestType extends VoiceRequest>(request: any): RequestType => {
  if (isAlexaRawRequest(request)) {
    return new AlexaRequest(request) as unknown as RequestType;
  }

  console.error(`Could not determine platform for request`, inspect(request));

  throw new Error(`Could not determine request platform`);
}