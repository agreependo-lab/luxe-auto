/* ==================== GET CARS FROM STORAGE ==================== */
/* This gets all the cars that sellers listed */
function getCarsFromStorage() {
  let cars = localStorage.getItem("cars");
  if (cars) {
    return JSON.parse(cars);
  }
  return [];
}

/* ==================== SAVE CAR TO STORAGE ==================== */
/* This saves a car when seller lists it */
function saveCar(car) {
  let cars = getCarsFromStorage();
  cars.push(car);
  localStorage.setItem("cars", JSON.stringify(cars));
}

/* ==================== INITIALIZE SAMPLE CARS ==================== */
/* Add sample cars on first visit */
function initializeSampleCars() {
  let cars = getCarsFromStorage();

  if (cars.length === 0) {
    let sampleCars = [
      {
        id: "1",
        brand: "Honda",
        model: "Civic",
        year: "2019",
        price: "850000",
        mileage: "45000",
        transmission: "Automatic",
        fuelType: "Gasoline",
        description:
          "Well-maintained Honda Civic with excellent fuel efficiency. Low mileage, clean title.",
        sellerName: "John Smith",
        sellerEmail: "john.smith@email.com",
        sellerPhone: "+254 700 123456",
        datePosted: new Date().toLocaleDateString(),
        image: null,
      },
      {
        id: "2",
        brand: "Toyota",
        model: "Corolla",
        year: "2018",
        price: "720000",
        mileage: "52000",
        transmission: "Automatic",
        fuelType: "Gasoline",
        description:
          "Reliable Toyota Corolla. One owner, no accidents, full service records.",
        sellerName: "Maria Garcia",
        sellerEmail: "maria.garcia@email.com",
        sellerPhone: "+254 701 234567",
        datePosted: new Date().toLocaleDateString(),
        image: null,
      },
    ];

    sampleCars.forEach((car) => saveCar(car));
  }
}

/* ==================== WHEN PAGE LOADS ==================== */
document.addEventListener("DOMContentLoaded", function () {
  initializeSampleCars();

  let contactForm = document.getElementById("contactform");
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactForm);
  }

  let sellerForm = document.getElementById("sellerForm");
  if (sellerForm) {
    sellerForm.addEventListener("submit", handleSellerSubmit);
  }

  let buyerForm = document.getElementById("buyerContactForm");
  if (buyerForm) {
    buyerForm.addEventListener("submit", handleBuyerSubmit);
  }

  populateCarDropdown();

  if (document.getElementById("carListings")) {
    loadCars();
    displayFavorites();
  }

  if (document.getElementById("myListings")) {
    displaySellerListings();
  }
});

/* ==================== CONTACT FORM ==================== */
function handleContactForm(e) {
  e.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let message = document.getElementById("message").value;

  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  contacts.push({
    name: name,
    email: email,
    message: message,
    date: new Date().toLocaleString(),
  });
  localStorage.setItem("contacts", JSON.stringify(contacts));

  let messageDiv = document.getElementById("FormMessage");
  messageDiv.textContent = "✓ Thank you! Your message has been received.";
  messageDiv.className = "form-message success";

  document.getElementById("contactform").reset();

  setTimeout(() => {
    messageDiv.textContent = "";
    messageDiv.className = "";
  }, 5000);
}

/* ==================== LOAD CARS (BUYER PAGE) ==================== */
function loadCars() {
  let cars = getCarsFromStorage();
  displayCars(cars);
}

function displayCars(cars) {
  let listing = document.getElementById("carListings");
  if (!listing) return;

  listing.innerHTML = "";

  if (cars.length === 0) {
    listing.innerHTML = '<p class="no-cars">No cars available yet.</p>';
    return;
  }

  cars.forEach((car) => {
    let card = createCarCard(car);
    listing.appendChild(card);
  });
}

/* ==================== CREATE CAR CARD ==================== */
function createCarCard(car) {
  let card = document.createElement("div");
  card.className = "car-card";

  let carImage = car.image
    ? `<img src="${car.image}" alt="${car.brand}" style="width: 100%; height: 100%; object-fit: cover;">`
    : "🚗";

  card.innerHTML = `
        <div class="car-image">${carImage}</div>
        <div class="car-info">
            <h3>${car.brand} ${car.model}</h3>
            <p class="year">${car.year}</p>
            <p class="price">KES ${car.price}</p>
            <p class="description">${car.description ? car.description.substring(0, 50) + "..." : "No description"}</p>
            
            <p style="font-size: 12px; color: #d4af37; margin-top: 8px;">
                <strong>Seller:</strong> ${car.sellerName}<br>
                <strong>Email:</strong> ${car.sellerEmail}
            </p>
            
            <div class="card-actions">
                <button class="details-btn" onclick="viewCarDetails('${car.id}')">View Details</button>
                <button class="favorite-btn" onclick="toggleFavorite('${car.id}')">❤️ Save</button>
            </div>
        </div>
    `;

  return card;
}

/* ==================== VIEW CAR DETAILS ==================== */
function viewCarDetails(carId) {
  let cars = getCarsFromStorage();
  let car = cars.find((c) => c.id === carId);

  if (car) {
    let modal = document.getElementById("carModal");
    let modalBody = document.getElementById("modalBody");

    if (!modal || !modalBody) return;

    let imageHtml = car.image
      ? `<img src="${car.image}" alt="${car.brand}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 4px; margin-bottom: 20px;">`
      : "";

    modalBody.innerHTML = `
            ${imageHtml}
            <h2>${car.brand} ${car.model}</h2>
            <p><strong>Year:</strong> ${car.year}</p>
            <p><strong>Price:</strong> KES ${car.price}</p>
            <p><strong>Mileage:</strong> ${car.mileage} km</p>
            <p><strong>Transmission:</strong> ${car.transmission}</p>
            <p><strong>Fuel:</strong> ${car.fuelType}</p>
            <p><strong>Description:</strong> ${car.description}</p>
            
            <h3 style="margin-top: 20px; color: #d4af37;">Seller Information</h3>
            <p><strong>Name:</strong> ${car.sellerName}</p>
            <p><strong>Email:</strong> ${car.sellerEmail}</p>
            <p><strong>Phone:</strong> ${car.sellerPhone}</p>
        `;

    modal.style.display = "block";
  }
}

/* ==================== FILTER CARS ==================== */
function filterCars() {
  let priceFilter =
    parseFloat(document.getElementById("priceFilter").value) || Infinity;
  let brandFilter = document.getElementById("brandFilter").value.toLowerCase();

  let cars = getCarsFromStorage();

  let filtered = cars.filter((car) => {
    let price = parseFloat(car.price);
    let brand = car.brand.toLowerCase();
    return (
      price <= priceFilter &&
      (brand.includes(brandFilter) || brandFilter === "")
    );
  });

  displayCars(filtered);
}

/* ==================== SEARCH CARS ==================== */
function searchCars() {
  let query = document.getElementById("searchInput").value.toLowerCase();
  let cars = getCarsFromStorage();

  let results = cars.filter(
    (car) =>
      car.brand.toLowerCase().includes(query) ||
      car.model.toLowerCase().includes(query) ||
      car.price.includes(query),
  );

  displayCars(results);
}

/* ==================== CLEAR FILTERS ==================== */
function clearFilters() {
  document.getElementById("priceFilter").value = "";
  document.getElementById("brandFilter").value = "";
  document.getElementById("searchInput").value = "";
  loadCars();
}

/* ==================== FAVORITES ==================== */
function toggleFavorite(carId) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.includes(carId)) {
    favorites = favorites.filter((id) => id !== carId);
  } else {
    favorites.push(carId);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  displayFavorites();
}

function displayFavorites() {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  let cars = getCarsFromStorage();
  let favoriteCars = cars.filter((car) => favorites.includes(car.id));

  let favoritesList = document.getElementById("favoritesList");
  if (!favoritesList) return;

  favoritesList.innerHTML = "";

  if (favoriteCars.length === 0) {
    favoritesList.innerHTML = '<p class="no-cars">No saved cars yet!</p>';
    return;
  }

  favoriteCars.forEach((car) => {
    let card = createCarCard(car);
    favoritesList.appendChild(card);
  });
}

/* ==================== CLOSE MODAL ==================== */
let closeBtn = document.querySelector(".close");
if (closeBtn) {
  closeBtn.addEventListener("click", function () {
    let modal = document.getElementById("carModal");
    if (modal) modal.style.display = "none";
  });
}

window.addEventListener("click", function (event) {
  let modal = document.getElementById("carModal");
  if (modal && event.target === modal) {
    modal.style.display = "none";
  }
});

/* ==================== SELLER FORM ==================== */
function handleSellerSubmit(e) {
  e.preventDefault();

  let formData = new FormData(document.getElementById("sellerForm"));
  let imageFile = document.getElementById("carImage").files[0];

  let car = {
    id: Date.now().toString(),
    brand: formData.get("brand"),
    model: formData.get("model"),
    year: formData.get("year"),
    price: formData.get("price"),
    mileage: formData.get("mileage") || "Not specified",
    transmission: formData.get("transmission") || "Not specified",
    fuelType: formData.get("fuelType") || "Not specified",
    description: formData.get("description"),
    sellerName: formData.get("sellerName"),
    sellerEmail: formData.get("sellerEmail"),
    sellerPhone: formData.get("sellerPhone"),
    datePosted: new Date().toLocaleDateString(),
    image: null,
  };

  if (imageFile) {
    let reader = new FileReader();
    reader.onload = function (event) {
      car.image = event.target.result;
      saveCar(car);
      showSellerSuccess();
      displaySellerListings();
    };
    reader.readAsDataURL(imageFile);
  } else {
    saveCar(car);
    showSellerSuccess();
    displaySellerListings();
  }
}

function showSellerSuccess() {
  let form = document.getElementById("sellerForm");
  let success = document.getElementById("successMessage");

  if (form && success) {
    form.style.display = "none";
    success.style.display = "block";
  }
}

function displaySellerListings() {
  let cars = getCarsFromStorage();
  let myListings = document.getElementById("myListings");

  if (!myListings) return;

  myListings.innerHTML = "";

  if (cars.length === 0) {
    myListings.innerHTML = '<p class="no-cars">No listings yet!</p>';
    return;
  }

  cars.forEach((car) => {
    let card = document.createElement("div");
    card.className = "car-card";

    let carImage = car.image
      ? `<img src="${car.image}" alt="${car.brand}" style="width: 100%; height: 100%; object-fit: cover;">`
      : "🚗";

    card.innerHTML = `
            <div class="car-image">${carImage}</div>
            <div class="car-info">
                <h3>${car.brand} ${car.model}</h3>
                <p class="year">${car.year}</p>
                <p class="price">KES ${car.price}</p>
                
                <p style="font-size: 12px; color: #d4af37; margin-top: 8px;">
                    <strong>Your Email:</strong> ${car.sellerEmail}<br>
                    <strong>Your Phone:</strong> ${car.sellerPhone}
                </p>
                
                <p class="date">Posted: ${car.datePosted}</p>
                <div class="card-actions">
                    <button class="edit-btn" onclick="editCar('${car.id}')">Edit</button>
                    <button class="delete-btn" onclick="deleteCar('${car.id}')">Delete</button>
                </div>
            </div>
        `;
    myListings.appendChild(card);
  });
}

function deleteCar(carId) {
  if (confirm("Delete this listing?")) {
    let cars = getCarsFromStorage();
    cars = cars.filter((car) => car.id !== carId);
    localStorage.setItem("cars", JSON.stringify(cars));
    displaySellerListings();
  }
}

function editCar(carId) {
  let cars = getCarsFromStorage();
  let car = cars.find((c) => c.id === carId);

  if (car) {
    document.getElementById("brand").value = car.brand;
    document.getElementById("model").value = car.model;
    document.getElementById("year").value = car.year;
    document.getElementById("price").value = car.price;
    document.getElementById("mileage").value = car.mileage;
    document.getElementById("transmission").value = car.transmission;
    document.getElementById("fuelType").value = car.fuelType;
    document.getElementById("description").value = car.description;
    document.getElementById("sellerName").value = car.sellerName;
    document.getElementById("sellerEmail").value = car.sellerEmail;
    document.getElementById("sellerPhone").value = car.sellerPhone;

    window.scrollTo(0, 0);
  }
}

/* ==================== BUYER FORM ==================== */
function populateCarDropdown() {
  let cars = getCarsFromStorage();
  let dropdown = document.getElementById("selectedCar");

  if (!dropdown) return;

  dropdown.innerHTML = '<option value="">-- Select a car --</option>';

  cars.forEach((car) => {
    let option = document.createElement("option");
    option.value = car.id;
    option.textContent = `${car.brand} ${car.model} (${car.year}) - KES ${car.price}`;
    dropdown.appendChild(option);
  });
}

function handleBuyerSubmit(e) {
  e.preventDefault();

  let buyerName = document.getElementById("buyerName").value;
  let buyerEmail = document.getElementById("buyerEmail").value;
  let buyerPhone = document.getElementById("buyerPhone").value;
  let selectedCarId = document.getElementById("selectedCar").value;
  let buyerMessage = document.getElementById("buyerMessage").value;

  let cars = getCarsFromStorage();
  let selectedCar = cars.find((c) => c.id === selectedCarId);

  if (!selectedCar) {
    alert("Please select a car");
    return;
  }

  let inquiries = JSON.parse(localStorage.getItem("buyerInquiries")) || [];
  inquiries.push({
    buyerName: buyerName,
    buyerEmail: buyerEmail,
    buyerPhone: buyerPhone,
    carBrand: selectedCar.brand,
    carModel: selectedCar.model,
    carPrice: selectedCar.price,
    sellerName: selectedCar.sellerName,
    sellerEmail: selectedCar.sellerEmail,
    message: buyerMessage,
    date: new Date().toLocaleString(),
  });
  localStorage.setItem("buyerInquiries", JSON.stringify(inquiries));

  let messageDiv = document.getElementById("buyerFormMessage");
  messageDiv.textContent = "✓ Success! Your details have been sent!";
  messageDiv.className = "form-message success";

  document.getElementById("buyerContactForm").reset();

  setTimeout(() => {
    messageDiv.textContent = "";
    messageDiv.className = "";
  }, 5000);
}
