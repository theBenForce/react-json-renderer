import ResponseComponent, { ComponentProps } from "../reconciler/responseComponent";
import { Platforms } from "../types/platforms";
import { ElementTypes } from "./elementTypes";
import ResponseRoot from "./ResponseRoot";
import { inspect } from "util";

export type SpeakProps = ComponentProps<{
  replace?: boolean;
}>;

export class speak extends ResponseComponent<SpeakProps> {
  constructor(root: ResponseRoot, props: SpeakProps) {
    super(root, props);
  }

  render() {

    switch (this.platform) {
      case Platforms.Alexa:
        this._renderAlexa();
        break;

      default:
        console.info(`Can't render speak for platform ${this.platform}`);
        break;
    }

    return {};
  }

  _renderAlexa() {
    const result = this.root.result;

    if (!result.response.outputSpeech) {
      result.response.outputSpeech = {
        type: "SSML",
        ssml: []
      };
    }

    if (this.props.replace) {
      result.response.outputSpeech.ssml = [this.children.join(" ")];
    } else {
      result.response.outputSpeech.ssml.push(this.children.join(""));
    }
  }
}

