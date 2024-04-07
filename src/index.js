// Your code here
// Declare a function with the variable film, which presumably points to an API endpoint for movies.
let cinema = "http://localhost:3000/films";

// Add an event listener to the DOMContentLoaded event, which will execute the getCinema() function once the DOM is fully loaded
// Ths feature listens for the DOMContentLoaded event, which occurs when the initial HTML document has been completely loaded and parsed. Then, it executes a callback function.
document.addEventListener("DOMContentLoaded", () => {
  // The getCinema() function is called to fetch cinema data.
  getCinema();
  // Click event listener is added to the 'Buy Ticket' button,  which will execute the handleBuyTicket() function when clicked
  document
    .querySelector("#buy-ticket")
    .addEventListener("click", handleBuyTicket);
});

// Fetch the list of movies from the specified API endpoint and render them as a list
function getCinema() {
  // Use the fetch API to retrieve the list of movies as a JSON object
  fetch(cinema)
    // Process the response data in JSON format.
    .then((res) => res.json())
    .then((cinema) => {
      // For each cinema item received, it calls the cinemaList() function and 
     // triggers a click event on the first movie element with the ID id1.
      cinema.forEach((movie) => {
        cinemaList(movie);
      });
      // Simulate a click event on the first movie in the list
      const movie1 = document.querySelector("#id1");
      movie1.dispatchEvent(new Event("click"));
    });
}

console.log(getCinema);

// Declare the function cinemaList
function cinemaList(cinema) {
  // Create a new list item for each movie and add it to the films list
  const li = document.createElement("li");
  // Set the text content of the list item to the title of the cinema item.
  li.textContent = `${cinema.title}`;
  // Assign an ID to the list item based on the cinema item's ID.
  li.id = "id" + cinema.id;
  const ul = document.querySelector("#films");
  // Append the list item to the element with the ID films.
  ul.appendChild(li);
  // Add classes 'film' and 'item' to the list item.
  li.classList.add("film");
  li.classList.add("item");
  // Add a click event listener to the list item that invokes the cinemaClick() function with the cinema item as an argument.
  li.addEventListener("click", () => {
    cinemaClick(cinema);
  });
}
console.log(cinemaList);

// Declare the function cinemaClick
function cinemaClick(cinema) {
  const poster = document.querySelector("img#poster");
  // Update the image source and alternate text based on the cinema poster and title.
  poster.src = cinema.poster;
  poster.alt = cinema.title;
  const info = document.querySelector("#showing");
  // Modify the text content of various elements in the HTML to display cinema information such as title, runtime, description, showtime, and remaining tickets.
  // Clear any existing child elements from the showing
  info.querySelector("#title").textContent = cinema.title;
  info.querySelector("#runtime").textContent = cinema.runtime + " minutes";
  info.querySelector("#film-info").textContent = cinema.description;
  info.querySelector("#showtime").textContent = cinema.showtime;
  info.querySelector("#ticket-num").textContent =
    cinema.capacity - cinema.tickets_sold + " remaining tickets";
}
console.log(cinemaClick);

// Declare the function handleBuyTicket
function handleBuyTicket(Tickets) {
  // Retrieve the ticket number element
  const ticketDiv = document.querySelector("#ticket-num");
  const tickets = ticketDiv.textContent.split(" ")[0];
   // Extract the number of remaining tickets from the text content.
  // Check if there are tickets available: If yes, decrements the ticket count and updates the text content. 
 // If no tickets are available, it displays an alert and modifies the CSS classes of the target element.
  if (tickets > 0) {
    ticketDiv.textContent = tickets - 1 + " remaining tickets";
  } else if (tickets == 0) {
    alert("No more tickets!");
    e.target.classList.add("sold-out");
    e.target.classList.remove("orange");
  }
}
console.log(handleBuyTicket);
