import express from 'express';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

export const sentryLoader = (app: express.Application) => {
  Sentry.init({
    dsn: 'https://48e5185ee9804737a8899675d69b1d32@o4503968160481280.ingest.sentry.io/4503987021676544',
    integrations: [new Sentry.Integrations.Http({ tracing: true }), new Tracing.Integrations.Express({ app })],
    tracesSampleRate: 1.0,
  });

  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
};
