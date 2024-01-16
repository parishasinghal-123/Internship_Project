const API_KEY = "e1abd15b2c304e2daaaf94f33d7a76fc";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => {
    // Fetch news for India when the window loads initially
    fetchNews('India');
    // function reload(){
    //     window.location.reload();
    // }
});
 function reload(){
       window.location.reload();
    }


async function fetchNews(country) {
    try {
        const res = await fetch(`${url}${country}&apiKey=${API_KEY}`);
        const data = await res.json();
        bindData(data.articles);
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    if (article.urlToImage) {
        newsImg.src = article.urlToImage;
        newsImg.alt = article.title; // Set alt attribute for accessibility
    } else {
        // If image URL is not available, provide a placeholder image
        newsImg.src = 'placeholder-image.jpg'; // Replace with your placeholder image path
        newsImg.alt = 'Image not available';
    }

//  newsImg.scr = article.urlToImage;
 newsTitle.innerHTML = article.title;
 newsDesc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-us", {timeZone: "Asia/Jakarta"});

  newsSource.innerHTML=`${article.source.name} . ${date}`;
     // Check if the article has a URL before attempting to open it
     if (article.url) {
        cardClone.firstElementChild.addEventListener("click", () => { 
            window.open(article.url, "_blank");
        });
    } else {
        // If URL is not available, disable the click event or provide alternative action
        cardClone.firstElementChild.style.cursor = "not-allowed";
        cardClone.firstElementChild.addEventListener("click", (event) => { 
            event.preventDefault(); // Prevent the default behavior
            console.log("URL not available");
        });
    }
}
// let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
}
 const searchButton = document.getElementById("search-button");
 const searchText = document.getElementById("search-text");

 searchButton.addEventListener("click", () =>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
 });
