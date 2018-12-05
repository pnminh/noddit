import { UserRepository } from './../repositories/UserRepository';
import * as express from 'express';
import { User } from '../db/entity/User';
import passport from 'passport';
export class UserController {
  userRepository = new UserRepository();
  signupGet(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    res.render('users/sign_up');
  }
  create = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      await this.userRepository.create(
        new User(req.body.email, req.body.password)
      );
      passport.authenticate('local')(req, res, () => {
        req.flash('notice', "You've successfully signed in!");
        res.redirect('/');
      });
    } catch (err) {
      req.flash('error', JSON.stringify([{ msg: err.message }]));
      res.redirect('/users/sign_up');
    }
  };
  signInGet(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    res.render('users/sign_in');
  }
  signInPost(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    passport.authenticate('local')(req, res, function() {
      if (!req.user) {
        req.flash('notice', 'Sign in failed. Please try again.');
        res.redirect('/users/sign_in');
      } else {
        req.flash('notice', "You've successfully signed in!");
        res.redirect('/');
      }
    });
  }
  signOut(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.logout();
    req.flash('notice', "You've successfully signed out!");
    res.redirect('/');
  }
}
