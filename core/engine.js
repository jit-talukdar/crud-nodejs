const app = require("../server");
const http = require('http');

app.use(function(req, res, next) {
    res.status(404).json({msg: "Not Found"});
});

const port = process.env.PORT || "3000";
app.set("port", port);
const server = http.createServer(app);
server.listen(port);