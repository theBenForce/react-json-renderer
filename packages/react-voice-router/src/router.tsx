import React from "react";
import { useVoiceRequest } from "react-voice-parser";

interface RouterContextProperties {
  path: string;
  pathAttribute?: string;
}

const RouterContext = React.createContext<RouterContextProperties>({ path: "/", pathAttribute: "__PATH__" });

export const useRouter = () => React.useContext(RouterContext);

interface RouterProps {
  pathAttribute?: string;
}

export const Router: React.FC<RouterProps> = ({ pathAttribute, children }) => {
  const request = useVoiceRequest();
  pathAttribute = pathAttribute ?? "__PATH__";
  const path = request?.sessionAttributes?.[pathAttribute] ?? "/";

  return <RouterContext.Provider value={{ path, pathAttribute }}>
    {children}
  </RouterContext.Provider>;
}