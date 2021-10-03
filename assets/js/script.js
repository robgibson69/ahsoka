/* FOR TESTING PURPOSES SO API CALL DO NOT NEED TO BE MADE EVERY TIME */
const meals = [{
    strMeal: 'Burger',
    strMealThumb: 'https://westcoastfood.ca/wp-content/uploads/2019/04/Ulis1.jpg',
    idMeal: '69420'
},
{
    strMeal: 'Burger',
    strMealThumb: 'https://westcoastfood.ca/wp-content/uploads/2019/04/Ulis1.jpg',
    idMeal: '69420'
},
{
    strMeal: 'Burger',
    strMealThumb: 'https://westcoastfood.ca/wp-content/uploads/2019/04/Ulis1.jpg',
    idMeal: '69420'
},
{
    strMeal: 'Burger',
    strMealThumb: 'https://westcoastfood.ca/wp-content/uploads/2019/04/Ulis1.jpg',
    idMeal: '69420'
},
{
    strMeal: 'Burger',
    strMealThumb: 'https://westcoastfood.ca/wp-content/uploads/2019/04/Ulis1.jpg',
    idMeal: '69420'
},
{
    strMeal: 'Burger',
    strMealThumb: 'https://westcoastfood.ca/wp-content/uploads/2019/04/Ulis1.jpg',
    idMeal: '69420'
},
{
    strMeal: 'Burger',
    strMealThumb: 'https://westcoastfood.ca/wp-content/uploads/2019/04/Ulis1.jpg',
    idMeal: '69420'
},
{
    strMeal: 'Burger',
    strMealThumb: 'https://westcoastfood.ca/wp-content/uploads/2019/04/Ulis1.jpg',
    idMeal: '69420'
},
]
/************ */
const mealRecipe = {

    strMeal: 'Burger',
    strMealThumb: 'https://westcoastfood.ca/wp-content/uploads/2019/04/Ulis1.jpg',
    strSource: 'www.not_a_real_recipe_dot_com.org',
    strYoutube: 'www.not_a_real_youTube_dot_com.org',
    idMeal: '69420',

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

const searchByIngredient = (searchString) => {
    /****** */
    // testing without api call
    displayMeals(meals);
    return;
    // testing without api call
    /***** */

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

const searchRandomMeal = () => {
    /****** */
    // testing without api call
    displayMeals([meals[0]]);
    return;
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

var groceryList = JSON.parse(localStorage.getItem("grocerylist"));
// var data = JSON.parse(localStorage.getItem("grocerylist"));
// console.log(data);   

for (let i = 0; i < groceryList.length; i++) {
    var buyItem = $('<input>').addClass('checkbox').attr('type', 'checkbox').attr('id', groceryList[i]);
    var specificBuyItem = $('<label>').attr('for', groceryList[i]).addClass('groceryList-item').addClass('checkbox').text(groceryList[i]);
    
    $('#grocerylist').append(buyItem, specificBuyItem);
    }


const displayMeals = (meals, size) => {
    if (meals) {
        let oneMeal = true;
        if (meals.length > 1) {
            oneMeal = false;
            $('div.row.info').hide();
        } else { $('div.row.info').show(); }

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
        size ? null : size = 80;
        $('.meal-container')
            .css('width', size + 'vw')
            .css('height', size + 'vw');
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
    outputIngredients(mealRecipe); //idNum
    return;
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
        $('<h2>').text('Ingredients:')
    );

    for (let i = 0; i < ingredient.length; i++) {
        let box = $("<div class='ingredient-checklist-holder'>")
        let chkBoxItem = $('<input>').addClass('checkbox').attr('type', 'checkbox').attr('id', ingredient[i]);
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
    ingredientList.append(
        $('<button>').text('add all to list'),
        $('<button>').text('add selected to list')
    )

    $('#left-column').empty();
    $('#left-column').append(ingredientList);
}

const fetchRecipe = (idNum) => {

    /****** */
    // testing without api call
    displayRecipe(mealRecipe);
    return;
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

const displayRecipe = (meal) => {

    let name = meal.strMeal;
    let image = meal.strMealThumb;
    let source = meal.strSource;
    let video = meal.strYoutube;

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
        let box = $("<div class='ingredient-checklist-holder'>")
        let chkBoxItem = $('<input>').addClass('checkbox').attr('type', 'checkbox').attr('id', ingredient[i]).attr('name', 'food').attr('value', ingredient[i]);
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

    let addIngredientBtn = $('<button>').text('Add to Grocery List').addClass('addList');

    modalContent.append(link, pic, ingredientList, addIngredientBtn, instructions);

    let modal = $('<div>').addClass('modal is-active').attr('id', 'recipeModal');
    let modalBG = $('<div>').addClass('modal-background')
    let modalCard = $('<div>').addClass('modal-card big-modal').append(

        $('<div>').addClass('modal-card-head').append(
            $('<p>').addClass('modal-card-title').text(name),
            $('<button>').addClass('delete').attr('aria-label', 'close')
        ),
        modalContent
    )

    modal.append(modalBG, modalCard);

    $('body').append(modal);

    $(".addList").click(function () {
        // console.log("Clicked by User")
        // var groceryList = [];
        $.each($("input[name='food']:checked"), function () {
            groceryList.push($(this).val());
        });
        console.log(groceryList)
        localStorage.setItem("grocerylist", JSON.stringify(groceryList));
    })

    //need an event listener for the modal close
    $('#recipeModal').on('click', 'button.delete', () => {
        $('#recipeModal').removeClass('is-active');
        //enable body scroll
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    })
    /************ */

}


const displayFavRecipes = () => {
    $('#searchOutput').append($('<h2>').text('Favorite Recipes').css('width', '100%'));
    displayMeals(meals, 46)
}

$('#ingredientSearch').on('keypress', (e) => {
    if (e.key === 'Enter') {
        $('#searchBtn').click();
    }
});
document.addEventListener('click', (e) => {
    if (e.target.id === "searchBtn") {
        //search by ingredient search button was pressed
        searchByIngredient();
    } else if (e.target.id === "randoBtn") {
        //hide the searchbar
        $('#searchBar').hide();
        //reset output
        $('#searchOutput').empty();
        //search random
        searchRandomMeal();
    } else if (e.target.id === "ingredient-nav") {
        //searchbar is displayed
        $('#searchBar').show();
        // clear out previous results
        $('#searchOutput').empty();

    } else if (e.target.id === "fav-nav") {
        //hide the searchbar
        $('#searchBar').hide();
        //reset output
        $('#searchOutput').empty();

        displayFavRecipes();
        /*  */
    } else if (e.target.id === "grocery-nav") {
        //hide the searchbar
        $('#searchBar').hide();
        //more code to come
        /*  */

    } else {
        //DO NOTHING
        // alert(e.target.id);
    }

});

//opens sidebar from main nav
function openNav() {
    document.getElementById("grocerylist").style.cssText = "width:250px; transition:1";
}

//close sidebar
function closeNav() {
    document.getElementById("grocerylist").style.width = "0";
}
