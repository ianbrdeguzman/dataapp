// fetch data
const getData = async () => {

    // response await fetch
    const response = await fetch('/api');

    // data await response as json
    const data = await response.json();  

    // loop over all key in data
    for (let key in data) {

        // change timestamp into locale string date
        const dateString = new Date(data[key].timestamp).toLocaleString();
        const container = document.querySelector('.app-container');

        // create new div
        const div = `
                <div class="list">
                mood: ${data[key].mood}</br>
                latitude: ${data[key].lat}°, longitude: ${data[key].lon}°</br>
                timestamp: ${dateString}</br>
                <img src="${data[key].image64}"><br>
                </div>
                `
        // insert new div into the HTML body
        container.insertAdjacentHTML('beforeend', div);
    }
};
// call getData
getData();