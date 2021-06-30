import { route, router } from "../components";
import { ask } from "../components/ask";
import { ElementTypes } from "../components/elementTypes";
import ResponseRoot from "../components/ResponseRoot";
import { session } from "../components/session";
import { speak } from "../components/speak";
import { tell } from "../components/tell";

const createElementInstance = (type: ElementTypes, props?: any, rootContainer?: ResponseRoot) => {
  switch (type) {
    case ElementTypes.Speak:
      return new speak(rootContainer!, props);
    case ElementTypes.Ask:
      return new ask(rootContainer!, props);
    case ElementTypes.Tell:
      return new tell(rootContainer!, props);
    case ElementTypes.Session:
      return new session(rootContainer!, props);
    case ElementTypes.Router:
      return new router(rootContainer!, props);
    case ElementTypes.Route:
      return new route(rootContainer!, props);
    default:
      throw new Error(`Unknown Json element: ${type}`);
  }
};

export const createElement = (type: ElementTypes, props?: any, rootContainer?: ResponseRoot) => {
  const instance = createElementInstance(type, { ...props, request: rootContainer?.request }, rootContainer);

  instance.platform = rootContainer?.platform;
  instance.request = rootContainer?.request;

  return instance;
};