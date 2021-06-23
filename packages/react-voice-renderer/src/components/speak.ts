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

  render(platform: Platforms, result: any) {

    switch (platform) {
      case Platforms.Alexa:
        return this._renderAlexa(result);

      default:
        console.info(`Can't render speak for platform ${platform}`);
        return result;
    }
  }

  _renderAlexa(result: Record<string, any>) {
    if (!result.response.outputSpeech) {
      result.response.outputSpeech = {
        type: "SSML",
        ssml: []
      };
    }

    if (this.props.replace) {
      result.response.outputSpeech.ssml = [...this.children];
    } else {
      result.response.outputSpeech.ssml.push(...this.children);
    }

    return result;
  }
}

