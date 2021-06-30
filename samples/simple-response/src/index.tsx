import Express from "express";
import React from "react";

import VoiceRenderer, { Platforms } from "react-voice-renderer/src";
import { VoiceRequestProvider, useVoiceRequest, parseRequest } from "react-voice-parser/src";

import { inspect } from "util";
import { parseRequest } from "../../../packages/react-voice-parser/src/request";

const SayPlatform: React.FC = () => {
  const request = useVoiceRequest();

  if (request === null) return <speak>Request missing</speak>;

  return <speak>You are running on {request?.platform?.toString()} {JSON.stringify(request?.userId)}</speak>;
}

const app = Express();
app.use(Express.json());

app.post("/handler", (req, res) => {
  const request = parseRequest(req.body);

  const response = VoiceRenderer.render(
    <VoiceRequestProvider request={request} >
    <tell>
      <speak>This is a test message</speak>
        <SayPlatform />
      </tell>
    </VoiceRequestProvider>, { platform: request.platform });

  res.json(response).status(200);
});

app.listen(8000, () => {
  console.info(`Listening...`);
});