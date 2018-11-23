import app from './App';
import http from 'http';
const PORT = 3000;
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
      console.log("server is listening for requests on port 3000");
    });
  }
}