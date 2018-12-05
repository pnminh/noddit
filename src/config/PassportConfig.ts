import { UserRepository } from './../repositories/UserRepository';
import  passport from 'passport';
import * as express from 'express';
import * as passportLocal from 'passport-local';
import { comparePass } from '../auth/Helpers';
import { User } from '../db/entity/User';
export class PassportConfig {
  private static userRepository = new UserRepository();
  static init(app: express.Express): void {
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(
      new passportLocal.Strategy(
        {
          usernameField: 'email'
        },
        async (email, password, done) => {
          let user = await this.userRepository.getByEmail(email);
          if (!user || !comparePass(password, user.password)) {
            return done(null, false, { message: 'Invalid email or password' });
          }
          return done(null, user);
        }
      )
    );
    /** 
     * https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
     * get user from db, add the user.id to the session
     * passport.serializeUser(function(user, done) {
    done(null, user.id);
});              │
                 │ 
                 │
                 └─────────────────┬──→ saved to session
                                   │    req.session.passport.user = {id: '..'}
                                   │
                                   ↓           
passport.deserializeUser(function(id, done) {
                   ┌───────────────┘
                   │
                   ↓ 
    User.findById(id, function(err, user) {
        done(err, user);
    });            └──────────────→ user object attaches to the request as req.user   
});
    */
    passport.serializeUser(async (user: User, done) => {
      done(null, user.id);
    });

    passport.deserializeUser(async (userId:number,done) => {
      try{
        let user = await this.userRepository.getById(userId);
        done(null,user);
      }catch(err){
        done(err,null);
      }
    })
  }
}
