

// Function to toggle the Trending Topic dropdowns 
function toggleTrend(id) {
    const trendElement = document.getElementById(id);
    
    if (trendElement.style.display === "none" || trendElement.style.display === "") {
        trendElement.style.display = "block";
    } else {
        trendElement.style.display = "none";
    }
}