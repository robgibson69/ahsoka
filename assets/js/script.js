// this is a javascript file

const searchByIngredient = (searchString) => {

    searchString == '' ? searchString = 'toast' : null;

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
                    })
            } else {
                alert("ERROR!");
            }
        })
        .catch(err => {
            console.error(err);
        });

}