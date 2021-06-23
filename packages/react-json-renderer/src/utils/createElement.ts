import { ElementTypes } from "../components/elementTypes";
import JsonRoot from "../components/JsonRoot";

let ROOT: JsonRoot;

exports.getHostContextNode = function getHostContextNode(rootNode?: JsonRoot) {
  if (typeof rootNode !== undefined) {
    ROOT = rootNode!;
  } else {
    ROOT = new JsonRoot();
  }

  return ROOT;
};

export const createElement = (type: ElementTypes, props: any) => {
  switch (type) {
    case ElementTypes.Root:
      return new JsonRoot();
    default:
      throw new Error(`Unknown Json element: ${type}`);
  }
};