const photo = require("../lib/photo.js");
const moment = require("moment");

exports.run = (client, message, args) => {
    message.channel.send(`Snapping photo...`).then((msg) => {
        photo.takePhoto((err, data) => {
            msg.delete();

            if (err) {
                console.log(err);
                message.channel.send(
                    `An error occurred. A snap might already be in progress! :( `
                );
                return;
            }

            const date = Date.now();
            const title = moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a");
            message.channel.send(`${title}`, { files: [data] });
        });
    });
};

exports.help = "Takes a photo.";
exports.aliases = ["snap"];
