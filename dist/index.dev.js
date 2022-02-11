"use strict";

require('dotenv').config();

var fetch = require('node-fetch');

var _require = require('discord.js'),
    Client = _require.Client,
    Intents = _require.Intents;

var client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});
client.login(process.env.DISCORD_TOKEN);
client.on('ready', function () {
  console.log("Logged in as ".concat(client.user.tag, "!"));
});
client.on('messageCreate', gotMessage);

function gotMessage(msg) {
  // console.log(msg);
  fetch('http://example.com/movies.json%27').then(function (response) {
    return response.json();
  }).then(function (data) {
    return console.log(data);
  });

  if (msg.content.includes('veð')) {
    msg.channel.send("Það er motherfuking bongó!!!!!");
  }

  if (msg.content.includes('það er ekki bongó')) {
    console.log("Það er ekki bongó");
    msg.channel.send(":(");
  }

  console.log(msg.author.username + ": " + msg.content); // msg.reply('Það er Bongó!!! ☀️');
  // if(msg.content === 'hvernig er veðrið?') {
  // }
}