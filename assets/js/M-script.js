// var groceryList = JSON.parse(localStorage.getItem("grocerylist")) || [];
//var faveList = JSON.parse(localStorage.getItem("favourites")) || [];

/*const displayGroceryList = () => {

    //clear existing list
    // need to make a container for the list seperate from the buttons so this will work
    // $('#grocerylist').empty();

    if (groceryList) {
        for (let i = 0; i < groceryList.length; i++) {
            var buyItem = $('<input>').addClass('checkbox').attr('type', 'checkbox').attr('id', groceryList[i]);
            var specificBuyItem = $('<label>').attr('for', groceryList[i]).addClass('groceryList-item').addClass('checkbox').text(groceryList[i]);

            $('#grocerylist').append(buyItem, specificBuyItem);
        }
    } else {
        $('#grocerylist').append("EMPTY");
    }

}*/

// const listenForIngredientClicks = () => {

//     $('.addList').click(function () {
//         displayModal('add all to list!!')
//         $.each($("input[class='food']"), function () {
//             // groceryList.push($(this).val());
//             this.checked = true;
//         });
//     })

// };

/*
const listenForIngredientClicks = () => {

    $('.addList').click(function() {

        $.each($("input[class='food']:checked"), function() {
            groceryList.push($(this).val());
        });
        //console.log(groceryList)
        localStorage.setItem("grocerylist", JSON.stringify(groceryList));
    })

    $('.food').click((e) => {
        groceryList.push($(e.target).val());
        localStorage.setItem("grocerylist", JSON.stringify(groceryList));
    })

}

*/

// //opens sidebar from main nav
// function openNav() {
//     displayGroceryList();
//     $("#grocerylist").css({ 'left': '0' });

// }

// //close sidebar
// function closeNav() {
//     $("#grocerylist").css({ 'left': '-250px' });
// }


// const addFavourite = (meal) => {
//     $('.fave').click(function() {

//         faveList.push(meal);
//         console.log(faveList);
//         localStorage.setItem('favourites', JSON.stringify(faveList));

//     })
// };

// const logoHomeBtn = () => {
//     $('#header-logo').click(function(){
//         $('#ingredient-nav').click();
//     })
// }

// const displayFavHomepge = () =>{
    
//     for (let i = 0; i < faveList.length; i++) {
//         let favMealName = faveList[i].strMeal
//         // console.log(faveList[i]);
//         let fave = $("<button>").text(favMealName).addClass('favMealName button is-primary').css({'display':'block', 'margin':'10px'});
//         $('#left-column').append(fave);
        
//         $('.favMealName').click(function() {
//         //    console.log(faveList[i]);
//            displayRecipe(faveList[i]);
//         });
//     };
    
// }
