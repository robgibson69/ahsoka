var groceryList = JSON.parse(localStorage.getItem("grocerylist")) || [];

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

const listenForIngredientClicks = () => {

    $('.addList').click(function() {
        // console.log("Clicked by User")
        // var groceryList = [];
        $.each($("input[name='food']:checked"), function() {
            groceryList.push($(this).val());
        });
        console.log(groceryList)
        localStorage.setItem("grocerylist", JSON.stringify(groceryList));
    })

}

//opens sidebar from main nav
function openNav() {
    displayGroceryList();
    document.getElementById("grocerylist").style.left = "0";

}

//close sidebar
function closeNav() {
    document.getElementById("grocerylist").style.left = "-250px";
}