const express = require("express");
const log = require("../utils/logger");

const router = express.Router();

const validKeys = new Set([
    'streamkey123',
    'abc456',
    'test789',
]);

// 这他妈只是个示例，不要狗叫我为什么硬编码了，你不会自己改吗

const validApps = new Set([
    'live',
    'rtmp',
    'myapp',
]);

router.post('/', (req, res) => {
    const { app: appName, name: streamKey, addr } = req.body;
    
    if (!validApps.has(appName)) {
      log.info(`Invalid APP: ${appName} from ${addr}`, "AUTH");
      return res.status(403).json({ success: false, msg: "Invalid APP" });
    }
  
    if (validKeys.has(streamKey)) {
      log.info(`App: ${appName}, Key: ${streamKey}, IP: ${addr}`, "AUTH");
      return res.status(200).json({ success: true, msg: "Authorization successful" });
    } else {
      log.warn(`IP: ${addr} Authorization ${appName} failed`, "AUTH");
      return res.status(403).json({ success: false, msg: "Invalid Stream Key" });
    }
});

module.exports = router;