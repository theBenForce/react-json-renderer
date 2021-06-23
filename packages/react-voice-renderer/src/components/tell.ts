import ResponseComponent, { BasicComponentProps } from "../reconciler/responseComponent";
import { Platforms } from "../types/platforms";
import ResponseRoot from "./ResponseRoot";
import { inspect } from "util";

export class tell extends ResponseComponent {
  constructor(root: ResponseRoot, props: BasicComponentProps) {
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
        console.info(`Can't render tell for platform ${platform}`);
        return result;
    }
  }

  _renderAlexa(result: Record<string, any>) {
    result.response.shouldEndSession = true;

    return result;
  }
}