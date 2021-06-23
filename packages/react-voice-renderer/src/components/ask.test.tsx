import React from "react";
import { Platforms } from "../types/platforms";

import JsonRenderer from "../reconciler/voiceRenderer";

describe("ask", () => {
  describe("Alexa", () => {
    test("should keep session open", () => {
      const ssmlContent = "Test value";

      const response = JsonRenderer.render(<ask><speak>{ssmlContent}</speak></ask>, { platform: Platforms.Alexa });

      expect(response).toHaveProperty("response.outputSpeech.ssml", `<speak>${ssmlContent}</speak>`);
      expect(response).toHaveProperty("response.shouldEndSession", false);
    });
  });
});