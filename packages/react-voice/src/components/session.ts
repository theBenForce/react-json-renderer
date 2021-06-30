import ResponseComponent, { BasicComponentProps, ComponentProps } from "../reconciler/responseComponent";
import { Platforms } from "../types/platforms";
import ResponseRoot from "./ResponseRoot";
import { inspect } from "util";

type SessionProps = ComponentProps<{
  sessionAttributes?: any;
}>;

export class session extends ResponseComponent<SessionProps> {
  constructor(root: ResponseRoot, props: SessionProps) {
    super(root, props);
  }

  render() {

    for (const child of this.children) {
      if (!(child instanceof ResponseComponent)) continue;

      child.render();
    }

    switch (this.platform) {
      case Platforms.Alexa:
        this._renderAlexa();
        break;

      default:
        console.info(`Can't render ask for platform ${this.platform}`);
        break;
    }

    return {};
  }

  _renderAlexa() {
    const result = this.root.result;

    result.response.sessionAttributes = {
      ...result.response.sessionAttributes,
      ...this.props.sessionAttributes
    };
  }
}