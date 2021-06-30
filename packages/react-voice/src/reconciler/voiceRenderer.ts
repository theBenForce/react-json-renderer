import { ReactElement } from "react";
import Reconciler from "react-reconciler";
import ResponseRoot from "../components/ResponseRoot";
import { createElement } from "../utils/createElement";
import ResponseComponent from "./responseComponent";
import { inspect } from "util";
import { VoiceRequest } from "../parser";

const noop = () => { };

const appendChild = <Parent extends ResponseComponent, Child extends ResponseComponent>(parentInstance?: Parent, child?: Child | unknown) => {
  if (!parentInstance || !child) return;

  if (typeof child === "object") {
    // @ts-ignore
    parentInstance.appendChild(child);

    // @ts-ignore
    child.parent = parentInstance;
  }
};

const ResponseRenderer = Reconciler({
  // @ts-ignore
  appendInitialChild: appendChild,

  createInstance: createElement,

  createTextInstance(text, rootContainerInstance, internalInstanceHandle) {
    return text;
  },


  clearContainer(container) {
    container!.children = [];
  },

  finalizeInitialChildren(element, type, props) {
    return false;
  },

  getPublicInstance(instance) {
    return instance;
  },

  prepareForCommit: (containerInfo) => null,

  prepareUpdate: (element, type, oldProps, newProps) => {
    console.info(inspect({ element, type, oldProps, newProps }));
    return true;
  },

  resetAfterCommit: noop,

  resetTextContent: noop,

  getRootHostContext: (rootContainer) => rootContainer?.context,

  getChildHostContext: (parentHostContext) => parentHostContext,

  shouldSetTextContent: (type, props) => false,

  now: Date.now,

  // @ts-ignore
  appendChild,

  appendChildToContainer: (parentInstance, child) => appendChild(parentInstance, child),

  removeChild: (parentInstance, child) => parentInstance.removeChild(child as ResponseComponent),
  removeChildFromContainer: noop,
  insertBefore: noop,
  commitUpdate: noop,
  commitMount: noop,
  commitTextUpdate: noop,
  preparePortalMount: noop,

  scheduleTimeout: setTimeout,
  cancelTimeout: clearTimeout,
  noTimeout: -1,

  queueMicrotask: queueMicrotask,

  isPrimaryRenderer: true,

  supportsHydration: false,
  supportsMutation: true,
  supportsPersistence: false,

});

interface RenderOptions {
  request: VoiceRequest;
}

export default {
  render(element: ReactElement, options: RenderOptions): Record<string, any> {
    const container = new ResponseRoot(options.request.platform)
    container.request = options.request;

    const node = ResponseRenderer.createContainer(container, 0, false, null);
    ResponseRenderer.updateContainer(element, node, null, () => null);

    return container.render();
  }
}