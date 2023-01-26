const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");

let apiQuotes = [];

// Get Quotes
async function getQuotes() {
    const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error("Failed to retrieve quotes");
        }
        apiQuotes = await response.json();
    } catch (error) {
        if (error instanceof Error) {
            console.error(`${error.message}: ${error.stack}`);
            console.log("Retrieving local quotes...");
        }

        // Retrieve from quotes.js
        apiQuotes = (await import("./quotes.js")).localQuotes;
    } finally {
        newQuote();
    }
}

// Show New Quote
function newQuote() {
    // Pick random Quote
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // Set author as "Unknown" if quote.author is null
    authorText.textContent = quote.author ? quote.author : "Unknown";

    // Check length to determine styling
    if (quote.text.length > 100) {
        quoteText.classList.add("long-quote");
    } else {
        quoteText.classList.remove("long-quote");
    }
    quoteText.textContent = quote.text;
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

    open(twitterUrl, "_blank");
}

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();
