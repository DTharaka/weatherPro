const cityForm = document.querySelector('form');
const card= document.querySelector('.card');
const details= document.querySelector('.details');
const time= document.querySelector('img.time');
const icon= document.querySelector('.icon img');

const updateUI = (data) => {
    const cityDets = data.cityDetails;
    const weather = data.weatherDetails;

    console.log(data);

    // Update the datail card
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
            <div class="display-4 my-4">
                <span>${weather.Temperature.Metric.Value}</span>
                <span>&#8451</span>
                <!-- <span>temp</span>
                <span>&#8457</span> -->
            </div>
            <div class="my-2">${weather.LocalObservationDateTime}</div>
    `;

    // Update the night/day and icons
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src',iconSrc);

    let timeSrc = null;
    if(weather.IsDayTime){
        timeSrc = 'img/day.svg';
    }else{
        timeSrc = 'img/night.svg';
    }
    time.setAttribute('src',timeSrc);

    //Remove the d-none class if it have
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
}

const updateCity = async (city) => {
    
    const cityDetails = await getCity(city);
    const weatherDetails = await getWeather(cityDetails.Key);

    return{
        cityDetails : cityDetails,
        weatherDetails : weatherDetails
    };
};

cityForm.addEventListener('submit',(event)=>{
// prevent defalt action
event.preventDefault();

// get city
const city = cityForm.city.value.trim();
cityForm.reset();

// update the UI
updateCity(city)
    .then((data)=>{
        updateUI(data);
    })
    .catch((err)=>{
        console.log(err);
    });
// set localStorage 
    localStorage.setItem('city',city);
});

if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
    .then((data)=>{
        updateUI(data);
    })
    .catch((err)=>{
        console.log(err);
    })
}
