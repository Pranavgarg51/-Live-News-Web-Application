const API_KEY = "4649988481424a5e819446f020aaf0b6";
const url = "https://newsapi.org/v2/everything?q="


async function fetchData(query) {
   const res = await fetch(`${url}${query}&apiKey=${API_KEY}`)
   const data = await res.json()
   return data
}
fetchData("all").then(data => renderMain(data.articles))

//menubtn
let mobilemenu = document.querySelector(".mobile");
let menuBtn = document.querySelector(".menuBtn");
let menuBtnDisplay = true;
menuBtn.addEventListener("click", () => {
   mobilemenu.classList.toggle("hidden")
}
)
//render news
function renderMain(arr) {

   let mainHTML = ''
   for (let i = 0; i < arr.length; i++) {
      if (arr[i].urlToImage) {
         mainHTML += ` <div class="card">
         <a href=${arr[i].url}>
         <img src=${arr[i].urlToImage} lazy="loading" />
         <h4>${arr[i].title}</h4>
         <div class="publishByDate">
             <p>${arr[i].source.name}</p>
             <span>•</span>
             <p>${new Date(arr[i].publishedAt).toLocaleDateString()}</p>
         </div>
         <div class="desc">
            ${arr[i].description}
         </div>
         </a>
     </div>`
      }
      document.querySelector("main").innerHTML = mainHTML
   }
}
const searchBtn = document.getElementById("SearchForm")
const searchBtnMobile = document.getElementById("SearchFormMobile")
const searchInputMobile = document.getElementById("SearchInputMobile")
const searchInput = document.getElementById("SearchInput")

searchBtn.addEventListener("submit", async (e) => {
   e.preventDefault()
   console.log(SearchInput.value)
   const data = await fetchData(SearchInput.value)
   renderMain(data.articles)
})
searchBtnMobile.addEventListener("submit", async (e) => {
   e.preventDefault()
   const data = await fetchData(SearchInputMobile.value)
   renderMain(data.articles)

})
async function Search(query) {
   const data = await fetchData(query)
   renderMain(data.articles)
}