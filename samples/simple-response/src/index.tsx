import Express from "express";
import React from "react";

import VoiceRenderer, { Platforms } from "react-voice-renderer/src";

const SayPlatform: React.FC = () => {
  return <speak>platform</speak>;
}

const app = Express();

app.post("/handler", (req, res) => {
  const response = VoiceRenderer.render(
    <tell>
      <speak>This is a test message</speak>
      <SayPlatform />
    </tell>, { platform: Platforms.Alexa });

  res.json(response).status(200);
});

app.listen(8000, () => {
  console.info(`Listening...`);
});