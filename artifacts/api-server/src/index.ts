import app from "./app";
import { logger } from "./lib/logger";
import { startContactNotificationRecovery } from "./lib/contact-notifications";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
  // Development and production-like smoke tests must not send stored customer
  // notifications merely because they opened a connection to a shared DB.
  if (process.env.NODE_ENV === "production" && process.env.CONTACT_AUTOMATIC_RECOVERY !== "false") {
    startContactNotificationRecovery();
  }
});
