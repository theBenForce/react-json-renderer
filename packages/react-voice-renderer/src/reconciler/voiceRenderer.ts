import { ReactElement } from "react";
import Reconciler from "react-reconciler";
import { ElementTypes } from "../components/elementTypes";
import ResponseRoot from "../components/ResponseRoot";
import { Platforms } from "../types/platforms";
import { createElement, getRootHostContext } from "../utils/createElement";
import ResponseComponent from "./responseComponent";

const noop = () => { };

const appendChild = <Parent extends ResponseComponent, Child extends ResponseComponent>(parentInstance?: Parent, child?: Child | unknown) => {
  if (!parentInstance || !child) return;

  if (child instanceof ResponseComponent) {
    parentInstance.appendChild(child);
    child.parent = parentInstance;
  }
};

const ResponseRenderer = (request: any, platform: Platforms) => Reconciler({
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

  prepareUpdate: (element, type, oldProps, newProps) => true,

  resetAfterCommit: noop,

  resetTextContent: noop,

  getRootHostContext: (rootContainer) => ({
    platform,
    request,
  }),

  getChildHostContext(parentHostContext) {
    return parentHostContext;
  },

  shouldSetTextContent: (type, props) => false,

  now: Date.now,

  appendChild,

  // @ts-ignore
  appendChildToContainer: (parentInstance, child) => appendChild(parentInstance, child),

  removeChild: noop,
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
  platform: Platforms;
  request?: any;
}

export default {
  render(element: ReactElement, options: RenderOptions): Record<string, any> {
    const container = createElement(ElementTypes.Root) as ResponseRoot;

    const renderer = ResponseRenderer(options.request ?? {}, options.platform);

    const node = renderer.createContainer(container, 0, false, null);
    renderer.updateContainer(element, node, null, () => null);

    return container.render(options.platform);
  }
}