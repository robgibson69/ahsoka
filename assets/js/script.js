const searchByIngredient = (searchString) => {

    if (!searchString) {
        searchString = $('#ingredientSearch').val().replace(/\s/g, '');
    }

    searchString = encodeURI(searchString);

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
                        //console.log(data);
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

const fetchRecipe = (idNum) => {

    if (idNum !== '') {

        fetch("https://themealdb.p.rapidapi.com/lookup.php?i=" + idNum, {
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
                            displayRecipe(data.meals[0]);
                        })
                } else {
                    console.error(err);
                }
            })
            .catch(err => {
                console.error(err);
            });

    }

}

const displayRecipe = (meal) => {

    let name = meal.strMeal;
    let image = meal.strMealThumb;
    let source = meal.strSource;
    let video = meal.strYoutube;

    let recipe = meal.Instructions;

    let ingredient = [];
    let measure = [];

    let opt = '';
    for (let c = 0; c < 2; c++) { //run a loop twice// once for ingredients and once for measure
        c ? opt = 'Measure' : opt = 'Ingredient' // when c is 1 opt = Measure/when c is 0 opt = ingredient
        for (let i = 0; i < 20; i++) {
            if (meal['str' + opt + i] !== "") {
                c ? measure.push(meal['str' + opt + i]) : ingredient.push(meal['str' + opt + i]);
            }
        }
    }

    alert(ingredient);

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

            $('#searchOutput').append(card);
        });

        $('.meal-container').on('click', (e) => {
            let id = $(e.target).closest('div').attr('data-mealID');

            fetchRecipe(id);

        });
    }
}


$('#ingredientSearch').on('keypress', (e) => {
    if (e.key === 'Enter') {
        document.querySelector('#city-search-button').click();
    }
});

document.addEventListener('click', (e) => {
    if (e.target.id === "searchBtn") {
        searchByIngredient();
    } else {
        // alert(e.target.id);
    }

});