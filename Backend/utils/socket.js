import { Server } from "socket.io";

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("new client connected");
    socket.on("disconnect", () => {
      console.log("client disconnected");
    });
  });

  return io;
};

export const notifyNewListing = (io, food)=>{
    io.emit("newListing", food);    
}
