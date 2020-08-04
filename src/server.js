const server = require("http").createServer();
const os = require("os-utils");

const io = require("socket.io")(server, {
  transports: ["websocket", "polling"],
});

let tick = 0;
// 1. listen for socket connections
io.on("connection", (client) => {
  let connectionInterval;
  connectionInterval = setInterval(() => {
    // 2. every second, emit a 'cpu' event to user
    let timestamp = Date.now();
    console.log(timestamp);
    client.emit("date", {
      value: timestamp,
    });
  }, 1000);

  client.on("disconnect", function () {
    console.log("disconnecting...");
    clearInterval(connectionInterval);
  });
});

server.listen(5101);
