const loadPhone = async (searchText, limit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data, limit);
}

//Display data
function displayData(phone, limit) {
    // console.log(phone);

    if (phone.length > 10 && limit) {
        phone = phone.slice(0, limit);
        showViewAll(true);
    } else {
        showViewAll(false);
    }
    const displayPhone = document.getElementById('displayPhone');
    displayPhone.textContent = "";
    phone.forEach(element => {
        const colDiv = document.createElement('div');
        colDiv.classList.add("col");

        colDiv.innerHTML = `
            <div class="card h-100">
                <img src="${element.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${element.phone_name}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                        to additional content. This content is a little bit longer.</p>

                        <button onclick="phoneDetails('${element.slug}')" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#phoneModal">Details</button>
                </div>
            </div>
            `
        displayPhone.appendChild(colDiv);
        showSpiner(false);

    });

}

//Search your data
const searchPhoneName = document.getElementById('searchPhoneName');
document.getElementById('searchBtn').addEventListener('click', function () {
    showSpiner(true);
    loadPhone(searchPhoneName.value, 6);
});

searchPhoneName.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        showSpiner(true);
        loadPhone(searchPhoneName.value, 6);
    }
});

function showSpiner(isLoaded) {
    const showSpiner = document.getElementById('showSpiner');
    if (isLoaded) {
        showSpiner.classList.remove('d-none')

    } else {
        showSpiner.classList.add('d-none')
    }
}

function viewAll() {
    showSpiner(true);
    loadPhone(searchPhoneName.value);
}

function showViewAll(clicked) {
    const viewAllSection = document.getElementById('viewAllSection');
    if (clicked) {
        viewAllSection.classList.remove('d-none')
    } else {
        viewAllSection.classList.add('d-none')
    }
}

const detailsPhone = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    displayModal(data.data);
}

function displayModal(data) {
    console.log(data);
    document.getElementById('phoneTitleModal').innerText = data.name;
    document.getElementById('modalBoday').innerText = "Memory Details: " + data.mainFeatures.memory;
}

function phoneDetails(detailsInfo) {
    detailsPhone(detailsInfo)
}

loadPhone('iphone');