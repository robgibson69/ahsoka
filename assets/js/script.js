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

            $('#searchOutput').append(card);
        });
    }
}

document.addEventListener('click', (e) => {
    if (e.target.closest('div').matches('.meal-container')) {
        alert('recipe clicked ' + $(e.target).closest('div').attr('data-mealID'));
        return;
    } else if (e.target.id === "searchBtn") {
        searchByIngredient();
    } else {
        // alert(e.target.id);
    }

});

//opens sidebar from main nav
function openNav(){
    document.getElementById("grocerylist").style.cssText = "width:250px; transition:1";
}

//close sidebar
function closeNav(){
  document.getElementById("grocerylist").style.width = "0";
}


//collect all the ingredients that we dont have (checks)

//to do that we need to display
//strIngredient
function grocerylis(){
    //get ingredient array
    //if ingredient array is selected 
   var checkedIngredients = $("input:checkbox[name=type]:checked").each(function(){
        yourArray.push($(this).val());
    });
    
};

  //make them input checklist elements

  //append them to grocerylist