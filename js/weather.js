const getWeatherInfo = async query => {
    const apikey = '571fed81ead2a8415cbfa38c331be917'
    const  baseURI = 'https://api.openweathermap.org/data/2.5/weather'
    const weatherInfo = await (await fetch(`${baseURI}?${query}&appid=${apikey}`)).json()
    return weatherInfo
}

const weatherReport = data => {
    const $ = id => document.getElementById(id) 
    const convertK2C = temp => `${Math.floor(temp - 273)} °C`
    const setValue = id => value => $(id).innerText = value
    const setImage = id => value => $(id).src = value
    setValue('city')(`${data.name}, ${data.sys.country}`)
    setValue('temperature')(convertK2C(data.main.temp))
    setValue('clouds')(data.weather[0].description)
    setImage('img')(`https://api.openweathermap.org/img/w/${data.weather[0].icon}.png`)    
}

const weatherInfo = async query => {
    const data = await getWeatherInfo(query)
    weatherReport(data)
}

const getCurrentPosWeather = ( ) => {
    if (navigator.geolocation)  {
        navigator.geolocation.getCurrentPosition(pos => {
            const query = `lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`
            weatherInfo(query)
        })
    }
}


const searchByCity = () => {
    const element  = document.getElementById('input')
    const query = `q=${element.value}`
    element.value=''
    weatherInfo(query)
}


window.addEventListener('load', () => {
    getCurrentPosWeather()
    document.getElementById('search').addEventListener('click', searchByCity)
})