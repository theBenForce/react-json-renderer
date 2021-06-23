import { ask } from "../components/ask";
import { ElementTypes } from "../components/elementTypes";
import ResponseRoot from "../components/ResponseRoot";
import { session } from "../components/session";
import { speak } from "../components/speak";
import { tell } from "../components/tell";
import ResponseComponent from "../reconciler/responseComponent";

let ROOT: ResponseRoot;

export const getRootHostContext = (rootNode?: ResponseRoot) => {
  if (typeof rootNode !== undefined) {
    ROOT = rootNode!;
  } else {
    ROOT = new ResponseRoot();
  }

  return ROOT;
};

export const createElement = (type: ElementTypes, props?: any, rootContainer?: ResponseRoot) => {
  switch (type) {
    case ElementTypes.Root:
      return new ResponseRoot();
    case ElementTypes.Speak:
      return new speak(rootContainer!, props);
    case ElementTypes.Ask:
      return new ask(rootContainer!, props);
    case ElementTypes.Tell:
      return new tell(rootContainer!, props);
    case ElementTypes.Session:
      return new session(rootContainer!, props);
    default:
      throw new Error(`Unknown Json element: ${type}`);
  }
};