let ws = new WebSocket('wss://stream.data.alpaca.markets/v1beta2/crypto');

const priceElementETH = document.getElementById('eth-price');
let lastPriceETH = null;
const priceElementBTC = document.getElementById('btc-price');
let lastPriceBTC = null;

const API_KEY = 'PKN2WI61H3VGTPQ4IT5O';
const SECRET_KEY = 'qtjXhccl4DUN6pibe77swyc1TsFY7phW0DTg5f8k';
const auth = {"action": "auth", "key": API_KEY, "secret": SECRET_KEY};
const subscribe = {"action":"subscribe","trades":["ETH/USD", "BTC/USD"],"quotes":["ETH/USD", "BTC/USD"],"bars":["ETH/USD", "BTC/USD"]};


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
    
    console.log(data[0]['S']);

    let symbol = data[0]['S'];

    if (symbol === 'ETH/USD') {
        let priceETH = data[0]['bp'].toFixed(2);
        priceElementETH.innerHTML = priceETH;
        priceElementETH.style.color = !lastPriceETH || lastPriceETH === priceETH ? 'black' : priceETH > lastPriceETH ? 'green' : 'red';
        lastPriceETH = priceETH;
    } else if (symbol === 'BTC/USD') {
        let priceBTC = data[0]['bp'].toFixed(2);
        priceElementBTC.innerHTML = priceBTC;
        priceElementBTC.style.color = !lastPriceBTC || lastPriceBTC === priceBTC ? 'black' : priceBTC > lastPriceBTC ? 'green' : 'red';
        lastPriceBTC = priceBTC;
    }
    

    

};