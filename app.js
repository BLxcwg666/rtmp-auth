// if you use my wheel, you must indicate this file is from
// https://github.com/BLxcwg666/rtmp-auth

const config = require("./config");
const express = require('express');
const log = require('./utils/logger');
const moment = require('moment-timezone');
const routes = require("./modules/router");

const app = express();

const host = config.API_HOST;
const port = config.API_PORT;

global.version = "1.0.1";
global.time = function () {
    return moment().tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');
}

app.use(express.urlencoded({ extended: false }));
app.use('/', routes);
app.listen(port, host, async () => {
    log.info(`API Started at port ${port} on ${host}`, "APP")
});