import http from "http";

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    const html = `
        <html>
        <head>
        <title> home atul</title>
        </head>

        <body>
        <p> atul sd</p>
        <form action='/create-user' method='POST'>
        <input type='text' name='username'/>
        <button type='submit' > sumbit </button>
        </form>
        </body>
        </html>
    `;

    res.write(html);
    res.end();
  } else if (url === "/users") {
    res.setHeader("Content-Type", "text/html");
    const html = `
        <html>
        <head>
        <title> home </title>
        </head>

        <body>
       <ul>
       <li>user1</li>
       <li>user2</li>
       <li>user3</li>
       </ul>
        
        </body>
        </html>
    `;

    res.write(html);
    res.end();
  } else if (url === "/create-user" && method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log("what ", parsedBody);
      console.log("what ", parsedBody);
      console.log("what ", parsedBody);
      console.log("what 343", parsedBody);
      console.log("what334 ", parsedBody);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      res.end();
    });
  }
});

server.listen(80);
