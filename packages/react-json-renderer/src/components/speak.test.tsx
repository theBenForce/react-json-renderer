import React from "react";
import { Platforms } from "../types/platforms";

import JsonRenderer from "../reconciler/voiceRenderer";

describe("speak", () => {
  describe("Alexa", () => {
    test("should render provided ssml", () => {
      const ssmlContent = "Test value";
      // @ts-ignore
      const response = JsonRenderer.render((<speak>{ssmlContent}</speak>), { platform: Platforms.Alexa });

      expect(response).toHaveProperty("response.outputSpeech.ssml", `<speak>${ssmlContent}</speak>`);
      expect(response).toHaveProperty("response.outputSpeech.type", "SSML");
    });
  });
});