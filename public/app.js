// P5js onload function
function setup() {

    // remove automatically created canvas
    noCanvas();

    // create capture video
    const video = createCapture(VIDEO);

    // specify video size
    video.size(160, 120);

    // add event listener to submit button
    const submitBtn = document.querySelector('#submit');

    const geolocate = async () => {
        // initialize video
        video.loadPixels();

        // get HTML DOM element value
        const mood = document.querySelector('#mood').value;
        const latEl = document.querySelector('#lat');
        const lonEl = document.querySelector('#lon');
        const image64 = video.canvas.toDataURL('image/png');

        // check if geolocation is in navigator
        if('geolocation' in navigator) {
    
            // obtain position using geolocation api getCurrentPosition method
            // make callback position function async
            navigator.geolocation.getCurrentPosition( async position => {
    
                // assign latitude and longitude
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
    
                // change text content of DOM elements
                latEl.textContent = `${lat}°`;
                lonEl.textContent = `${lon}°`;

                // create data object from latitude and longitude and mood
                const data = { lat, lon, mood, image64 };
    
                // setup option for fetching data
                const options = {
                    method: 'POST', // POST method for sending data
                    headers: {
                        'Content-Type': 'application/json' // Type of data to be sent
                    },
                    body: JSON.stringify(data) // convert JS Object into a JSON string
                };
        
                // check if input is not empty
                if (mood) {
                    // assign response from fetch api enpoint
                    const response = await fetch('/api', options);
    
                    // parse response data as json
                    const json = await response.json();
                    console.log(json);
                }
            });
        } else {
        
            // log if geolocation is not available
            console.log('Geolocation is not available');
        }
    };
    
    // call geolocate 
    geolocate();
    // added event listener to submit button
    submitBtn.addEventListener('click', geolocate);
}

