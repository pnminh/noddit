import * as bcrypt from 'bcryptjs';
import * as express from 'express';
/**
 * middleware to check for authenticated user
 */
export function ensureAuthenticated(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!req.user) {
    req.flash('notice', 'You must be signed in to do that.');
    return res.redirect('/users/sign_in');
  } else {
    next();
  }
}
export function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}
