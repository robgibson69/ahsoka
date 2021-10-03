const data = {
    "drinks": [
        {
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
        }
    ]
}


// ******  GET RANDOM COCKTAIL  ****** //
var getRandCocktail = function() {
    // fetch("https://the-cocktail-db.p.rapidapi.com/random.php", {
    //     "method": "GET",
    //     "headers": {
    //         "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
    //         "x-rapidapi-key": "9fbe0f4555msh10b0fd4cdc4f9abp142f2djsn3d0f0dff927e"
    //     }
    // })
    //     // if repsonse is ok send data to displayCocktailData(drink)
    //     .then(function(response) {
    //         if (response.ok) {
    //             response.json().then(function(data) {
           console.log(data.drinks);
               displayCocktailData(data.drinks);
                // })
        //     // if there is a response error
        //     } else {
        //         console.error("Response Failed");
        //         alert("Bad Response");
        //     }
        // })
        
        // // if there is a fetch error
        // .catch(err => {
        //     console.error("Fetch Failed");
        //     alert("Failed to get information. Make sure you are connected to the internet.");
        // });
};


//  ****** DISPLAY COCKTAIL DATA  ****** //
var displayCocktailData = function(drinks) {
    const result = data.drinks.map(el => {
        let details = { // default object
            "strIngredients": [],
            "strMeasures": []
        }
        Object.keys(el).forEach(key => {
           if(key.startsWith('strIngredient')){
               if(el[key]) // prevent ""
                   details.strIngredients.push(el[key])
           } else if(key.startsWith('strMeasure')) {
               if(el[key]) // prevent ""
                   details.strMeasures.push(el[key])
           } else {
               details[key]=el[key]
           }
        })
        
        return details
    })
    
    console.log(result);
    console.log(result[0].strDrink);
    console.log(result[0]);

};


displayCocktailData(); 