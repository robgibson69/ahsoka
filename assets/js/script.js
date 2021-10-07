/* FOR TESTING PURPOSES SO API CALL DO NOT NEED TO BE MADE EVERY TIME */
makeAPICalls = false; //switch to true to make API calls

const meals = [{
            strMeal: 'Burger',
            strMealThumb: 'https://westcoastfood.ca/wp-content/uploads/2019/04/Ulis1.jpg',
            idMeal: '69420'
        },
        {
            strMeal: 'Burger',
            strMealThumb: 'https://westcoastfood.ca/wp-content/uploads/2019/04/Ulis1.jpg',
            idMeal: '69421'
        },
        {
            strMeal: 'Burger',
            strMealThumb: 'https://westcoastfood.ca/wp-content/uploads/2019/04/Ulis1.jpg',
            idMeal: '69422'
        },
        {
            strMeal: 'Burger',
            strMealThumb: 'https://westcoastfood.ca/wp-content/uploads/2019/04/Ulis1.jpg',
            idMeal: '69423'
        },
        {
            strMeal: 'Burger',
            strMealThumb: 'https://westcoastfood.ca/wp-content/uploads/2019/04/Ulis1.jpg',
            idMeal: '69424'
        },
        {
            strMeal: 'Burger',
            strMealThumb: 'https://westcoastfood.ca/wp-content/uploads/2019/04/Ulis1.jpg',
            idMeal: '69425'
        },
        {
            strMeal: 'Burger',
            strMealThumb: 'https://westcoastfood.ca/wp-content/uploads/2019/04/Ulis1.jpg',
            idMeal: '69426'
        },
        {
            strMeal: 'Burger',
            strMealThumb: 'https://westcoastfood.ca/wp-content/uploads/2019/04/Ulis1.jpg',
            idMeal: '69427'
        },
    ]
    /************ */
const mealRecipe = {

        strMeal: 'Burger',
        strMealThumb: 'https://westcoastfood.ca/wp-content/uploads/2019/04/Ulis1.jpg',
        strSource: 'www.not_a_real_recipe_dot_com.org',
        strYoutube: 'www.not_a_real_youTube_dot_com.org',
        idMeal: '69421',

        strInstructions: "Cook the patty and then put it between two half buns",

        strIngredient1: "Hamburger Buns",
        strIngredient2: "Ground Beef",
        strIngredient3: "Mustard",
        strIngredient4: "Ketchup",
        strIngredient5: "Lettuce",
        strIngredient6: "Tomato",
        strIngredient7: "Pickles",
        strIngredient8: "Onion",
        strIngredient9: '',
        strIngredient10: '',
        strIngredient11: '',
        strIngredient12: '',
        strIngredient13: '',
        strIngredient14: '',
        strIngredient15: '',
        strIngredient16: '',
        strIngredient17: '',
        strIngredient18: '',
        strIngredient19: '',
        strIngredient20: '',

        strMeasure1: "1 bag",
        strMeasure2: "1 pound",
        strMeasure3: "1 tblspoon",
        strMeasure4: "1 tblspoon",
        strMeasure5: "3 leaves",
        strMeasure6: "1 ripe one",
        strMeasure7: "2 should do",
        strMeasure8: "1/2 chopped",
        strMeasure9: '',
        strMeasure10: '',
        strMeasure11: '',
        strMeasure12: '',
        strMeasure13: '',
        strMeasure14: '',
        strMeasure15: '',
        strMeasure16: '',
        strMeasure17: '',
        strMeasure18: '',
        strMeasure19: '',
        strMeasure20: '',

    }
    /****************** */
var faveList = JSON.parse(localStorage.getItem("favourites")) || [];
displayFavHomepge(faveList);
const searchByIngredient = (searchString) => {

    /****** */
    // testing without api call
    if (!makeAPICalls) {
        displayMeals(meals);
        return;
    }
    // testing without api call
    /***** */

    if (!searchString) {
        searchString = $('#ingredientSearch').val() //get a value from the searchbar
        let terms = searchString.split(/[ ,\.]+/); // splits search terms by comma an period or white space
        searchString = terms.join(','); // makes a nice comma seperated list for apicall
        //console.log(searchString)
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
                        if (!data.meals) { displayModal('No Results Found'); return }
                        //  console.log(data);
                        if (data.meals) {
                            displayMeals(data.meals);
                        } else {
                            displayModal('No matches Found');
                        }
                    })
            } else {
                console.error(err);
            }
        })
        .catch(err => {
            console.error(err);
        });

}

const searchRandomMeal = () => {
    /****** */
    // testing without api call
    if (!makeAPICalls) {
        displayMeals([meals[0]]);
        return;
    }
    // testing without api call
    /***** */

    fetch("https://themealdb.p.rapidapi.com/random.php", {
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

    /****** */
    // testing without api call
    if (!makeAPICalls) {
        displayRecipe(mealRecipe);
        return;
    }
    // testing without api call
    /***** */


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
                            // console.log(data);
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

const calcMaxMealSize = (availableHeight) => {
    let maxSize = 0;
    // find available width of screen
    // screen.width
    // find available height of container
    // comes from calling function
    //set to 80% of available size showing entire meal
    maxSize = parseInt(Math.min(availableHeight, screen.width) * .8);
    //console.log(availableHeight, screen.width, maxSize)
    return maxSize;
}

const displayMeals = (meals, size) => {
    $('#searchOutput').empty();

    console.log(meals)

    if (meals) {
        let oneMeal = true;
        if (meals.length > 1) {
            oneMeal = false;
            $('#info-columns').hide();
        } else { $('#info-columns').show(); }

        /******* CALCULATE WHAT THE MAX HEIGHT OF OUTPUT CONTAINER SHOULD BE*/
        let bodyRect = document.body.getBoundingClientRect(),
            elemRect = document.getElementById('searchOutput').getBoundingClientRect(),
            elem2Rect = document.getElementById('main').getBoundingClientRect(),
            topOffset = parseInt(elemRect.top - bodyRect.top),
            botOffset = parseInt(elem2Rect.bottom - bodyRect.top),
            maxHeight = (botOffset - topOffset);
        /****** END OF CALC */

        meals.forEach(meal => {

            let name = meal.strMeal;
            let img = meal.strMealThumb;
            let id = meal.idMeal;

            let title = $('<h2>').text(name);
            let pic = $('<img>').attr('src', img);

            let card = $('<div>').addClass('meal-container')
                .attr('data-mealID', id)
                .css('background-image', 'url(' + img + ')')
                .append(title);

            $('#searchOutput').append(card);
        });

        /******* SET HEIGHT OF OUTPUT CONTAINER */
        $('#searchOutput').css('max-height', maxHeight + 'px');
        /** SET THE SIZE OF THE MEAL CONTAINERS */
        if (size) { // if size is provided set the size to that %width
            $('.meal-container')
                .css('width', size + 'vw')
                .css('height', size + 'vw');

        } else { // calc max available size in px
            size = calcMaxMealSize(maxHeight);
            $('.meal-container')
                .css('width', size + 'px')
                .css('height', size + 'px');
        }

        /********* */
        /*  */
        if (oneMeal) {
            fetchIngredients(meals[0].idMeal);
        }
        /***** */

        $('.meal-container').on('click', (e) => {
            let id = $(e.target).closest('div').attr('data-mealID');

            fetchRecipe(id);

        });
    }
}

const fetchIngredients = (idNum) => {

    /****** */
    // testing without api call
    if (!makeAPICalls) {
        outputIngredients(mealRecipe); //idNum
        return;
    }
    // testing without api call
    /***** */

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
                            // console.log(data);
                            outputIngredients(data.meals[0]);
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

const outputIngredients = (meal) => {
    let ingredient = [];
    let measure = [];

    let opt = '';
    for (let c = 0; c < 2; c++) { //run a loop twice// once for ingredients and once for measure
        c ? opt = 'Measure' : opt = 'Ingredient' // when c is 1 opt = Measure/when c is 0 opt = ingredient
        for (let i = 1; i < 21; i++) {
            if (meal['str' + opt + i] !== "") {
                c ? measure.push(meal['str' + opt + i]) : ingredient.push(meal['str' + opt + i]);
                // on first run builds ingredient aray on second it buids the measure array
            }
        }
    }

    let ingredientList = $('<div>').addClass('ingredient-list').append(
        $('<span>').text('Ingredients:'),
        $('<button>').text('Select All').addClass('addList').attr('id', 'select-all-btn')

    );

    for (let i = 0; i < ingredient.length; i++) {
        let box = $("<div class='ingredient-checklist-holder'>")
        let chkBoxItem = $('<input>')
            .addClass('checkbox')
            .attr('type', 'checkbox')
            .attr('id', ingredient[i]);
        let item = $('<label>')
            .attr('for', ingredient[i])
            .addClass('ingredient-item')
            .addClass('checkbox')
            .append(chkBoxItem)
            .append(ingredient[i])

        .append(
            $("<div style='display:inline-block'>")
            .addClass('ingredient-measure')
            .text(measure[i])
        );

        box.append(item);
        ingredientList.append(box);
    }

    /******* CALCULATE WHAT THE HEIGHT OF LEFT-COLUMN CONTAINER IS */
    container = document.getElementById('left-column').getBoundingClientRect(),

        $('#left-column').empty();
    $('#left-column')
        .append(ingredientList)
        // keep height consitent it will change even though it should be locked in with the flexbox settings
        .css('max-height', (container.bottom - container.top));


}

const displayRecipe = (meal) => {

    let name = meal.strMeal;
    let image = meal.strMealThumb;
    let source = meal.strSource;
    let video = meal.strYoutube;
    let id = meal.idMeal

    let recipe = meal.strInstructions;

    let ingredient = [];
    let measure = [];

    let opt = '';
    for (let c = 0; c < 2; c++) { //run a loop twice// once for ingredients and once for measure
        c ? opt = 'Measure' : opt = 'Ingredient' // when c is 1 opt = Measure/when c is 0 opt = ingredient
        for (let i = 1; i < 21; i++) {
            if (meal['str' + opt + i] !== "") {
                c ? measure.push(meal['str' + opt + i]) : ingredient.push(meal['str' + opt + i]);
                // on first run builds ingredient aray on second it buids the measure array
            }
        }
    }

    /****** OUTPUT DATA TO MODAL */
    // Disable body scroll
    document.body.style.position = 'fixed';
    document.body.style.top = `-${window.scrollY}px`;

    let modalContent = $('<section>').attr('id', 'recipeModal').addClass('modal-card-body');

    let pic = $('<img>').attr('src', image);
    let link = $('<a>').attr('href', source).text(source);
    let tube = $('<div>').attr('id', 'player');

    let instructions = $('<p>').text(recipe);

    let ingredientList = $('<div>').addClass('ingredient-list');

    for (let i = 0; i < ingredient.length; i++) {
        let box = $("<div class='ingredient-checklist-holder'>");
        let chkBoxItem = $('<input>')
            .addClass('checkbox')
            .attr('type', 'checkbox')
            .attr('id', ingredient[i])
            .attr('class', 'food')
            .attr('value', ingredient[i]);

        let item = $('<label>')
            .attr('for', ingredient[i])
            .addClass('ingredient-item')
            .addClass('checkbox')
            .text(ingredient[i])
            .append(
                $('<span>')
                .addClass('ingredient-measure')
                .text(measure[i])
            );

        box.append(chkBoxItem, item);
        ingredientList.append(box);
    }

    let addIngredientBtn = $('<button>').text('Select All').addClass('addList');
    let addFavouriteBtn = $('<button>').text('Add To Favourites').addClass('fave');

    modalContent.append(link, pic, ingredientList, addIngredientBtn, addFavouriteBtn, instructions);

    let modal = $('<div>').addClass('modal is-active').attr('id', 'recipeModal');
    let modalBG = $('<div>').addClass('modal-background')
    let modalCard = $('<div>').addClass('modal-card big-modal').append(

        $('<div>').addClass('modal-card-head').append(
            $('<p>').addClass('modal-card-title').text(name),
            $('<button>').attr('id', 'meal-modal-close').addClass('delete').attr('aria-label', 'close')
        ),
        modalContent
    )

    modal.append(modalBG, modalCard);

    $('body').append(modal);

    listenForIngredientClicks();
    addFavourite(meal);
}


const displayFavRecipes = () => {
    // if(faveList ===! ''){
    $('#searchOutput').append($('<h2>').text('Favorite Recipes').css('width', '100%'));
    displayMeals(faveList, 46); // at size 46% width of screen // aka 2 per row with some spacing
}

$('#ingredientSearch').on('keypress', (e) => {
    if (e.key === 'Enter') {
        $('#searchBtn').click();
    }
});
logoHomeBtn();

document.addEventListener('click', (e) => { 

    if ($('#add-grocery-item').css('opacity') == 1) {
        $('#add-grocery-item').val('').css('opacity', '0').hide();
        return;
    }

    if (e.target.id === "searchBtn") {

        $(e.target).siblings('input').attr('placeholder').match(/ingredient/g) ?
            //search by ingredient search button was pressed
            searchByIngredient() :
            searchByRecipe();

    }else if (e.target.id === "randoBtn") {
        //hide the searchbar
        $('#searchBar').hide();
        //reset output
        $('#searchOutput').empty();
        //search random
        searchRandomMeal();
        // center meal container
        $('#searchOutput').css('align-items', 'center')

    } else if (e.target.id === "ingredient-nav" || e.target.id === "recipe-nav") {
        //searchbar is displayed
        $('#searchBar').show()
        $('#ingredientSearch').focus();
        // clear out previous results
        $('#searchOutput').empty();
        addLogoToIngSearch();

        $('#info-columns').show();
        addRightCol();
        $('#left-column').empty();

        if (e.target.id === "recipe-nav") {
            $('#ingredientSearch').attr('placeholder', 'search for recipe').removeClass('is-primary').addClass('is-info');
            $('#searchBtn').removeClass('is-primary').addClass('is-info');
        } else {
            $('#ingredientSearch').attr('placeholder', 'list your ingredient(s)').addClass('is-primary').removeClass('is-info');
            $('#searchBtn').addClass('is-primary').removeClass('is-info');
        }



    } else if (e.target.id === "fav-nav") {
        //hide the searchbar
        $('#searchBar').hide();
        //reset output
        $('#searchOutput').empty();

        displayFavRecipes();
        /*  */
    } else if (e.target.id === "grocery-nav") {

        if (parseInt($("#grocerylist").css('left')) > -1)
            closeNav();
        else
            openNav();

        /*  */

    } else if (e.target.id === 'grocery-list-add') {

        $('#add-grocery-item').css('opacity', 1).show().focus();

    } else if (e.target.id === 'meal-modal-close') {
        $('#recipeModal').remove();
        //enable body scroll
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    } else if (e.target.id === 'pop-modal-close') {
        $('#popModal').remove();
    } else {
        //DO NOTHING
        //displayModal(e.target.id);
    }


});