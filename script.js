async function displayAboutSection() {
    const bitcoinLogo = document.getElementById("bitcoinLogo");
    const ethereumLogo = document.getElementById("ethereumLogo");
    const aboutLeft = document.querySelector(".about-left");
    const aboutRight = document.querySelector(".about-right");

    // Fetch data for Bitcoin and Ethereum
    const bitcoinData = await fetchCryptocurrencyDataForId("bitcoin");
    const ethereumData = await fetchCryptocurrencyDataForId("ethereum");

    bitcoinLogo.src = bitcoinData.image;
    aboutLeft.innerHTML += `
        <div class="crypto-price">$${bitcoinData.current_price.toFixed(2)}</div>
        <div class="crypto-change ${bitcoinData.price_change_percentage_24h >= 0 ? '' : 'negative'}">${bitcoinData.price_change_percentage_24h.toFixed(2)}%</div>
    `;

    ethereumLogo.src = ethereumData.image;
    aboutRight.innerHTML += `
        <div class="crypto-price">$${ethereumData.current_price.toFixed(2)}</div>
        <div class="crypto-change ${ethereumData.price_change_percentage_24h >= 0 ? '' : 'negative'}">${ethereumData.price_change_percentage_24h.toFixed(2)}%</div>
    `;
}







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
        "fantom",
        "binancecoin", // BNB
        "tether",      // Tether
        "ripple",      // XRP
        "dogecoin"     // Dogecoin
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
            <div class="crypto-logo">
                <img src="${crypto.image}" class="crypto-logo-small">
            </div>
            <div class="crypto-name">${crypto.name}</div>
            <div class="crypto-price">$${crypto.current_price.toFixed(2)}</div>
            <div class="crypto-change ${crypto.price_change_percentage_24h >= 0 ? '' : 'negative'}">${crypto.price_change_percentage_24h.toFixed(2)}%</div>
        `;
        return cryptoItem;
    }
}

// Get the navigation menu element
const nav = document.querySelector('nav');

// Get the height of the navigation menu
const navHeight = nav.getBoundingClientRect().height;

// Add a scroll event listener
window.addEventListener('scroll', () => {
    // Check the scroll position
    if (window.scrollY > navHeight) {
        // If the user has scrolled beyond the navigation height, add the fixed-nav class
        nav.classList.add('fixed-nav');
    } else {
        // Otherwise, remove the fixed-nav class
        nav.classList.remove('fixed-nav');
    }
});



displayCryptocurrencies();
