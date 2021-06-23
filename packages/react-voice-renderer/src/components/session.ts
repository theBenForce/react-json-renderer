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

  render(platform: Platforms, result: any) {

    for (const child of this.children) {
      if (!(child instanceof ResponseComponent)) continue;

      result = child.render(platform, result);
    }

    switch (platform) {
      case Platforms.Alexa:
        return this._renderAlexa(result);

      default:
        console.info(`Can't render ask for platform ${platform}`);
        return result;
    }
  }

  _renderAlexa(result: Record<string, any>) {
    result.response.sessionAttributes = {
      ...result.response.sessionAttributes,
      ...this.props.sessionAttributes
    };

    return result;
  }
}