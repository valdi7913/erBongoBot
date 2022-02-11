import fetch from 'node-fetch';
import { Client, Intents } from 'discord.js';
import {} from 'dotenv/config'

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

var lastChecked = new Date(-8640000000000000);
var lastAsked = new Date(-8640000000000000);
var erBongó = false;
client.login(process.env.DISCORD_TOKEN);

client.on('ready', () =>
{
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', gotMessage);

async function gotMessage(msg) {
    console.log(msg.author.username);
    if(msg.author.username != "erBongó?" && (msg.content.includes('veð') || msg.content.includes('bongó'))) {
       checkOutWindow()
       .then(response => response.json())
        .then(data => {
            if(new Date().getTime() > lastChecked.getTime() > 10 * 60 * 1000) {
                erBongó = (data.results[0].F < 5 && data.results[0].T > 12);
                console.log('erBongó :>> ', erBongó);
                lastChecked = new Date();
            }
            if(isAngry()) { msg.channel.send(angryResponse()); }
            else if(erBongó) { 
                lastAsked = new Date();
                msg.channel.send(happyResponse()); 
            }
            else{ 
                lastAsked = new Date();
                msg.channel.send(sadResponse()); 
            }
        });
    }

    if (msg.content.includes('það er ekki bongó')){
        console.log("🌧😭🌧");
        msg.channel.send(":(");   
    }
    console.log(msg.author.username + ": " + msg.content);
}

async function checkOutWindow() {
    return await fetch('http://apis.is/weather/observations/en?stations=1&anytime=0',
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

function isAngry() {
    var now = new Date();
    var diff = now.getTime() - lastAsked.getTime();
    if(diff < 10 * 1000) {
        lastAsked = new Date();
        return true;
    }
    return false;
}

function angryResponse() {
    const responses = [
        "Heyrðu, þú varst að spurja. Helduru að svarið hafi breyst síðan þá?",
        "Bongó er ekki bongó, þú ert ekki bongó.",
        "Áttu brauð?",
    ]
    var randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
}

function happyResponse() {
    const responses = [
        "Það er motherfucking BONGÓ ☀️☀️☀️!!!!",
        "OHHH YEAAAA BITCHES☀️☀️☀️!!!!",
        "Það er BONGÓ ☀️☀️☀️!!!!",
    ]
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
}

function sadResponse(){
    const responses = [
        'Það er ekki Bongó 🌧😭🌧',
        'Nei 🌧😭🌧'
    ]
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
}
