export {};

declare global {
  namespace Express {
    interface Request {
      user?: import('../models/user').default;
    }
  }
}
