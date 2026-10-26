const a = require("@babel/register");
a({ extensions: [".js", ".jsx"] });

require("./server.js");
