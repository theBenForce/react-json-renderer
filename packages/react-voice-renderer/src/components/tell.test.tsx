import React from "react";
import { Platforms } from "../types/platforms";

import VoiceRenderer from "../";

describe("tell", () => {
  describe("Alexa", () => {
    test("should end session", () => {
      const ssmlContent = "Test value";

      const response = VoiceRenderer.render(<tell><speak>{ssmlContent}</speak></tell>, { platform: Platforms.Alexa });

      expect(response).toHaveProperty("response.outputSpeech.ssml", `<speak>${ssmlContent}</speak>`);
      expect(response).toHaveProperty("response.shouldEndSession", true);
    });
  });
});