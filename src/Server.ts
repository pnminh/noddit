import app from './App';
import * as http from 'http';
import { AddressInfo } from 'dgram';
const PORT = process.env.PORT||3000;
export class Server{
  server:http.Server;
  constructor(){
    this.server = this.createServer();
    this.startServer(this.server);
  }
  createServer():http.Server{
    return http.createServer(app);
  }
  startServer(server:http.Server){
    server.listen(PORT);
    server.on("listening", () => {
      console.log(`server is listening for requests on ${(<AddressInfo>server.address()).port}`);
    });
  }
}