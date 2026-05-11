const apiRecipe = "d3220f21676e47b58957278f8aed01e1";

function favRecipe() {
    const resultsDiv = document.getElementById("favorite-recipes");
    let url = `https://api.spoonacular.com/recipes/complexSearch?number=3&addRecipeInformation=true&apiKey=${apiRecipe}`;

    let request = new XMLHttpRequest();
    request.open("GET", url);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            let data = JSON.parse(request.responseText);
            
            // Clear current content
            resultsDiv.innerHTML = "";

            data.results.forEach(recipe => {
                // Strip HTML tags from summary for a clean look
                const cleanSummary = recipe.summary.split('.')[0] + "."; 

                const cardHTML = `
                    <div class="col-md-4 mb-4 animate__animated animate__fadeInUp">
                        <div class="card recipe-card h-100">
                            <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}" style="height: 200px; object-fit: cover;">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title fw-bold">${recipe.title}</h5>
                                <p class="card-text small text-muted">${cleanSummary}</p>
                                <a href="${recipe.sourceUrl}" target="_blank" class="btn btn-primary mt-auto">View Full Recipe</a>
                            </div>
                        </div>
                    </div>
                `;
                resultsDiv.innerHTML += cardHTML;
            });
        } else {
            resultsDiv.innerHTML = "<p class='text-center'>Unable to load recipes at this time.</p>";
        }
    };

    request.send();
}

window.onload = favRecipe;