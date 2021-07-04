const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value; // + will convert string to integer

populateUI();

// Save selected movie index and price

function setMovieData(movieIndex, moviePrice) {
	localStorage.setItem('selectedMovieIndex', movieIndex);
	localStorage.setItem('selectedMoviePrice', moviePrice);
}

// update total and count
function updateSelectedCount() {
	
	const selectedSeats = document.querySelectorAll('.row .seat.selected');

	//Copy selected seats into arr
	//Map through array 
	//return a new array indexes
	// For above we are using spread operator to exceute

	const seatsIndex = [...selectedSeats].map(seat => { // get the seat index using array and map to iterate and finally it give array of index
		return [...seats].indexOf(seat); 
	});

	localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex)); // Bz seatIndex is array and it accept key value pair

	const selectedSeatsCount = selectedSeats.length;

	count.innerText = selectedSeatsCount;
	total.innerText = selectedSeatsCount * ticketPrice; // ticket price
}

// Get data from localStorage and populate UI
function populateUI() {

	const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

	if(selectedSeats != null && selectedSeats.length > 0) { // second condition check wether the data is in the array or not.

		seats.forEach((seat, index) => {
			if(selectedSeats.indexOf(index) > -1) {
				seat.classList.add('selected');
			}	
		})	
	}

	//selectedmovie index
	 
	const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

	if(selectedMovieIndex != null) {
		movieSelect.selectedIndex = selectedMovieIndex;
	}
}

//Movie Select event
movieSelect.addEventListener('change', e => {
	ticketPrice = +e.target.value;
	setMovieData(e.target.selectedIndex, e.target.value);
	updateSelectedCount();
});

container.addEventListener('click', (e) => {
	if(e.target.classList.contains('seat') && 
		!e.target.classList.contains('occupied')
	) {
		e.target.classList.toggle('selected');       
	}
	updateSelectedCount();
})

// Initial Count and total set

updateSelectedCount();