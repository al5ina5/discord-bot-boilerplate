require("dotenv").config();
const Discord = require("discord.js");
const fs = require("fs");
const photo = require("./lib/photo.js");
const moment = require("moment");
var cron = require("node-cron");

// Create a Discord.Client() instance.
const client = new Discord.Client();

cron.schedule("0 0 * * * *", () => {
    console.log(`It's time! Snapping a photo.`.yellow);
    photo.takePhoto((err, data) => {
        const date = Date.now();
        const title = moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a");
        client.channels
            .get("810238535994966057")
            .send(`Photo snapped! ${title}`, { files: [data] });
    });
});

// Load all commands into the client's commands object from the /commands/ folder.
client.commands = {};
fs.readdir("./commands", (err, files) => {
    try {
        files.forEach((file) => {
            var prop = require(`./commands/${file}`);
            client.commands[file.split(".")[0]] = prop;
        });
    } catch (err) {
        console.log(err);
    }
});

// Load all commands into the client's events object from the /events/ folder.
client.events = {};
fs.readdir("./events", (err, files) => {
    try {
        files.forEach((file) => {
            var eventName = file.split(".")[0];
            var prop = require(`./events/${file}`);

            client.events[eventName] = prop;
            client.on(eventName, prop.bind(null, client));
        });
    } catch (err) {
        console.log(err);
    }
});

// Initiate the connection with Discord using the token located in the client's settings object.
client.login(process.env.BOT_TOKEN);

// Catch and report discord.js errors.
client.on("error", (err) => console.error(err));
client.on("warn", (err) => console.warn(err));
// client.on('debug', (err) => console.info(err))

// Catch and report UnhandledPromiseRejectionWarnings.
process.on("unhandledRejection", (error) =>
    console.error("Uncaught Promise Rejection", error)
);
