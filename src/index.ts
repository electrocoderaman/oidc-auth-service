import express from "express";
import path from "node:path";
import jose from "node-jose";

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json());
app.use(express.static(path.resolve("public")));

app.get("/", (req, res) => res.json({ message: "mai kya namaste uncle ji" }));

app.get("/health", (req, res) => {
  res.json({
    message:
      "Server is healthy (khaya piya ghar ka server h bhai aise kaise kharab ho skta h)",
    healthy: true,
  });
});

app.get("/.well-known/openid-configuration", (req, res) => {
  const ISSUER = `http://localhost:${PORT}`;
  return res.json({
    issuer: ISSUER,
    authorization_endpoint: `${ISSUER}/authenticate`,
    userinfo_endpoint: `${ISSUER}/userinfo`,
    jwks_uri: `${ISSUER}/.well-known/jwks.json`,
  });
});

app.get("/authenticate", (req, res) => {
  return res.sendFile(path.resolve("public", "authenticate.html"));
});

