const photo = require("../lib/photo.js");
const moment = require("moment");
const prettyBytes = require("pretty-bytes");
const checkDiskSpace = require("check-disk-space");

exports.run = (client, message, args) => {
    console.log("Checking diskspace...");
    checkDiskSpace("/").then((diskSpace) => {
        console.log(diskSpace);
        message.channel.send(
            `Disk space left: ${prettyBytes(diskSpace.free)} (${
                diskSpace.free
            })`
        );
    });
};

exports.help = "Displays available disk space.";
exports.aliases = [];
