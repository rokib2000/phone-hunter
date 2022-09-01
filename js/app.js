// Load All Search Data form API
const loadPhone = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhone(data.data, dataLimit);
};

// Display Data Index Page
const displayPhone = (phones, dataLimit) => {
  // display Phone
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";

  // display 10 phone only
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 9) {
    showAll.classList.remove("d-none");
    phones = phones.slice(0, 9);
  } else {
    showAll.classList.add("d-none");
  }

  // check phone
  const noFoundMgs = document.getElementById("no-phone-found");
  if (phones.length === 0) {
    noFoundMgs.classList.remove("d-none");
  } else {
    noFoundMgs.classList.add("d-none");
  }

  // display All Phone
  phones.forEach((phone) => {
    // console.log(phone);
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
    <div class="card h-100">
    <img src="${phone.image}" class="img-thumbnail p-4"  alt="..." />
    <div class="card-body">
      <h5 class="card-title text-center">${phone.phone_name}</h5>
      <p class="card-text text-center"><span class="fw-semibold">Brand: </span>${phone.brand}</p>
      <div class="d-grid gap-2 col-6 mx-auto">
        <button
        onclick = "phoneDetails('${phone.slug}')"
          class="btn btn-primary"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#phonedetailsModal"
        >
          Show details
        </button>
      </div>
    </div>
  </div>
      `;
    phoneContainer.appendChild(phoneDiv);
  });

  // loading
  toggleSpinner(false);
};

// Search Process

const processSearch = (dataLimit) => {
  // loading
  toggleSpinner(true);

  const phoneSearchInput = document.getElementById("search-phone");
  const phoneSearch = phoneSearchInput.value;
  loadPhone(phoneSearch, dataLimit);
};

// Input form search field
document.getElementById("search").addEventListener("click", function () {
  processSearch(9);
});

// Show All Button
document.getElementById("show-all").addEventListener("click", function () {
  processSearch();
});

// Loading data
const toggleSpinner = (isLoading) => {
  const spinner = document.getElementById("taggle-spinner");
  if (isLoading) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};

// loadPhone("oppo");
