import Express from "express";
import React from "react";

import VoiceRenderer, { parseRequest } from "react-voice-renderer/src";

const app = Express();
app.use(Express.json());

app.post("/handler", (req, res) => {
  const request = parseRequest(req.body);

  const response = VoiceRenderer.render(
    <>
      <speak>Hello!</speak>
      <router>
        <route path="/first">
          <tell>
            <speak>First message</speak>
          </tell>

          <route path="/nested">
            <tell>
              <speak>Nested Message</speak>
            </tell>
          </route>
        </route>

        <route path="/second">
          <tell>
            <speak>Second message</speak>
          </tell>
        </route>
      </router>
    </>, { request });

  res.json(response).status(200);
});

app.listen(8000, () => {
  console.info(`Listening...`);
});