const express = require('express');
const qr = require('qr-image');
const path = require('path');
const bodyParser = require('body-parser');
const dbHandler = require('./db');

const app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


const template_dir = path.join( __dirname + "/templates/" );

app.get('/', function (req, res) {
    res.sendFile(template_dir + 'home.html');
});
app.post('/qr', function (req, res) {
    console.log(typeof req.body);
    let row = dbHandler.insert_doc(req.body);

    let data = req.body.product_id + "," + req.body.product_name;
    let url = "http://" + req.headers.host + "/get/"+ req.body.product_id;
    const code = qr.image( data+","+url , {type: 'svg'});
    res.type('svg');
    code.pipe(res);
});

app.listen(3000);
