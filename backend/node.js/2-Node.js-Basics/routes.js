import http from "http";
import fs from "fs";
export function requestHandler(req, res) {
  //   console.log("url", req.url, "method", req.method, "header", req.headers);
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`<html>`);
    res.write("<head> <title> submitform </title> </head>");
    res.write(`<body>`);
    res.write(
      `<form action='/message' method='POST'> <input name='message' type='text'/> <button type='submit' >submit it </button> </form>`,
    );
    res.write(`</body>`);
    res.write(`</html>`);
    res.end();
  } else if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", function (chunk) {
      //it will be executed many times till stream is not completely parsed
      body.push(chunk);
      console.log("chunk s");
      console.log(chunk);
    });

    req.on("end", function () {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile(
        "message.txt",
        `this is my file with value of ${message}`,
        (err) => {
          res.statusCode = 302;
          res.setHeader("Location", "/atul");
          res.end();
        },
      );
    });
  } else {
    res.setHeader("Content-Type", "text/html");
    res.write(`<html>`);
    res.write("<head> <title> submitform </title> </head>");
    res.write(`<body>`);
    res.write(`<p> hey</p>`);
    res.write(`</body>`);
    res.write(`</html>`);
    res.end();
  }
}

// module.exports = requestHandler;
// module.exports = {
//   handler: requestHandler,
//   message: "hey bro",
// };

// module.exports.handler = requestHandler;
// module.exports.message = "hey bro";

// exports = requestHandler;
