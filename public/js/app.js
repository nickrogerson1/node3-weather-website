console.log('Client side JS file is loaded')


const weatherForm = document.querySelector('form');
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")



weatherForm.addEventListener('submit', e => {
    e.preventDefault()
    const location = search.value;
    messageOne.textContent = "Loading...."
    
fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=7aba03ff03d08be1f7b18c5b731f148b`)
    .then(res => {
        res.json()
    .then(data => {
        const desc = data.weather[0].description
        messageOne.textContent = location
        messageTwo.textContent = desc

     })
    .catch(err => 
        messageOne.textContent = "Enter an actual location",
        messageTwo.textContent = ""
    )
})

})