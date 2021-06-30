

import ResponseComponent, { ComponentProps } from "../reconciler/responseComponent";
import ResponseRoot from "./ResponseRoot";

type RouterProps = ComponentProps<{
  pathAttribute?: string;
}>;

export class router extends ResponseComponent<RouterProps> {
  public currentPath: string;

  constructor(root: ResponseRoot, props: RouterProps) {
    super(root, props);

    if (!this.props.pathAttribute) {
      this.props.pathAttribute = "__PATH__";
    }

    this.currentPath = root.request?.sessionAttributes?.[this.props.pathAttribute] ?? "/";
  }
}