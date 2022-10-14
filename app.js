const _ = (string) => document.querySelector(string); 
const __ = (string) => document.querySelectorAll(string);
const ipdetails = _('.ipdetails');
const mainMap = _('#map');
const preload = _('.preload');
let myMap;
let latitude = '';
let longitude = '';
let map =  (array) => {
    console.log(array)
    if(array){ 
        const content = `
            <div class="detailbox">
            <div>IP ADDRESS</div>
            <h2>${array.ip}</h2>
        </div>
        <div class="detailbox">
            <div>LOCATION</div>
            <h2>${array.location.country}</h2>
        </div>
        <div class="detailbox">
            <div>TIMEZONE</div>
            <h2>${array.location.timezone}</h2>
        </div>
        <div class="detailbox" style="border: none;">
            <div>ISP</div>
            <h2>${array.isp}</h2>
        </div>`
        
       
        ipdetails.innerHTML  = content
        if(myMap === undefined){
             latitude = parseFloat(`${array.location.lat}`);
            longitude = parseFloat(`${array.location.lng}`);
           myMap = L.map('mapID').setView([ latitude , longitude],5);

    L.tileLayer('https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=Fc0bDiP5JoIoZ5508OME', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
    }).addTo(myMap);
    const marker = L.marker([latitude,longitude]).addTo(myMap);
    }
    else{
         myMap.remove();
        latitude = parseFloat(`${array.location.lat}`);
        longitude = parseFloat(`${array.location.lng}`);
        myMap = L.map('mapID').setView([ latitude , longitude],5);

        L.tileLayer('https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=Fc0bDiP5JoIoZ5508OME', {
        attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        }).addTo(myMap);
        const marker = L.marker([latitude,longitude]).addTo(myMap);
    }
}
else{
    return
}
}
const fetchIP = (ip) => {
    fetch (`https://geo.ipify.org/api/v1?apiKey=at_dNhG8M1kw4pcBL1dECaTFs3Gf2rK5&ipAddress=${ip}`)
    .then(res =>{
        return res.json()
    })
    .then(data => {
        preload.classList.add('active')
        console.log(data)
        map(data)
    }).catch(error =>{
        preload.classList.remove('active')  
        myMap.remove();
    })
}


const searchipAddressInputs = _('#searchipAddressInputs');

searchipAddressInputs.addEventListener('change' , (e)=>{
    let searchIpData = e.target.value
    // preload.classList.remove('active')
    // preload.classList.add('active')
    fetchIP(searchIpData);
})
