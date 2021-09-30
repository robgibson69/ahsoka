const searchByIngredient = (searchString) => {

    if (!searchString) {
        searchString = $('#ingredientSearch').val().trim();
    }

    fetch("https://themealdb.p.rapidapi.com/filter.php?i=" + searchString, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "themealdb.p.rapidapi.com",
                "x-rapidapi-key": "c5d39432acmsh9d55200b1fddc5ap16e8f6jsn9b22759a0fe2"
            }
        })
        .then(response => {
            if (response.ok) {
                response.json()
                    .then((data) => {
                        console.log(data);
                        displayMeals(data.meals);
                    })
            } else {
                console.error(err);
            }
        })
        .catch(err => {
            console.error(err);
        });

}

const displayMeals = (meals) => {
    if (meals) {
        meals.forEach(meal => {

            let name = meal.strMeal;
            let img = meal.strMealThumb;
            let id = meal.idMeal;

            let title = $('<h3>').text(name);
            let pic = $('<img>').attr('src', img);

            let card = $('<div>').addClass('meal-container')
                .attr('data-mealID', id)
                .append(title).append(pic);

            //console.log($('#searchOutput'))
            $('#searchOutput').append(card);
        });
        console.log('done meal output')
    }
}

document.addEventListener('click', (e) => {
    if (e.target.matches('.meal-container')) {
        alert('recipe clicked');
        return;
    } else if (e.target.id === "searchBtn") {
        searchByIngredient();
    } else {
        // alert(e.target.id);
    }

});