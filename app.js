let ws = new WebSocket('wss://stream.data.alpaca.markets/v1beta2/crypto');

const priceElement = document.getElementById('crypto-price');
let lastPrice = null;

const API_KEY = 'PKN2WI61H3VGTPQ4IT5O';
const SECRET_KEY = 'qtjXhccl4DUN6pibe77swyc1TsFY7phW0DTg5f8k';
const auth = {"action": "auth", "key": API_KEY, "secret": SECRET_KEY};
const subscribe = {"action":"subscribe","trades":["ETH/USD"],"quotes":["ETH/USD"],"bars":["ETH/USD"]};


ws.onmessage = function (event) {
    const data = JSON.parse(event.data);
    const message = data[0]['msg'];

    if(message == 'connected') {
        console.log(message);
        console.log('do authentication');
        ws.send(JSON.stringify(auth));
    }

    if(message == 'authenticated') {
        console.log(message);
        console.log('successful authentication');
        ws.send(JSON.stringify(subscribe));
    }
    
    let price = data[0]['bp'].toFixed(2);
    priceElement.innerHTML = price;
    priceElement.style.color = !lastPrice || lastPrice === price ? 'black' : price > lastPrice ? 'green' : 'red';
    lastPrice = price;
};