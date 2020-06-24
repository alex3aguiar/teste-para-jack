var express = require('express');
var pokemons = require('./pokemons.json');

var app = express();
const path = require('path');
var porta = process.env.PORT || 8080;

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});


app.get('/search', function (req, res) {
    const quantity = req.query.quantity ? req.query.quantity : 20;
    const name = req.query.name;
    console.log(quantity,name)
    const filteredList = pokemons
        .filter(item => {
            if (name === "" || name === null) {
                return true;
            }
            console.log(item.name.english)
            console.log(item.name.english.split(name).length )
            return item.name.english.split(name).length > 1;
        })
        .slice(0, quantity)
    console.log(filteredList)
    res.send(filteredList);
});

app.listen(porta, function () {
    console.log('Example app listening on port 3000!');
});
