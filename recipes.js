// Worked on by : Lenny
let ingredientArray = [];
const apiKey = "d3220f21676e47b58957278f8aed01e1";

// 1. Function to add ingredient to the array and update the <p> tag
function addIngredient() {
    const input = document.getElementById("ingredientInput");
    const display = document.getElementById("ingredientDisplay");

    if (input.value != "") {
        ingredientArray.push(input.value);
        display.innerText = ingredientArray.join(", ");
        input.value = "";
    }
}

// 2. Function to start over
function newSearch() {
    ingredientArray = [];
    document.getElementById("ingredientDisplay").innerText = "None added yet";
    document.getElementById("recipe-results").innerHTML = ""; // Clear the cards
}

function recipeSearch() {
    if (ingredientArray.length == 0) {
        alert("Please add ingredients");
        return;
    }

    const searchTerm = ingredientArray.join(",");
    //  fetch 20 results so we have a good variety to pick randomly from
    const url = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + searchTerm + "&number=20&apiKey=" + apiKey;

    let request = new XMLHttpRequest();
    request.open("GET", url);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            let data = JSON.parse(this.response);

            if (data.length > 0) {
                // Clear the results area before showing new ones
                document.getElementById("recipe-results").innerHTML = "";
                
                // This loop picks 3 random recipes to show in the grid
                // It makes the page look full and aesthetic
                for (let i = 0; i < 3; i++) {
                    const randomIndex = Math.floor(Math.random() * data.length);
                    const randomRecipe = data[randomIndex];
                    displayRecipe(randomRecipe);
                }
            } else {
                alert("No recipes found!");
            }
        } else {
            alert("API Error: Check if your API key is correct or expired.");
        }
    };

    request.send();
}

// 4. Function to build the  cards
function displayRecipe(recipe) {
    const resultsDiv = document.getElementById("recipe-results");

    // Create the list items for missing ingredients
    let missingListHTML = "";
    for (let i = 0; i < recipe.missedIngredients.length; i++) {
        missingListHTML += `<li class="list-group-item bg-transparent p-1">• ${recipe.missedIngredients[i].original}</li>`;
    }

    // Create the Bootstrap Card HTML
    const cardHTML = `
        <div class="col-md-4 mb-4 animate__animated animate__fadeInUp">
            <div class="card recipe-card h-100 shadow-sm">
                <img src="${recipe.image}" class="card-img-top" alt="Recipe Image">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${recipe.title}</h5>
                    <hr>
                    <p class="missing-label mb-1" style="color: #d97a5c; font-size: 0.8rem; font-weight: bold;">MISSING INGREDIENTS:</p>
                    <ul class="list-group list-group-flush small">
                        ${missingListHTML}
                    </ul>
                </div>
            </div>
        </div>
    `;

    // Append the card to the results div
    resultsDiv.innerHTML += cardHTML;
}