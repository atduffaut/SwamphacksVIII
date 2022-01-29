import * as express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const PORT = 3000;

const app = express();
app.use(express.static("dist"));
app.get("/", (req, res) => {
  res.sendFile("index.html");
});
const httpServer = createServer(app);
const io = new Server(httpServer, {});
io.on("connection", (socket) => {});
httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
