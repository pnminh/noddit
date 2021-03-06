import { PassportConfig } from './PassportConfig';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import session from 'express-session';
import flash from 'express-flash';
const viewsFolder = path.join(__dirname, '..', 'views');
const assetsFolder = path.join(__dirname, '..', 'assets');
import * as fs from 'fs';
fs.readdirSync(viewsFolder).forEach(file => {
  console.log(file);
});
console.log(`viewsFolder:${viewsFolder}`);
export class MainConfig {
  static init(app: express.Express): void {
    dotenv.config();
    app.set('views', viewsFolder);
    app.set('view engine', 'ejs');
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(assetsFolder));
    app.use(
      session({
        secret: process.env.cookieSecret,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1.21e+9 } //set cookie to expire in 14 days
      })
    );
    app.use(flash());
    PassportConfig.init(app);
    app.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        //make user available to the response and its template
        res.locals.currentUser = req.user;
        next();
      }
    );
  }
}
