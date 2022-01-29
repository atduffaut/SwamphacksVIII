import * as express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
app.use(express.static("frontend"));
app.get("/", (req, res) => {
  res.sendFile("index.html");
});
const httpServer = createServer(app);
const io = new Server(httpServer, {});
io.on("connection", (socket) => {});
httpServer.listen(3000);
