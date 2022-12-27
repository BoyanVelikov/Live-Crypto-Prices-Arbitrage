let ws = new WebSocket('wss://stream.data.alpaca.markets/v1beta2/crypto');

const priceElementETH = document.getElementById('eth-price');
let lastPriceETH = null;
const priceElementBTC = document.getElementById('btc-price');
let lastPriceBTC = null;
const priceElementETHBTC = document.getElementById('eth-btc-price');
let lastPriceETHBTC = null;
const arbitrage = document.getElementById('arbitrage');


const API_KEY = 'PKI4ECQ9XNFWJQX4RQYN';
const SECRET_KEY = '4t0FL6QtFQIQknAzwxfujAhdGH6UMISjS59cyIGe';
const auth = {"action": "auth", "key": API_KEY, "secret": SECRET_KEY};
const subscribe = {"action":"subscribe","trades":["ETH/USD", "BTC/USD", "ETH/BTC"],"quotes":["ETH/USD", "BTC/USD", "ETH/BTC"],"bars":["ETH/USD", "BTC/USD", "ETH/BTC"]};


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
    } else if (symbol === 'ETH/BTC') {
        let priceETHBTC = data[0]['bp'].toFixed(6);
        priceElementETHBTC.innerHTML = priceETHBTC;
        priceElementETHBTC.style.color = !lastPriceETHBTC || lastPriceETHBTC === priceETHBTC ? 'black' : priceETHBTC > lastPriceETHBTC ? 'green' : 'red';
        lastPriceETHBTC = priceETHBTC;

        console.log(lastPriceETH/lastPriceBTC);
        console.log(lastPriceETHBTC);

        if (lastPriceETH/lastPriceBTC < lastPriceETHBTC) {
            arbitrage.innerHTML = 'YES';
            arbitrage.style.color = 'green';
        } else {
            arbitrage.innerHTML = 'NO';
            arbitrage.style.color = 'red';
        }
    }
    
    // arbitrage.innerHTML = 'No Data';

    
    
};