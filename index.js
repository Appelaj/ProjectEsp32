const express = require('express');
const bodyParser = require('body-parser');
const mqtt = require('mqtt');
const app = express();
const port = 3000;

const MQTT_SERVER = "0.0.0.0";
const MQTT_PORT = "1883";
const MQTT_USER = ""; 
const MQTT_PASSWORD = "";

var client = mqtt.connect({
    host: MQTT_SERVER,
    port: MQTT_PORT,
    username: MQTT_USER,
    password: MQTT_PASSWORD
});

client.on('connect', function () {
    // Subscribe any topic
    
    console.log("MQTT Connect");
    client.subscribe('/topic/66021937/payload', function (err) {
        if (err) {
            console.log(err);
        }
    });
});


client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString());
});

// setInterval(() => {
//     client.publish("test", "hello from NodeJS");
// }, 5000);

app.set('view engine','ejs');
app.set('views', `${__dirname}/static`);
app.use(bodyParser.urlencoded({ extended: true }));
app.get('', (req, res) => {
    
    res.render('home')
});


app.post('/send', (req, res)=>{
    // const { inp } = req.body
    console.log(req.body)
    
    // console.log(Object.keys(req.body).length)
    let sum = 0x00;
    const payload = [0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00];
    const hexpayload = ['00', '00', '00', '00', '00', '00', '00', '00'];
    if(Object.keys(req.body).length != 0){
        console.log(Object.keys(req.body))
        for(let i = 0; i < Object.keys(req.body).length; i++){
            console.log(Object.keys(req.body)[i])
            switch (Object.keys(req.body)[i][0]){
                case 'a':
                    switch (Object.keys(req.body)[i][1]){
                        case '1':
                            payload[7] += 0x01;
                            console.log('sum [hex] = ' + payload[7].toString(16))
                            console.log('sum [deci] = ' + payload[7])
                            if(payload[7] < 16){
                                hexpayload[7] = '0' + payload[7].toString(16);
                            }else{
                                hexpayload[7] = payload[7].toString(16);
                            }
                            break;
                        case '2':
                            payload[7] += 0x02;
                            console.log('sum [hex] = ' + payload[7].toString(16))
                            console.log('sum [deci] = ' + payload[7])
                            if(payload[7] < 16){
                                hexpayload[7] = '0' + payload[7].toString(16);
                            }else{
                                hexpayload[7] = payload[7].toString(16);
                            }
                            break;
                        case '3':
                            payload[7] += 0x04;
                            console.log('sum [hex] = ' + payload[7].toString(16))
                            console.log('sum [deci] = ' + payload[7])
                            if(payload[7] < 16){
                                hexpayload[7] = '0' + payload[7].toString(16);
                            }else{
                                hexpayload[7] = payload[7].toString(16);
                            }
                            break;
                        case '4':
                            payload[7] += 0x08;
                            console.log('sum [hex] = ' + payload[7].toString(16))
                            console.log('sum [deci] = ' + payload[7])
                            if(payload[7] < 16){
                                hexpayload[7] = '0' + payload[7].toString(16);
                            }else{
                                hexpayload[7] = payload[7].toString(16);
                            }
                            break;
                        case '5':
                            payload[7] += 0x10;
                            console.log('sum [hex] = ' + payload[7].toString(16))
                            console.log('sum [deci] = ' + payload[7])
                            if(payload[7] < 16){
                                hexpayload[7] = '0' + payload[7].toString(16);
                            }else{
                                hexpayload[7] = payload[7].toString(16);
                            }
                            break;
                        case '6':
                            payload[7] += 0x20;
                            console.log('sum [hex] = ' + payload[7].toString(16))
                            console.log('sum [deci] = ' + payload[7])
                            if(payload[7] < 16){
                                hexpayload[7] = '0' + payload[7].toString(16);
                            }else{
                                hexpayload[7] = payload[7].toString(16);
                            }
                            break;
                        case '7':
                            payload[7] += 0x40;
                            console.log('sum [hex] = ' + payload[7].toString(16))
                            console.log('sum [deci] = ' + payload[7])
                            if(payload[7] < 16){
                                hexpayload[7] = '0' + payload[7].toString(16);
                            }else{
                                hexpayload[7] = payload[7].toString(16);
                            }
                            break;
                        case '8':
                            payload[7] += 0x80;
                            console.log('sum [hex] = ' + payload[7].toString(16))
                            console.log('sum [deci] = ' + payload[7])
                            if(payload[7] < 16){
                                hexpayload[7] = '0' + payload[7].toString(16);
                            }else{
                                hexpayload[7] = payload[7].toString(16);
                            }
                            break;

                    }
                    break;
                case 'b':
                    switch (Object.keys(req.body)[i][1]){
                        case '1':
                            payload[6] += 0x01;
                            console.log('sum [hex] = ' + payload[6].toString(16))
                            console.log('sum [deci] = ' + payload[6])
                            if(payload[6] < 16){
                                hexpayload[6] = '0' + payload[6].toString(16);
                            }else{
                                hexpayload[6] = payload[6].toString(16);
                            }
                            break;
                        case '2':
                            payload[6] += 0x02;
                            console.log('sum [hex] = ' + payload[6].toString(16))
                            console.log('sum [deci] = ' + payload[6])
                            if(payload[6] < 16){
                                hexpayload[6] = '0' + payload[6].toString(16);
                            }else{
                                hexpayload[6] = payload[6].toString(16);
                            }
                            break;
                        case '3':
                            payload[6] += 0x04;
                            console.log('sum [hex] = ' + payload[6].toString(16))
                            console.log('sum [deci] = ' + payload[6])
                            if(payload[6] < 16){
                                hexpayload[6] = '0' + payload[6].toString(16);
                            }else{
                                hexpayload[6] = payload[6].toString(16);
                            }
                            break;
                        case '4':
                            payload[6] += 0x08;
                            console.log('sum [hex] = ' + payload[6].toString(16))
                            console.log('sum [deci] = ' + payload[6])
                            if(payload[6] < 16){
                                hexpayload[6] = '0' + payload[6].toString(16);
                            }else{
                                hexpayload[6] = payload[6].toString(16);
                            }
                            break;
                        case '5':
                            payload[6] += 0x10;
                            console.log('sum [hex] = ' + payload[6].toString(16))
                            console.log('sum [deci] = ' + payload[6])
                            if(payload[6] < 16){
                                hexpayload[6] = '0' + payload[6].toString(16);
                            }else{
                                hexpayload[6] = payload[6].toString(16);
                            }
                            break;
                        case '6':
                            payload[6] += 0x20;
                            console.log('sum [hex] = ' + payload[6].toString(16))
                            console.log('sum [deci] = ' + payload[6])
                            if(payload[6] < 16){
                                hexpayload[6] = '0' + payload[6].toString(16);
                            }else{
                                hexpayload[6] = payload[6].toString(16);
                            }
                            break;
                        case '7':
                            payload[6] += 0x40;
                            console.log('sum [hex] = ' + payload[6].toString(16))
                            console.log('sum [deci] = ' + payload[6])
                            if(payload[6] < 16){
                                hexpayload[6] = '0' + payload[6].toString(16);
                            }else{
                                hexpayload[6] = payload[6].toString(16);
                            }
                            break;
                        case '8':
                            payload[6] += 0x80;
                            console.log('sum [hex] = ' + payload[6].toString(16))
                            console.log('sum [deci] = ' + payload[6])
                            if(payload[6] < 16){
                                hexpayload[6] = '0' + payload[6].toString(16);
                            }else{
                                hexpayload[6] = payload[6].toString(16);
                            }
                            break;

                    }
                    break;
                case 'c': 
                    switch (Object.keys(req.body)[i][1]) {
                        case '1':
                            payload[5] += 0x01;
                            console.log('sum [hex] = ' + payload[5].toString(16))
                            console.log('sum [deci] = ' + payload[5])
                            if(payload[5] < 16){
                                hexpayload[5] = '0' + payload[5].toString(16);
                            }else{
                                hexpayload[5] = payload[5].toString(16);
                            }
                            break;
                        case '2':
                            payload[5] += 0x02;
                            console.log('sum [hex] = ' + payload[5].toString(16))
                            console.log('sum [deci] = ' + payload[5])
                            if(payload[5] < 16){
                                hexpayload[5] = '0' + payload[5].toString(16);
                            }else{
                                hexpayload[5] = payload[5].toString(16);
                            }
                            break;
                        case '3':
                            payload[5] += 0x04;
                            console.log('sum [hex] = ' + payload[5].toString(16))
                            console.log('sum [deci] = ' + payload[5])
                            if(payload[5] < 16){
                                hexpayload[5] = '0' + payload[5].toString(16);
                            }else{
                                hexpayload[5] = payload[5].toString(16);
                            }
                            break;
                        case '4':
                            payload[5] += 0x08;
                            console.log('sum [hex] = ' + payload[5].toString(16))
                            console.log('sum [deci] = ' + payload[5])
                            if(payload[5] < 16){
                                hexpayload[5] = '0' + payload[5].toString(16);
                            }else{
                                hexpayload[5] = payload[5].toString(16);
                            }
                            break;
                        case '5':
                            payload[5] += 0x10;
                            console.log('sum [hex] = ' + payload[5].toString(16))
                            console.log('sum [deci] = ' + payload[5])
                            if(payload[5] < 16){
                                hexpayload[5] = '0' + payload[5].toString(16);
                            }else{
                                hexpayload[5] = payload[5].toString(16);
                            }
                            break;
                        case '6':
                            payload[5] += 0x20;
                            console.log('sum [hex] = ' + payload[5].toString(16))
                            console.log('sum [deci] = ' + payload[5])
                            if(payload[5] < 16){
                                hexpayload[5] = '0' + payload[5].toString(16);
                            }else{
                                hexpayload[5] = payload[5].toString(16);
                            }
                            break;
                        case '7':
                            payload[5] += 0x40;
                            console.log('sum [hex] = ' + payload[5].toString(16))
                            console.log('sum [deci] = ' + payload[5])
                            if(payload[5] < 16){
                                hexpayload[5] = '0' + payload[5].toString(16);
                            }else{
                                hexpayload[5] = payload[5].toString(16);
                            }
                            break;
                        case '8':
                            payload[5] += 0x80;
                            console.log('sum [hex] = ' + payload[5].toString(16))
                            console.log('sum [deci] = ' + payload[5])
                            if(payload[5] < 16){
                                hexpayload[5] = '0' + payload[5].toString(16);
                            }else{
                                hexpayload[5] = payload[5].toString(16);
                            }
                            break;
                    }
                    break;
                case 'd': 
                    switch (Object.keys(req.body)[i][1]) {
                        case '1':
                            payload[4] += 0x01;
                            console.log('sum [hex] = ' + payload[4].toString(16))
                            console.log('sum [deci] = ' + payload[4])
                            if(payload[4] < 16){
                                hexpayload[4] = '0' + payload[4].toString(16);
                            }else{
                                hexpayload[4] = payload[4].toString(16);
                            }
                            break;
                        case '2':
                            payload[4] += 0x02;
                            console.log('sum [hex] = ' + payload[4].toString(16))
                            console.log('sum [deci] = ' + payload[4])
                            if(payload[4] < 16){
                                hexpayload[4] = '0' + payload[4].toString(16);
                            }else{
                                hexpayload[4] = payload[4].toString(16);
                            }
                            break;
                        case '3':
                            payload[4] += 0x04;
                            console.log('sum [hex] = ' + payload[4].toString(16))
                            console.log('sum [deci] = ' + payload[4])
                            if(payload[4] < 16){
                                hexpayload[4] = '0' + payload[4].toString(16);
                            }else{
                                hexpayload[4] = payload[4].toString(16);
                            }
                            break;
                        case '4':
                            payload[4] += 0x08;
                            console.log('sum [hex] = ' + payload[4].toString(16))
                            console.log('sum [deci] = ' + payload[4])
                            if(payload[4] < 16){
                                hexpayload[4] = '0' + payload[4].toString(16);
                            }else{
                                hexpayload[4] = payload[4].toString(16);
                            }
                            break;
                        case '5':
                            payload[4] += 0x10;
                            console.log('sum [hex] = ' + payload[4].toString(16))
                            console.log('sum [deci] = ' + payload[4])
                            if(payload[4] < 16){
                                hexpayload[4] = '0' + payload[4].toString(16);
                            }else{
                                hexpayload[4] = payload[4].toString(16);
                            }
                            break;
                        case '6':
                            payload[4] += 0x20;
                            console.log('sum [hex] = ' + payload[4].toString(16))
                            console.log('sum [deci] = ' + payload[4])
                            if(payload[4] < 16){
                                hexpayload[4] = '0' + payload[4].toString(16);
                            }else{
                                hexpayload[4] = payload[4].toString(16);
                            }
                            break;
                        case '7':
                            payload[4] += 0x40;
                            console.log('sum [hex] = ' + payload[4].toString(16))
                            console.log('sum [deci] = ' + payload[4])
                            if(payload[4] < 16){
                                hexpayload[4] = '0' + payload[4].toString(16);
                            }else{
                                hexpayload[4] = payload[4].toString(16);
                            }
                            break;
                        case '8':
                            payload[4] += 0x80;
                            console.log('sum [hex] = ' + payload[4].toString(16))
                            console.log('sum [deci] = ' + payload[4])
                            if(payload[4] < 16){
                                hexpayload[4] = '0' + payload[4].toString(16);
                            }else{
                                hexpayload[4] = payload[4].toString(16);
                            }
                            break;
                    }
                    break;
                case 'e': 
                    switch (Object.keys(req.body)[i][1]) {
                        case '1':
                            payload[3] += 0x01;
                            console.log('sum [hex] = ' + payload[3].toString(16))
                            console.log('sum [deci] = ' + payload[3])
                            if(payload[3] < 16){
                                hexpayload[3] = '0' + payload[3].toString(16);
                            }else{
                                hexpayload[3] = payload[3].toString(16);
                            }
                            break;
                        case '2':
                            payload[3] += 0x02;
                            console.log('sum [hex] = ' + payload[3].toString(16))
                            console.log('sum [deci] = ' + payload[3])
                            if(payload[3] < 16){
                                hexpayload[3] = '0' + payload[3].toString(16);
                            }else{
                                hexpayload[3] = payload[3].toString(16);
                            }
                            break;
                        case '3':
                            payload[3] += 0x04;
                            console.log('sum [hex] = ' + payload[3].toString(16))
                            console.log('sum [deci] = ' + payload[3])
                            if(payload[3] < 16){
                                hexpayload[3] = '0' + payload[3].toString(16);
                            }else{
                                hexpayload[3] = payload[3].toString(16);
                            }
                            break;
                        case '4':
                            payload[3] += 0x08;
                            console.log('sum [hex] = ' + payload[3].toString(16))
                            console.log('sum [deci] = ' + payload[3])
                            if(payload[3] < 16){
                                hexpayload[3] = '0' + payload[3].toString(16);
                            }else{
                                hexpayload[3] = payload[3].toString(16);
                            }
                            break;
                        case '5':
                            payload[3] += 0x10;
                            console.log('sum [hex] = ' + payload[3].toString(16))
                            console.log('sum [deci] = ' + payload[3])
                            if(payload[3] < 16){
                                hexpayload[3] = '0' + payload[3].toString(16);
                            }else{
                                hexpayload[3] = payload[3].toString(16);
                            }
                            break;
                        case '6':
                            payload[3] += 0x20;
                            console.log('sum [hex] = ' + payload[3].toString(16))
                            console.log('sum [deci] = ' + payload[3])
                            if(payload[3] < 16){
                                hexpayload[3] = '0' + payload[3].toString(16);
                            }else{
                                hexpayload[3] = payload[3].toString(16);
                            }
                            break;
                        case '7':
                            payload[3] += 0x40;
                            console.log('sum [hex] = ' + payload[3].toString(16))
                            console.log('sum [deci] = ' + payload[3])
                            if(payload[3] < 16){
                                hexpayload[3] = '0' + payload[3].toString(16);
                            }else{
                                hexpayload[3] = payload[3].toString(16);
                            }
                            break;
                        case '8':
                            payload[3] += 0x80;
                            console.log('sum [hex] = ' + payload[3].toString(16))
                            console.log('sum [deci] = ' + payload[3])
                            if(payload[3] < 16){
                                hexpayload[3] = '0' + payload[3].toString(16);
                            }else{
                                hexpayload[3] = payload[3].toString(16);
                            }
                            break;
                    }
                    break;
                case 'f': 
                    switch (Object.keys(req.body)[i][1]) {
                        case '1':
                            payload[2] += 0x01;
                            console.log('sum [hex] = ' + payload[2].toString(16))
                            console.log('sum [deci] = ' + payload[2])
                            if(payload[2] < 16){
                                hexpayload[2] = '0' + payload[2].toString(16);
                            }else{
                                hexpayload[2] = payload[2].toString(16);
                            }
                            break;
                        case '2':
                            payload[2] += 0x02;
                            console.log('sum [hex] = ' + payload[2].toString(16))
                            console.log('sum [deci] = ' + payload[2])
                            if(payload[2] < 16){
                                hexpayload[2] = '0' + payload[2].toString(16);
                            }else{
                                hexpayload[2] = payload[2].toString(16);
                            }
                            break;
                        case '3':
                            payload[2] += 0x04;
                            console.log('sum [hex] = ' + payload[2].toString(16))
                            console.log('sum [deci] = ' + payload[2])
                            if(payload[2] < 16){
                                hexpayload[2] = '0' + payload[2].toString(16);
                            }else{
                                hexpayload[2] = payload[2].toString(16);
                            }
                            break;
                        case '4':
                            payload[2] += 0x08;
                            console.log('sum [hex] = ' + payload[2].toString(16))
                            console.log('sum [deci] = ' + payload[2])
                            if(payload[2] < 16){
                                hexpayload[2] = '0' + payload[2].toString(16);
                            }else{
                                hexpayload[2] = payload[2].toString(16);
                            }
                            break;
                        case '5':
                            payload[2] += 0x10;
                            console.log('sum [hex] = ' + payload[2].toString(16))
                            console.log('sum [deci] = ' + payload[2])
                            if(payload[2] < 16){
                                hexpayload[2] = '0' + payload[2].toString(16);
                            }else{
                                hexpayload[2] = payload[2].toString(16);
                            }
                            break;
                        case '6':
                            payload[2] += 0x20;
                            console.log('sum [hex] = ' + payload[2].toString(16))
                            console.log('sum [deci] = ' + payload[2])
                            if(payload[2] < 16){
                                hexpayload[2] = '0' + payload[2].toString(16);
                            }else{
                                hexpayload[2] = payload[2].toString(16);
                            }
                            break;
                        case '7':
                            payload[2] += 0x40;
                            console.log('sum [hex] = ' + payload[2].toString(16))
                            console.log('sum [deci] = ' + payload[2])
                            if(payload[2] < 16){
                                hexpayload[2] = '0' + payload[2].toString(16);
                            }else{
                                hexpayload[2] = payload[2].toString(16);
                            }
                            break;
                        case '8':
                            payload[2] += 0x80;
                            console.log('sum [hex] = ' + payload[2].toString(16))
                            console.log('sum [deci] = ' + payload[2])
                            if(payload[2] < 16){
                                hexpayload[2] = '0' + payload[2].toString(16);
                            }else{
                                hexpayload[2] = payload[2].toString(16);
                            }
                            break;
                    }
                    break;
                case 'g': 
                    switch (Object.keys(req.body)[i][1]) {
                        case '1':
                            payload[1] += 0x01;
                            console.log('sum [hex] = ' + payload[1].toString(16))
                            console.log('sum [deci] = ' + payload[1])
                            if(payload[1] < 16){
                                hexpayload[1] = '0' + payload[1].toString(16);
                            }else{
                                hexpayload[1] = payload[1].toString(16);
                            }
                            break;
                        case '2':
                            payload[1] += 0x02;
                            console.log('sum [hex] = ' + payload[1].toString(16))
                            console.log('sum [deci] = ' + payload[1])
                            if(payload[1] < 16){
                                hexpayload[1] = '0' + payload[1].toString(16);
                            }else{
                                hexpayload[1] = payload[1].toString(16);
                            }
                            break;
                        case '3':
                            payload[1] += 0x04;
                            console.log('sum [hex] = ' + payload[1].toString(16))
                            console.log('sum [deci] = ' + payload[1])
                            if(payload[1] < 16){
                                hexpayload[1] = '0' + payload[1].toString(16);
                            }else{
                                hexpayload[1] = payload[1].toString(16);
                            }
                            break;
                        case '4':
                            payload[1] += 0x08;
                            console.log('sum [hex] = ' + payload[1].toString(16))
                            console.log('sum [deci] = ' + payload[1])
                            if(payload[1] < 16){
                                hexpayload[1] = '0' + payload[1].toString(16);
                            }else{
                                hexpayload[1] = payload[1].toString(16);
                            }
                            break;
                        case '5':
                            payload[1] += 0x10;
                            console.log('sum [hex] = ' + payload[1].toString(16))
                            console.log('sum [deci] = ' + payload[1])
                            if(payload[1] < 16){
                                hexpayload[1] = '0' + payload[1].toString(16);
                            }else{
                                hexpayload[1] = payload[1].toString(16);
                            }
                            break;
                        case '6':
                            payload[1] += 0x20;
                            console.log('sum [hex] = ' + payload[1].toString(16))
                            console.log('sum [deci] = ' + payload[1])
                            if(payload[1] < 16){
                                hexpayload[1] = '0' + payload[1].toString(16);
                            }else{
                                hexpayload[1] = payload[1].toString(16);
                            }
                            break;
                        case '7':
                            payload[1] += 0x40;
                            console.log('sum [hex] = ' + payload[1].toString(16))
                            console.log('sum [deci] = ' + payload[1])
                            if(payload[1] < 16){
                                hexpayload[1] = '0' + payload[1].toString(16);
                            }else{
                                hexpayload[1] = payload[1].toString(16);
                            }
                            break;
                        case '8':
                            payload[1] += 0x80;
                            console.log('sum [hex] = ' + payload[1].toString(16))
                            console.log('sum [deci] = ' + payload[1])
                            if(payload[1] < 16){
                                hexpayload[1] = '0' + payload[1].toString(16);
                            }else{
                                hexpayload[1] = payload[1].toString(16);
                            }
                            break;
                    }
                    break;
                case 'h': 
                    switch (Object.keys(req.body)[i][1]) {
                        case '1':
                            payload[0] += 0x01;
                            console.log('sum [hex] = ' + payload[0].toString(16))
                            console.log('sum [deci] = ' + payload[0])
                            if(payload[0] < 16){
                                hexpayload[0] = '0' + payload[0].toString(16);
                            }else{
                                hexpayload[0] = payload[0].toString(16);
                            }
                            break;
                        case '2':
                            payload[0] += 0x02;
                            console.log('sum [hex] = ' + payload[0].toString(16))
                            console.log('sum [deci] = ' + payload[0])
                            if(payload[0] < 16){
                                hexpayload[0] = '0' + payload[0].toString(16);
                            }else{
                                hexpayload[0] = payload[0].toString(16);
                            }
                            break;
                        case '3':
                            payload[0] += 0x04;
                            console.log('sum [hex] = ' + payload[0].toString(16))
                            console.log('sum [deci] = ' + payload[0])
                            if(payload[0] < 16){
                                hexpayload[0] = '0' + payload[0].toString(16);
                            }else{
                                hexpayload[0] = payload[0].toString(16);
                            }
                            break;
                        case '4':
                            payload[0] += 0x08;
                            console.log('sum [hex] = ' + payload[0].toString(16))
                            console.log('sum [deci] = ' + payload[0])
                            if(payload[0] < 16){
                                hexpayload[0] = '0' + payload[0].toString(16);
                            }else{
                                hexpayload[0] = payload[0].toString(16);
                            }
                            break;
                        case '5':
                            payload[0] += 0x10;
                            console.log('sum [hex] = ' + payload[0].toString(16))
                            console.log('sum [deci] = ' + payload[0])
                            if(payload[0] < 16){
                                hexpayload[0] = '0' + payload[0].toString(16);
                            }else{
                                hexpayload[0] = payload[0].toString(16);
                            }
                            break;
                        case '6':
                            payload[0] += 0x20;
                            console.log('sum [hex] = ' + payload[0].toString(16))
                            console.log('sum [deci] = ' + payload[0])
                            if(payload[0] < 16){
                                hexpayload[0] = '0' + payload[0].toString(16);
                            }else{
                                hexpayload[0] = payload[0].toString(16);
                            }
                            break;
                        case '7':
                            payload[0] += 0x40;
                            console.log('sum [hex] = ' + payload[0].toString(16))
                            console.log('sum [deci] = ' + payload[0])
                            if(payload[0] < 16){
                                hexpayload[0] = '0' + payload[0].toString(16);
                            }else{
                                hexpayload[0] = payload[0].toString(16);
                            }
                            break;
                        case '8':
                            payload[0] += 0x80;
                            console.log('sum [hex] = ' + payload[0].toString(16))
                            console.log('sum [deci] = ' + payload[0])
                            if(payload[0] < 16){
                                hexpayload[0] = '0' + payload[0].toString(16);
                            }else{
                                hexpayload[0] = payload[0].toString(16);
                            }
                            break;
                    }
                    break;
            }
        }
        console.log(payload.toString(16))
        console.log(hexpayload.toString(16))
        let a = '';
        for(let i = 0; i < 8; i++){
            a += hexpayload[i].toString(16);
        }
        console.log(a)
        client.publish("/topic/66021937/payload", a);
    }else{
        let a = '';
        for(let i = 0; i < 8; i++){
            a += hexpayload[i].toString(16);
        }
        console.log(a)
        client.publish("/topic/66021937/payload", a);
    }
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});