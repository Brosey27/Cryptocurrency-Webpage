const cryptoList = document.getElementById("cryptoList");

async function fetchCryptocurrencyData() {
    const coinIds = [
        "ethereum", 
        "bitcoin", 
        "cardano", 
        "axie-infinity", 
        "ronin",
        "pepe-cash",
        "small-love-potion",
        "helium",
        "usd-coin",
        "fantom"
    ];
    
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds.join(",")}`);
    const data = await response.json();
    return data;
}


async function displayCryptocurrencies() {
    try {
        const cryptoData = await fetchCryptocurrencyData();

        if (!Array.isArray(cryptoData)) {
            console.error("API response is not an array:", cryptoData);
            return;
        }

        cryptoData.forEach(crypto => {
            const cryptoItem = createCryptoItem(crypto);
            cryptoList.appendChild(cryptoItem);
        });
    } catch (error) {
        console.error("Error fetching cryptocurrency data:", error);
    }
    function createCryptoItem(crypto) {
        const cryptoItem = document.createElement("div");
        cryptoItem.classList.add("crypto-item");
        cryptoItem.innerHTML = `
            <div class="crypto-name">${crypto.name}</div>
            <div class="crypto-price">$${crypto.current_price.toFixed(2)}</div>
            <div class="crypto-change ${crypto.price_change_percentage_24h >= 0 ? '' : 'negative'}">${crypto.price_change_percentage_24h.toFixed(2)}%</div>
        `;
        return cryptoItem;
    }
}

displayCryptocurrencies();




    


