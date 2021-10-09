/* FOR TESTING PURPOSES SO API CALL DO NOT NEED TO BE MADE EVERY TIME */
let makeAPICalls = true; //switch to true to make API calls
var groceryList = JSON.parse(localStorage.getItem("grocerylist")) || [];
var faveList = JSON.parse(localStorage.getItem("favourites")) || [];
var lastMeal = {};

//local api data for testing due to limited free api calls
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

//HOME PAGE SETUP
//generates a logo in the search output container on page load
const addLogoToIngSearch = () => {
    $('#searchOutput').append($("<div id='LOGO'>").text(' '));

};
addLogoToIngSearch();

// adds logo dynamically to control the size of the changin nav
$('#header-logo')
    .empty()
    .append("<img src='./assets/images/logo1.png'>")
    .css("img{ height:80px;}")


// ADD NAV BUTTONS TO LOWER RIGHT COLUMN
const addRightCol = (elOut) => {

    elOut ? null : elOut = $('#right-column');
    elOut.empty();
    /*
        $('nav .nav-item').each((i, el) => {
            //console.log(el)
            $(el).clone().addClass('button is-info').appendTo(elOut);
        });
    */
    $("<div class='nav-item button is-primary'>").text('Search Ingredients').attr('id', 'ingredient-nav').appendTo(elOut);
    $("<div class='nav-item button is-info'>").text('Search Recipe').attr('id', 'recipe-nav').appendTo(elOut);
    $("<div class='nav-item button is-purple'>").text('Random').attr('id', 'randoBtn').appendTo(elOut);
    $("<div class='nav-item button is-warning'>").text('Grocery List').attr('id', 'grocery-nav').appendTo(elOut);


};
addRightCol();

//display favourite recipe button on home page
const displayFavHomepge = () => {

    $('#left-column').empty();
    //jquery needed to add
    let container = document.getElementById('right-column').getBoundingClientRect();
    //goes through favourite list to create buttons
    for (let i = 0; i < faveList.length; i++) {
        let favMealName = faveList[i].strMeal
            // console.log(faveList[i]);
        let fave = $("<button>").text(favMealName).attr('data-idx', i).addClass('favMealName button is-pink');
        $('#left-column').append(fave);
    };
    //display meal on click
    $('.favMealName').click(function(e) {
        //    console.log(faveList[i]);
        displayRecipe(faveList[$(e.target).attr('data-idx')]);
    });

    //creating css style for left column 
    $('#left-column')
        // keep height consitent it will change even though it should be locked in with the flexbox settings
        .css('max-height', (container.bottom - container.top));

}

displayFavHomepge(faveList);

//primary functions
//to be able to search by ingredient and fetching meal info from the API
const searchByIngredient = () => {

    let searchString;

    /****** */
    // testing without api call
    if (!makeAPICalls) {
        $('#searchOutput').empty();
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
    //getting API info
    fetch("https://themealdb.p.rapidapi.com/filter.php?i=" + searchString, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "themealdb.p.rapidapi.com",
                "x-rapidapi-key": "c5d39432acmsh9d55200b1fddc5ap16e8f6jsn9b22759a0fe2"
            }
        })
        //checking doe meal data
        .then(response => {
            if (response.ok) {
                response.json()
                    .then((data) => {
                        //console.log(data);
                        if (!data.meals) { displayModal('No Results Found'); return }
                        //  console.log(data);
                        if (data.meals) {
                            $('#searchOutput').empty();
                            //display meals that match search
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

//get a random recipe from the API
const searchRandomMeal = () => {
    /****** */
    // testing without api call
    if (!makeAPICalls) {
        $('#searchOutput').empty();
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
                        $('#searchOutput').empty();
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

//getting the recipe from the idNum that is provided in the API
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

//  ******  URL FOR 1 RANDOM COCKTAIL  ******  //
var getRandCocktail = function() {
    getCocktails("https://the-cocktail-db.p.rapidapi.com/random.php");

};


//  ****** URL FOR 10 RANDOM COCKTAILS  ******  //
var get10RandCocktail = function() {
    getCocktails('https://the-cocktail-db.p.rapidapi.com/randomselection.php');
};


//  ****** GET THE COCKTAIL(S)  ******  //
var getCocktails = function(fetchURL) {
    fetch(fetchURL, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
                "x-rapidapi-key": "9fbe0f4555msh10b0fd4cdc4f9abp142f2djsn3d0f0dff927e"
            }
        })
        // if repsonse is ok send data to displayCocktailData(drink)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                        parseCocktailData(data.drinks);
                    })
                    // if there is a response error
            } else {
                console.error("Response Failed");
                displayModal("Bad Response");
            }
        })

    // if there is a fetch error
    .catch(err => {
        console.error("Fetch Failed");
        displayModal("Failed to get information. Make sure you are connected to the internet.");
    });
};

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

//this takes meals from the API and displays it with DOM
const displayMeals = (meals) => {
    //variable to store size of the meal display depending on how many meals it has
    let size;

    //console.log(meals) for testing if we recieve meals

    if (meals.length) {
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

        //taking meals and adding it to page using the DOM m
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

        //no need for if statement because you dont need to pass size
        // if (size) { // if size is provided set the size to that %width
        //     $('.meal-container')
        //         .css('width', calcMaxMealSize(maxHeight) / size + 'px')
        //         .css('height', calcMaxMealSize(maxHeight) / size + 'px');

        // } else { // calc max available size in px
        size = calcMaxMealSize(maxHeight);
        $('.meal-container')
            .css('width', size + 'px')
            .css('height', size + 'px');
        // }

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

//search recipes using the recipe name and not the ingredient which is a different api call
const searchByRecipe = () => {
    let searchString;
    /****** */
    // testing without api call
    if (!makeAPICalls) {
        $('#searchOutput').empty();
        displayMeals(meals);
        return;
    }
    // testing without api call
    /***** */

    if (!searchString) {
        searchString = $('#ingredientSearch').val() //get a value from the searchbar
        $('#ingredientSearch').val('');
    }

    fetch("https://themealdb.p.rapidapi.com/search.php?s=" + searchString, {
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

                        if (!data.meals) { displayModal('No Results Found'); return; }
                        // console.log(data);
                        if (data.meals) {
                            $('#searchOutput').empty();
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
};

//calling API for ingredientsusing the IDNum that matches 
const fetchIngredients = (idNum) => {

    // console.log(idNum) testing idNum
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

//displays ingredients, measurments and meal picture icon for the random recipe function
const outputIngredients = (meal) => {
    lastMeal = meal;
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

    ////ingredientArray = ingredient;
    //console.log(ingredientArray);

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

        //console.log(groceryList)
        $(groceryList).each((idx, item) => {
            if (ingredient[i] === (item.name || item)) {
                //console.log(ingredient[i] + " checked")
                chkBoxItem.attr('checked', '')
            }
        });

        box.append(item);
        ingredientList.append(box);
    }

    /******* CALCULATE WHAT THE HEIGHT OF LEFT-COLUMN CONTAINER IS */
    container = document.getElementById('right-column').getBoundingClientRect();

    $('#left-column').empty();
    $('#left-column')
        .append(ingredientList)
        // keep height consitent it will change even though it should be locked in with the flexbox settings
        .css('max-height', (container.bottom - container.top));

    //calling function to listen for users adding ingredients to grocery list
    ingredientToGroceryListener();
}

//checking for ingredient clicks to add to gorcery list using local storage 
const ingredientToGroceryListener = () => {

    $('.addList').click(function() {
        // displayModal('add all to list!!')
        $.each($(".ingredient-checklist-holder input.checkbox"), function() {

            if (!this.checked) {
                this.checked = true;
                $(this).change(); // trigger change event listener
            }
        });
    })

    $('input.checkbox').on('change', (e) => {
        let removeList = [];
        if (e.target.checked) {
            // if checked add to grocerylist
            groceryList.push(e.target.id);

            // console.log('added ' + e.target.id);

            if (e.target.id == 0) {
                console.log(e.target)
            }

            // remove duplicates
            //code here
            $(groceryList).each((idx, item) => {
                //console.log(item)
                //duplicateArray.push(item.name || item)
                $(groceryList).each((x, ite) => {
                    if (((item.name || item) === (ite.name || ite)) && x != idx) {
                        //console.log((item.name || item) + idx + " == " + (ite.name || ite) + x);
                        groceryList[x] = '';

                    } else if (x != idx) {
                        //console.log((item.name || item) + " ne " + (ite.name || ite))
                    }
                });
            });

            for (let i = 0; i < groceryList.length; i++) {

                if (groceryList[i] === '') {
                    groceryList.splice(i, 1);
                    i--;
                }

            };
            //*** ABOVE NOW WORKING GOOD */


            //save list to local storage
            localStorage.setItem("grocerylist", JSON.stringify(groceryList));

        } else { //else remove from grocerylist 
            /*   IS NOW WORKING ?? YES **/
            //console.log('removing ')
            removeList = [];
            //search list for item

            $(groceryList).each((idx, item) => {
                if (e.target.id === (item.name || item)) {
                    //add to a list of indexes to be remove if found
                    removeList.push(idx)
                }
            });

            $(removeList).each((idx, item) => {
                // go through the remove list and remove the corresponding entry from grocerylist  
                // keeping in mind that the index will shift down with each item removed
                groceryList.splice(item - idx, 1);
            })



            //update localStorage
            localStorage.setItem("grocerylist", JSON.stringify(groceryList));
        }

    });
};

// dermine if a string is more then white space / for recipe ingredient
function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

//displaying the full recipe using a modal and getting the information needed from meal
const displayRecipe = (meal) => {

    let name = meal.strMeal;
    let image = meal.strMealThumb;
    let source = meal.strSource;
    // let video = meal.strYoutube; for future development
    let id = meal.idMeal

    let recipe = meal.strInstructions;

    let ingredient = [];
    let measure = [];

    let opt = '';
    for (let c = 0; c < 2; c++) { //run a loop twice// once for ingredients and once for measure
        c ? opt = 'Measure' : opt = 'Ingredient' // when c is 1 opt = Measure/when c is 0 opt = ingredient
        for (let i = 1; i < 21; i++) {
            if (!isBlank(meal['str' + opt + i])) {
                c ? measure.push(meal['str' + opt + i]) : ingredient.push(meal['str' + opt + i]);
                // on first run builds ingredient aray on second it buids the measure array
            }
        }
    }


    let modalContent = $('<section>').attr('id', 'recipeModal').addClass('modal-card-body');

    let pic = $('<img>').attr('src', image);
    let link = $('<a>').attr('href', source);
    let tube = $('<div>').attr('id', 'player');

    let instructions = $('<p>').append("<hr>" + recipe);

    //to add all the ingredients to the grocery list using this button
    let addIngredientBtn = $('<button>').text('Select All').addClass('addList');

    //button to add recipe to favourites list
    let addFavouriteBtn = $('<button>').text(' ').addClass('fave');
    //check if this recipe is in the fav list and if so add is-fav class
    $(faveList).each((idx, item) => {
        item.idMeal === id ?
            addFavouriteBtn.addClass('is-fav') :
            null;
    });


    //to add a random drink with your recipe
    let pairWithDrinkBtn = $('<button>').text('Drink Pairing').attr('id', 'drink-pairing');

    //displaying the ingredients and measurments
    let ingredientList = $('<div>').addClass('ingredient-list')
        .append("Ingredients:")
        .append(addIngredientBtn, pairWithDrinkBtn);

    for (let i = 0; i < ingredient.length; i++) {
        let box = $("<div class='ingredient-checklist-holder'>")
        let chkBoxItem = $('<input>')
            .addClass('checkbox food')
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

        //to check if individual ingredeients were added to the grocerylist
        //console.log(groceryList)
        $(groceryList).each((idx, item) => {
            if (ingredient[i] === (item.name || item)) {
                //console.log(ingredient[i] + " checked")
                chkBoxItem.attr('checked', '')
            }
        });

        box.append(chkBoxItem, item);
        ingredientList.append(box);
    }


    //putting all the info in a modal display
    modalContent.append(link.append(pic), ingredientList, instructions);

    let modal = $('<div>').addClass('modal is-active').attr('id', 'recipeModal');
    let modalBG = $('<div>').addClass('modal-background')
    let modalCard = $('<div>').addClass('modal-card big-modal').append(

        $('<div>').addClass('modal-card-head').append(
            $('<p>').addClass('modal-card-title').append(name, addFavouriteBtn),
            $('<button>').attr('id', 'meal-modal-close').addClass('delete').attr('aria-label', 'close')
        ),
        modalContent
    )

    modal.append(modalBG, modalCard);

    $('body').append(modal);

    if ($('#left-column .ingredient-list').length) {
        $('#left-column').empty().text('refill');
    }

    //grocerylist lisner and favourite list lis
    ingredientToGroceryListener();
    addFavourite(meal);
}

//creating the modal for the recipe using bulma classes
const displayModal = (msg) => {
    // will display a pop up modal takes a string or an object containing a strings: 'head' and 'body'
    // and button string containing the buttons to display (ok) or (yes/no)
    // HTML is permitted and I believe jQuery elements can allso be passed to body

    if (jQuery.type(msg) === "string") {
        let bdmsg = msg;
        msg = {
            head: 'Alert',
            body: bdmsg,
            button: 'alert'
        }
    }

    let alertBtn = $('<button>').attr('id', 'newModal-alertBtn').addClass('button is-warning').text('Ok');
    let cancelBtn = $('<button>').attr('id', 'newModal-cancelBtn').addClass('button is-pink').text('Cancel');
    let okBtn = $('<button>').attr('id', 'newModal-okBtn').addClass('button is-success').text('Ok');

    let modalFoot = $("<footer class='modal-card-foot'>");

    msg.button === 'alert' ?
        modalFoot.append(alertBtn) :
        modalFoot.append(cancelBtn, okBtn);


    let modalContent = $('<section>').attr('id', 'newModal').addClass('modal-card-body');

    modalContent.append(msg.body);

    let modal = $('<div>').addClass('modal is-active').attr('id', 'popModal');
    let modalBG = $('<div>').addClass('modal-background')
    let modalCard = $('<div>').addClass('modal-card big-modal').append(

        $('<div>').addClass('modal-card-head').append(
            $('<p>').addClass('modal-card-title').text(msg.head),
            $('<button>').attr('id', 'pop-modal-close').addClass('delete').attr('aria-label', 'close')
        ),
        modalContent
    )

    if (msg.button) {
        modal.append(modalBG, modalCard.append(modalFoot));
    } else {
        modal.append(modalBG, modalCard);
    }

    $('body').append(modal);


    /*** Event listener created for modal buttons */

    $('footer.modal-card-foot button').on('click', (e) => {
        if (e.target.id === 'newModal-alertBtn') {
            $('#popModal').remove();
        }
    });
};

//  ****** DISPLAY COCKTAIL DATA  ****** //
var parseCocktailData = function(drinks) {
    //console.log(drinks)
    const myDrinks = drinks.map(el => { // create new array 'myDrinks' and remap old JSON data

        let details = { // default object
            "strIngredients": [], // array in array
            "strMeasures": [] // array in array
        }
        Object.keys(el).forEach(key => {
            if (key.startsWith('strIngredient')) { // search for keys that start with strIngredient and put them in new array 'strIngredients'
                if (el[key]) // prevent ""
                    details.strIngredients.push(el[key])
            } else if (key.startsWith('strMeasure')) { // search for keys that start with strMeasures and put them in new array 'strMeasures'
                if (el[key]) // prevent ""
                    details.strMeasures.push(el[key])
            } else {
                details[key] = el[key] // add the rest of the keys/values to the new myDrinks array
            }
        })

        return details
    })

    // console.log(myDrinks);
    // console.log(myDrinks[0].strDrink);
    // console.log(myDrinks[0]);

    //calling the drink modal display and passing myDrinks through it
    displayCocktails(myDrinks);

};

//displaying the drink modal
const displayCocktails = (myDrinks) => {

    // details of drink for modal

    let modalDrinkDetails = $('<div>').attr('id', 'drinkDetails').addClass('modal-card-body');

    let pic = $('<img>').attr('src', myDrinks[0].strDrinkThumb);
    let videoDiv = $('<div>').append($('<a>').attr('href', myDrinks[0].strVideo).text('Video Link'));
    // let video = $('<a>').attr('id', 'player');
    let instructions = $('<p>').append("<hr>" + myDrinks[0].strInstructions);
    let ingredientList = $('<div>').addClass('ingredient-list').append("Ingredients:");

    let myIngredients = myDrinks[0].strIngredients;
    let myMeasurments = myDrinks[0].strMeasures;

    for (let i = 0; i < myIngredients.length; i++) {
        let ingredientListBox = $("<div class='ingredient-checklist-holder'>");
        let chkBoxItem = $('<input>').addClass('checkbox')
            .attr('type', 'checkbox')
            .attr('name', 'food')
            .attr('id', myIngredients[i])
            .attr('value', myIngredients[i]);

        let item = $('<label>')
            .attr('for', myIngredients[i])
            .addClass('ingredient-item')
            .addClass('checkbox')
            .text(myIngredients[i])
            .append(
                $('<span>')
                .addClass('ingredient-measure')
                .text(myMeasurments[i])
            );
        ingredientListBox.append(chkBoxItem, item);
        ingredientList.append(ingredientListBox);
    }

    modalDrinkDetails.append(pic, ingredientList, instructions);

    displayModal({ head: myDrinks[0].strDrink, body: modalDrinkDetails, button: 'alert' });

};

//checking if the meal was added to the favourite list
const addFavourite = (meal) => {
    $('.fave').click(function() {

        let removeFav = false;
        //if meal is in favelist remove it and update recipe modal
        $(faveList).each((idx, item) => {
            item.idMeal === meal.idMeal ?
                removeFav = idx :
                null;
        });

        if (parseInt(removeFav) > -1) {
            // console.log('removing fav ' + meal.idMeal)
            faveList.splice(removeFav, 1);
        }
        //else add it it to the favelist
        else {
            // console.log('adding fav ' + meal.idMeal)
            faveList.push(meal);
        }

        //update recipieModal Favicon
        $('button.fave').toggleClass('is-fav');

        //console.log(faveList);
        localStorage.setItem('favourites', JSON.stringify(faveList));

    })
};

//displaying the favourite reciepes when going to the favourite page
const displayFavRecipes = () => {
    // if(faveList ===! ''){
    $('#searchOutput').empty();
    $('#searchOutput').append($('<h2>').text('Favorite Recipes').css('width', '100%'));
    displayMeals(faveList, 2); // 2 per row with some spacing // function no longer accepts a size variable
}

//displaying the grocerylist from a pop out
const displayGroceryList = () => {

    // clear existing list
    $('#grocerylist-list').empty();
    $('#add-grocery-item').val('').css('opacity', '0').hide();

    if (groceryList.length) {

        for (let i = 0; i < groceryList.length; i++) {

            //makes the grocery item into an object with a status for collected 
            if (groceryList[i].status === undefined) {
                let tmp = groceryList[i];
                groceryList[i] = {
                    name: tmp,
                    status: 0
                }
            }

            let chkBox = $('<input>').addClass('checkbox grocery-list-item').attr('type', 'checkbox').attr('id', i);
            let label = $('<label>')
                .addClass('grocery-list-item checkbox')
                .attr('for', i)
                .text(groceryList[i].name);

            let itemOrder = 0;
            if (groceryList[i].status) {
                itemOrder = 2;
                chkBox.prop('checked', true)
            }

            $('#grocerylist-list').append(
                $("<div class='cont'>").append(chkBox, label).css('order', itemOrder)
            );

        }
        let removeBtn = $('<button>')
            .addClass('button is-danger is-small')
            .text('Remove Collected')
            .css({ 'position': 'fixed', 'bottom': '0', 'width': '250px' })

        $('#grocerylist-list').append(
            $("<div class='div'>").text('Collected Items').css('order', '1'),
            removeBtn
        );

    } else {
        $('#grocerylist-list').append("EMPTY");
    }
};

//adding items to the grocery list in local storage
const addGroceryItem = () => {
    if ($('#add-grocery-item').val()) {

        let item = $('#add-grocery-item').val();
        groceryList.push(item);
        localStorage.setItem("grocerylist", JSON.stringify(groceryList));
        displayGroceryList();
    } else {
        $('#add-grocery-item').val('').css('opacity', '0').hide();
    }
};

//eventlisteners for the main nav bar
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

    } else if (e.target.id === "randoBtn") {
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
        $('#searchOutput').empty().text(' ');
        addLogoToIngSearch();

        $('#info-columns').show();
        addRightCol();
        $('#left-column').empty();
        displayFavHomepge(faveList);

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
        if ($('#left-column').text() == 'refill') {
            outputIngredients(lastMeal);
        } else { displayFavHomepge(faveList); }

    } else if (e.target.id === 'pop-modal-close') {
        $('#popModal').remove();
    } else if (e.target.id === 'drink-pairing') {
        getRandCocktail();
    } else {
        //DO NOTHING
        //displayModal(e.target.id);
    }


});

$('#ingredientSearch').on('keypress', (e) => {
    if (e.key === 'Enter') {
        $('#searchBtn').click();
    }
});

//making the logo a homebutton
$('#header-logo').click(function() {
    $('#ingredient-nav').click();
})

//adding ingredient that was typed out
$('#add-grocery-item').on('keypress', (e) => {
    if (e.key === 'Enter') {
        addGroceryItem();
    }
});

$('#grocery-list-remove').on('click', (e) => {

    $("div.cont").each((idx, el) => {

        $(el).children('label').addClass('deletable');

    });

});

//gorcery list event listener within the list itself
$('#grocerylist-list').on('click', 'input.checkbox', (e) => {

    let idx = $(e.target).attr('id');

    if ($(e.target).next('.deletable')[0]) {
        groceryList.splice(idx, 1);
        localStorage.setItem("grocerylist", JSON.stringify(groceryList));
        displayGroceryList();
        outputIngredients(lastMeal);

    } else if (e.target.closest('.cont').style.order == '0') {
        e.target.closest('.cont').style.order = '2';

        groceryList[idx].status = 1;

    } else {
        e.target.closest('.cont').style.order = '0';

        groceryList[idx].status = 0;
    }

    localStorage.setItem("grocerylist", JSON.stringify(groceryList));
});

//deleting items from grocery list event listener
$('#grocerylist-list').on('click', 'button.is-danger', (e) => {

    $("div.cont").each((idx, el) => {

        if (el.style.order == '2') {
            let idx = $(el).children('input').attr('id');
            $(el).remove();
            groceryList[idx] = '';
        }

    });
    //removing ingredeient from the array
    for (let i = 0; i < groceryList.length; i++) {

        if (groceryList[i] === '') {
            groceryList.splice(i, 1);
            i--;
        }

    };
    //updating the localstorage
    localStorage.setItem("grocerylist", JSON.stringify(groceryList));
    if ($('#left-column .ingredient-list').length) {
        outputIngredients(lastMeal);
    }

});

/** END OF GROCERY LIST */


//opens sidebar from main nav
function openNav() {
    displayGroceryList();
    $("#grocerylist").css({ 'left': '0' });

}

//close sidebar
function closeNav() {
    $("#grocerylist").css({ 'left': '-250px' });
}