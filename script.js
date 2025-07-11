const formEl = document.getElementById("form")
const inputEl = document.getElementById("input")
const resultsEl = document.getElementById("results")
const buttonEl = document.getElementById("click_button")
let page = 1;


formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    resultsEl.innerHTML = "";
    fetchImages();
})

buttonEl.addEventListener("click", (event) => {
    event.preventDefault();
    page++;
    fetchImages();
})

async function fetchImages() {
    const accessKey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";
    const inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    if (!inputData.trim().length) {
        alert("Please add search term");
        return;
    }
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (page == 1) {
            resultsEl.innerHTML = ""
        }

        for (let item of data.results) {
            const cardEl = document.createElement("div");
            cardEl.classList.add("card");
            const imageEl = document.createElement("img");
            imageEl.classList.add("image");
            imageEl.setAttribute("src", item.urls.regular);
            const aEl = document.createElement("a");
            aEl.classList.add("description");
            aEl.innerText = item.alt_description;
            aEl.setAttribute("href", item.links.html);
            aEl.setAttribute("target", "_blank");


            cardEl.append(imageEl);
            cardEl.append(aEl);
            resultsEl.append(cardEl);
        }
    }
    catch (error) {
        alert("Sorry something went wrong");
    }
}
