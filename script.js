const container = document.querySelector(".container");
const container__2 = document.querySelector(".container__2");
const seats = document.querySelectorAll(".column .seat:not(.sold)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const busSelect = document.getElementById("bus");

populateUI();

let ticketPrice = +busSelect.value;

// Save selected Bus index and price
function setBusData(busIndex, busPrice) {
  localStorage.setItem("selectedBusIndex", busIndex);
  localStorage.setItem("selectedBusPrice", busPrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".column .seat.selected");

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;

  setBusData(busSelect.selectedIndex, busSelect.value);
}

// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        console.log(seat.classList.add("selected"));
      }
    });
  }

  const selectedBusIndex = localStorage.getItem("selectedBusIndex");

  if (selectedBusIndex !== null) {
    busSelect.selectedIndex = selectedBusIndex;
    console.log(selectedBusIndex)
  }
}
console.log(populateUI())
// Bus select event
busSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setBusData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("sold")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

//upper seat clicked event
container__2.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("sold")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

// Initial count and total set
updateSelectedCount();
