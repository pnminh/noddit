import express from 'express';
class App {
  app:express.Express;
  constructor() {
    this.app = express();
    this.app.use('/',(req:express.Request,res:express.Response,next:express.NextFunction)=>{
        res.send('Hello World');
    })
  }
}
export default new App().app;
