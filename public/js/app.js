// this code can't be used in a back-end node script
// the 'Fetch API' is not part of javascript. It is a browser-based API for modern browsers.
// since this script is running in client-side JS, using the Fetch API is fine here

// wire up the search form
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


// code to run when form submitted
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const location = search.value;
    
    // displays Loading to user while awaiting results
    messageOne.textContent = 'Loading...';
    // clears message to user for next search
    messageTwo.textContent = '';
    

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    });
});