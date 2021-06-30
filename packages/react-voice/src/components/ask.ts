import ResponseComponent, { BasicComponentProps } from "../reconciler/responseComponent";
import { Platforms } from "../types/platforms";
import ResponseRoot from "./ResponseRoot";
import { inspect } from "util";

export class ask extends ResponseComponent {
  constructor(root: ResponseRoot, props: BasicComponentProps) {
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
    this.root.result.response.shouldEndSession = false;
  }
}