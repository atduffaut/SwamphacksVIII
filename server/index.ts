const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {});
io.on("connection", (socket: any) => {});

httpServer.listen(3000);
