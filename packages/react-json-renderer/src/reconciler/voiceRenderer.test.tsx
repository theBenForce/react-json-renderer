import React from "react";
import { Platforms } from "../types/platforms";

import JsonRenderer from "./voiceRenderer";

describe("JsonRenderer", () => {
  describe("Alexa", () => {
    test("renders an empty object", () => {
      const response = JsonRenderer.render(<></>, { platform: Platforms.Alexa });
      expect(response).toHaveProperty("version", "1.0")
    });
  });
  describe("GoogleAssistant", () => {
    test("renders an empty object", () => {
      const response = JsonRenderer.render(<></>, { platform: Platforms.GoogleAssistant });
      expect(response).toEqual({});
    });
  });
});