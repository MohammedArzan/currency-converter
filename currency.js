const apiKey = 'YOUR_API_KEY';  // Replace with your currency API key
const apiUrl = `https://api.exchangerate-api.com/v4/latest/`;

async function populateCurrencies() {
    const response = await fetch(`${apiUrl}USD`);
    const data = await response.json();
    const currencyOptions = Object.keys(data.rates);
    const fromCurrency = document.getElementById("fromCurrency");
    const toCurrency = document.getElementById("toCurrency");

    currencyOptions.forEach(currency => {
        const option1 = document.createElement("option");
        const option2 = document.createElement("option");
        option1.value = option2.value = currency;
        option1.text = option2.text = currency;
        fromCurrency.add(option1);
        toCurrency.add(option2);
    });
}

async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    
    if (amount === "") {
        document.getElementById("result").innerText = "Please enter an amount";
        return;
    }

    const response = await fetch(`${apiUrl}${fromCurrency}`);
    const data = await response.json();
    const rate = data.rates[toCurrency];
    const result = amount * rate;
    document.getElementById("result").innerText = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
}

populateCurrencies();
