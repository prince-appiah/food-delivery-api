const http = require("http");
const app = require("./app");
const settings = require("./config/settings");

const server = http.createServer(app);

/* 
    *
    Run server
    *
*/
const conn = server.listen(settings.PORT, () =>
  console.log(
    `==> Server connected successfully in ${process.env.NODE_ENV} mode 🚀 `.blue
      .inverse
  )
);

// Handle promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  //close server and exit
  conn.close(() => process.exit(1));
});
