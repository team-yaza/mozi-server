import express from 'express';
import webpush from 'web-push';

const webpushRouter = express.Router();

webpushRouter.post('/subscribe', (req, res) => {
  //Get pushSubscription Object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: 'Push Test' });

  // Pass Object into sendNotification
  webpush.sendNotification(subscription, payload).catch((err) => console.error(err));
});

export default webpushRouter;
