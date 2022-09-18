var NodeWebcam = require("node-webcam");
var moment = require("moment");
var cron = require("node-cron");
var colors = require("colors");
var axios = require("axios");

exports.inProgress = false;
exports.takePhoto = (callback) => {
    if (exports.inProgress) {
        callback("Photo in progress.", null);
        return;
    }

    exports.inProgress = true;

    var opts = {
        width: 1920,
        height: 1080,
        quality: 100,
        frames: 30,
        delay: 0,
        saveShots: true,
        output: "jpeg",
        device: false,
        callbackReturn: "location",
        verbose: false,
    };

    const date = Date.now();
    const title = moment(date).format();
    var Webcam = NodeWebcam.create(opts);

    Webcam.list(function (list) {
        console.log(list);
    });

    console.log("Snapping a photo...".yellow);
    Webcam.capture(`captures/${title}`, function (err, data) {
        if (callback) callback(err, data);
        exports.inProgress = false;
    });
};
