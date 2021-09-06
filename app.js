const express = require('express');
const app = express();
const serv = require('http').Server(app);
const fs = require("fs");
const { uptime } = require('process');

app.get('/',function(req,res) {
    res.sendFile(__dirname + '/stuff/index.html');
});

app.get('/add/:variable/:number',function(req,res) {
    if(req.params.number) {
        let json = JSON.parse(fs.readFileSync("./roblox.json"));
        console.log(req.params.variable);
        console.log(req.params.number);
        eval(`json.${req.params.variable} += ${req.params.number}`);
        eval(`if(json.${req.params.variable} == null) {json.${req.params.variable} = ${req.params.number}}`);
        //json.testNumb += parseInt(req.query.set);
        fs.writeFileSync("./roblox.json",JSON.stringify(json));
        res.sendStatus(200);
    }else {
        res.send("bruh you have to do /add/variablename/100");
    }
});

app.get('/set/:variable/:number',function(req,res) {
    if(req.params.number) {
        let json = JSON.parse(fs.readFileSync("./roblox.json"));
        console.log(req.params.variable);
        console.log(req.params.number);
        try {
            eval(`json.${req.params.variable} = ${req.params.number}`);
        }catch(deeznuts) {
            eval(`json.${req.params.variable} = "${req.params.number}"`);
        }
        //json.testNumb += parseInt(req.query.set);
        fs.writeFileSync("./roblox.json",JSON.stringify(json));
        res.sendStatus(200);
    }else {
        res.send("bruh you have to do /set/variablename/100");
    }
});

app.get('/trolling',function(req,res) {
    console.log(req.url.substring("/trolling?".length));

    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    console.log(ip);

    if(ip.startsWith("35")) {
        res.sendFile(__dirname + '/stuff/img/trolling.png');
    }else if(ip.startsWith("34")) {
        res.sendFile(__dirname + '/stuff/img/amogus.png');
    }else {
        //print(atob(req.url.substring("/trolling?".length)));
        res.redirect(Buffer.from(req.url.substring("/trolling?".length), 'base64').toString());
    }
});

app.get('/trollmaker',function(req,res) {
    res.sendFile(__dirname + '/stuff/trollingmaker.html');
});

app.use('/',express.static(__dirname + '/stuff'));

serv.listen(process.env.PORT || 2000);

console.log("doin' ur mom doin' doin' ur mom");

