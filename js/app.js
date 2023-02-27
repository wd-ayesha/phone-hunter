const loadPhones = async(searchText, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) =>{    
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    // display 10 phones only
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }
    
    // display no phones found
    const noPhone = document.getElementById('no-found-message');
    if(phones.length === 0){
        noPhone.classList.remove('d-none');
    }
    else{
        noPhone.classList.add('d-none');
    }
  
    // display all phones
    phones.forEach(phone => {
        // console.log(phone)
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    });
    // stop loader/spinner
    toggleSpinner(false);
}

const processSearch = (dataLimit) =>{
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
    // searchField.value = ''; //note: if I remove input value by this then show all btn will not work.
}

// handle search button click
document.getElementById('btn-search').addEventListener('click', function(){
    // start loader/spinner
    processSearch(10);
})

// search input field enter key handler
document.getElementById('search-field').addEventListener('keypress', function (e) {
    // console.log(e.key);
    if (e.key === 'Enter') {
        processSearch(10);
    }
});

const toggleSpinner = isLoading =>{
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}

// not the best way to load show all
document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch();
});

const loadPhoneDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone =>{
console.log(phone);
const modalTitle = document.getElementById('phoneDetailModalLabel');
modalTitle.innerText = phone.name;
const phoneDetails = document.getElementById('phone-details');
console.log(phone.mainFeatures.sensors[0]);
phoneDetails.innerHTML = `
    <img src="${phone.image}">
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'
    }</p>
    <h2>MainFeatures</h2>
    <p>Sensor: ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0] : 'No Sensor'}</p>
    <p>ChipSet: ${phone.mainFeatures ? phone.mainFeatures.chipSet : 'No ChipSet Information Found'}</p>
    <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage Information Found'}</p>
    <p>Memory: ${phone.mainFeatures ? phone.mainFeatures.memory : 'No Memory Information Found'}</p> 
    <p>Display Size: ${phone.mainFeatures ? phone.mainFeatures.displaySize : 'Display Size Information not Found'}</p>
    <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Blutooth Information Found'}</p>
`;
}

loadPhones('apple');