const express = require("express");
const connection = require("./db.js");
const { sequelize } = require("./app/models");
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

const app = express();
require("dotenv").config();

Sentry.init({
  dsn: process.env.DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

global.db = connection;
global.Promise = require("bluebird");

// console.log(upload);
/* ==========================
 *  SERVER'S CONFIGURATIONS
 * ==========================
 */
const serverConfig = require("./app/config/server.config")();
app.use(serverConfig);

/* ===================
 * Define all routes
 * ===================
 */
const routes = require("./app/routes/root")(app);
app.use(routes);

//HANDLE 404 requests
// const notFoundRoute = require("./app/routes/not-found");
// app.all("*", notFoundRoute);

//HANDLING ALL SERVER ERRORS
// THIS SHOULD BE DONE LAST
// const errorHandler = require("./app/routes/error-handler").errorRouteHandler;
// app.use(errorHandler);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
const HOSTNAME = "localhost";

app.listen(PORT, HOSTNAME, async () => {
  try {
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
    console.log("Database connected.... ");
  } catch (error) {
    // errorHandler(error, res);
    console.log("error connecting to server", error);
  }
});
