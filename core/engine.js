const app = require("../server");
const http = require('http');
const chalk = require('chalk');

app.use(function (err, req, res, next) {
    console.log(chalk.red(err.stack));
    res.status(500).json({status: 500, msg: err.message});
});

const port = process.env.PORT || "3000";
app.set("port", port);
const server = http.createServer(app);
server.listen(port);