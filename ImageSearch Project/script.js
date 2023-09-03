const acceskey = "CI1bqR_mKQEtDrbTjuwH2uKx89znjnFWT3O1SvF2d8Q";

const formel = document.querySelector("form"); 
const inputel = document.getElementById("search-input");
const searchresults = document.querySelector(".search-results");
const showmore = document.getElementById("show-more-button");

let inputdata = "";
let page = 1;

async function serchImages() {
  inputdata = inputel.value;
  const url =`https://api.unsplash.com/search/photos?page=${page}&query=${inputdata}&client_id=${acceskey}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  if (page === 1) {
    searchresults.innerHTML = "";
  }
  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchresults.appendChild(imageWrapper);
  });
  page++;
  if (page > 1) {
    showmore.style.display = "block";
  }
}

formel.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  serchImages();
});
showmore.addEventListener("click", () => {
  serchImages();
});
