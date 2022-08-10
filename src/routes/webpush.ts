import express from 'express';
import webpush from 'web-push';

const webpushRouter = express.Router();

webpushRouter.post('/', (req, res) => {
  //Get pushSubscription Object
  // Send 201 - resource created
  const payload = JSON.stringify({ title: 'Push Test' });
  const subscription = req.body;

  // Pass Object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .then((response: webpush.SendResult) => {
      res.writeHead(response.statusCode, response.headers).end(response.body);
    })
    .catch((err) => {
      if ('statusCode' in err) {
        res.writeHead(err.statusCode, err.headers).end(err.body);
      } else {
        console.error('err : ', err);
        res.statusCode = 500;
        res.end();
      }
    });
});

export default webpushRouter;
