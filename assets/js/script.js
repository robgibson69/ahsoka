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
                        if (!data.meals) { alert('No Results Found') }
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

    let ingredientList = $('<ul>').addClass('ingredient-list');

    /*  for (let i = 0; i < ingredient.length; i++) {
          let item = $('<li>')
              .addClass('ingredient-item')
              .text(ingredient[i])
              .append(
                  $('<span>')
                  .addClass('ingredient-measure')
                  .text(measure[i])
              );

          ingredientList.append(item);
      }
      */

    ingredientList = $('<div>').addClass('ingredient-list');
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


    modalContent.append(link, pic, tube, ingredientList, instructions);

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

    /*
    YouTubePlayer(video); // this is not wrking and i dont know
    */

    /************ */
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

const YouTubePlayer = (src) => {

    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    var player;

    function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: src,
            playerVars: {
                'playsinline': 1
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
        event.target.playVideo();
    }

    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    var done = false;

    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
            setTimeout(stopVideo, 6000);
            done = true;
        }
    }

    function stopVideo() {
        player.stopVideo();
    }

}

$('#ingredientSearch').on('keypress', (e) => {
    if (e.key === 'Enter') {
        $('#searchBtn').click();
    }
});

document.addEventListener('click', (e) => {
    if (e.target.id === "searchBtn") {
        searchByIngredient();
    } else {
        // alert(e.target.id);
    }
});