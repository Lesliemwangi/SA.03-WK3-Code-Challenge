// Your code here
// Declare a function cinema with a variable which presumably points to an API endpoint for movies.
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
  li.classList.add("film", "item");

  // Add a delete button to each film
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-button");
  // Set film ID as a data attribute
  deleteButton.setAttribute("data-id", cinema.id);
  li.appendChild(deleteButton);
  // Add an event listener to delete button to remove the film when clicked
  deleteButton.addEventListener("click", (event) => {
    // Get the film ID from the data attribute
    const filmId = event.target.getAttribute("data-id");
    deleteFilm(filmId);
    // Remove the film from DOM
    ul.removeChild(li);
  });
  // Add a click event listener to the list item that invokes the cinemaClick() function with the cinema item as an argument.
  li.addEventListener("click", () => {
    cinemaClick(cinema);
  });
}
console.log(cinemaList);

// Declare the function deleteFilm
function deleteFilm(id) {
  // Make a DELETE request to the server to delete the film with the given ID.
  fetch(`${cinema}/${id}`, {
    // Set the method to DELETE
    method: "DELETE",
  })
    // Convert the response to JSON
    .then((response) => response.json())
    // Handle the response from the server
    .then((data) => {
      // Handle success response if needed
      console.log("Film deleted from server:", data);
    })
    .catch((error) => {
      // Handle error
      console.error("Error deleting film:", error);
    });
}

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
    cinema.capacity - cinema.tickets_sold + "";
}
console.log(cinemaClick);

// Declare the function handleBuyTicket
function handleBuyTicket() {
  // Retrieve the ticket number element and checks if there are tickets available.
  const buyButton = document.querySelector("#ticket-num");
  const tickets = parseInt(buyButton.textContent.split(" ")[0]);
  // Extract the number of remaining tickets from the text content.
  // Check if there are tickets available: If yes, decrements the ticket count and updates the text content.
  // If no tickets are available, it displays an alert and modifies the CSS classes of the target element.
  if (tickets > 0) {
    // If tickets are available, decrement the ticket count and update the text content.
    buyButton.textContent = tickets - 1;
  } else {
    // If no tickets are available, display the movie poster and update the button to "Sold Out".
    const poster = document.querySelector("img#poster");
    const info = document.querySelector("#showing");
    const movie = getCurrentMovie(); // Get the current movie details

    poster.src = movie.poster;
    poster.alt = movie.title;

    info.querySelector("#title").textContent = movie.title;
    info.querySelector("#runtime").textContent = movie.runtime + " minutes";
    info.querySelector("#film-info").textContent = movie.description;
    info.querySelector("#showtime").textContent = movie.showtime;

    buyButton.textContent = "Sold Out";
    buyButton.classList.add("disabled");

    // Show an alert to inform the user that tickets are sold out.
    alert("Sorry, tickets are sold out!");
  }
}
console.log(handleBuyTicket);

function getCurrentMovie() {
  // Retrieve the current movie details from the displayed information
  // It extracts the title, poster image source, runtime, description, showtime, etc., and returns them as an object.
  const info = document.querySelector("#showing");
  return {
    title: info.querySelector("#title").textContent,
    poster: document.querySelector("img#poster").src,
    runtime: parseInt(info.querySelector("#runtime").textContent),
    description: info.querySelector("#film-info").textContent,
    showtime: info.querySelector("#showtime").textContent,
  };
}

console.log(getCurrentMovie);
