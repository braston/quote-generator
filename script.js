
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


//Should we be using newer ES updates for async / await?

// Define apiQuotes as an empty array
let apiQuotes = [];

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//  Loading Complete
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show New Quote
function newQuote(){
    loading();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    // Check if author field is blank, replace with 'Unknown'
    if(!quote.author){
        authorText.textContent = '-Unknown';
    }
    else{
        authorText.textContent = `-${quote.author}`;
    }
    // Check quote length to determine styling
    // Can use .classList to add a CSS class to an element
    if(quote.text.length > 50){
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader   
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes from API
//  Async request with try/catch statement
async function getQuotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        //response not populated until data is returned
        const response = await fetch(apiUrl);
        // Convert to JSON
        apiQuotes = await response.json();       
        newQuote();
    } catch (error){
        // Catch Error Here
        console.log(error);
    }
}

// Tweet Quote
function tweetQuote() {
   const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    // _blank configures new tab
   window.open(twitterURL, '_blank');
}

// Event Listeneres - Should be towards bottom, that way functions are declared before being used
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load, run the function
getQuotes();

