import React from "react";
import { Platforms } from "../types/platforms";

import JsonRenderer from "../reconciler/voiceRenderer";

describe("tell", () => {
  describe("Alexa", () => {
    test("should end session", () => {
      const ssmlContent = "Test value";

      const response = JsonRenderer.render(<tell><speak>{ssmlContent}</speak></tell>, { platform: Platforms.Alexa });

      expect(response).toHaveProperty("response.outputSpeech.ssml", `<speak>${ssmlContent}</speak>`);
      expect(response).toHaveProperty("response.shouldEndSession", true);
    });
  });
});