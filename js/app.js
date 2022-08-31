// Load All Search Data form API
const loadPhone = async (searchText) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhone(data.data);
};

// Display Data Index Page
const displayPhone = (phones) => {
  // display Phone
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";

  // check phone
  const noFoundMgs = document.getElementById("no-phone-found");
  if (phones.length === 0) {
    noFoundMgs.classList.remove("d-none");
  } else {
    noFoundMgs.classList.add("d-none");
  }

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
};

// Input form search field
document.getElementById("search").addEventListener("click", function () {
  const phoneSearchInput = document.getElementById("search-phone");
  const phoneSearch = phoneSearchInput.value;
  //   console.log(phoneSearch);
  loadPhone(phoneSearch);
});

loadPhone("a");
