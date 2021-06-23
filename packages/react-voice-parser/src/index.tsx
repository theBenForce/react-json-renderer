import React from "react";
import { parseRequest, VoiceRequest } from "./request";

const requestContext = React.createContext<VoiceRequest | null>(null);

const RequestContextProvider = requestContext.Provider;

interface RequestProviderProps {
  request: VoiceRequest;
}

export const VoiceRequestProvider: React.FC<RequestProviderProps> = ({ request, children }) => {
  return <RequestContextProvider value={request}>
    {children}
  </RequestContextProvider>;
}

export const useVoiceRequest = (): VoiceRequest | null => {
  const ctx = React.useContext(requestContext);
  return ctx;
}