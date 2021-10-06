var drinkContainerEl = document.querySelector('#modal');

const data = {
    "drinks": [{
        "idDrink": "11936",
        "strAlcoholic": "Alcoholic",
        "strCategory": "Ordinary Drink",
        "strDrink": "Pink Gin",
        "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/qyr51e1504888618.jpg",
        "strGlass": "White wine glass",
        "strImageAttribution": null,
        "strImageSource": null,
        "strIngredient1": "Bitters",
        "strIngredient2": "Gin",
        "strIngredient3": null,
        "strIngredient4": null,
        "strIngredient5": null,
        "strIngredient6": null,
        "strIngredient7": null,
        "strIngredient8": null,
        "strIngredient9": null,
        "strIngredient10": null,
        "strIngredient11": null,
        "strIngredient12": null,
        "strIngredient13": null,
        "strIngredient14": null,
        "strIngredient15": null,
        "strInstructions": "Pour the bitters into a wine glass. Swirl the glass to coat the inside with the bitters, shake out the excess. Pour the gin into the glass. Do not add ice.",
        "strMeasure1": "3 dashes ",
        "strMeasure2": "2 oz ",
        "strMeasure3": null,
        "strMeasure4": null,
        "strMeasure5": null,
        "strMeasure6": null,
        "strMeasure7": null,
        "strMeasure8": null,
        "strMeasure9": null,
        "strMeasure10": null,
        "strMeasure11": null,
        "strMeasure12": null,
        "strMeasure13": null,
        "strMeasure14": null,
        "strMeasure15": null,
        "strVideo": null
    }]
}




//  ******  URL FOR 1 RANDOM COCKTAIL  ******  //
var getRandCocktail = function() {
    getCocktails("https://the-cocktail-db.p.rapidapi.com/random.php")
};


//  ****** URL FOR 10 RANDOM COCKTAILS  ******  //
var get10RandCocktail = function() {
    getCocktails('https://the-cocktail-db.p.rapidapi.com/randomselection.php')
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


//  ****** DISPLAY COCKTAIL DATA  ****** //
var parseCocktailData = function(drinks) {
    const myDrinks = data.drinks.map(el => { // create new array 'myDrinks' and remap old JSON data
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

    displayCocktails(myDrinks);

};

const displayCocktails = (myDrinks) => {

    let modalDetails = $('<div>').attr('id', 'drinkDetails').addClass('modal-card-body').text("This is my text");



    // put together header, footer and the card for the modal and append the above content.
    let drinkModal = $('<div>').addClass('modal is-active').attr('id', 'drinkModal');
    let modalBack = $('<div>').addClass('modal-background');
    let modalCard = $('<div>').addClass('modal-card').append(
        $('<div>').addClass('modal-card-head').append(
            $('<p>').addClass('modal-card-title').text(myDrinks[0].strDrink),
            $('<button>').attr('id', 'drink-modal-close').addClass('delete').attr('aria-label', 'close')
        ),

        modalDetails,

        $('<div>').addClass('modal-card-foot').append(
            $('<button>').attr('id', 'drink-modal-close').addClass('button is-link').text('Close'),
        )
    )

    $(this).data("target");
    $("html").addClass("is-clipped");



    modalBack.append(modalCard);
    drinkModal.append(modalBack);
    // drinkContainerEl.addClass('is-active');
    // drinkContainerEl.append(drinkModal);

    //$('body').append(drinkModal);

};