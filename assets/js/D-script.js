/*** CHANGES TO PAGE  */
const addLogoToIngSearch = () => {
    $('#searchOutput').append(
        $('<div>')
        .css('max-width', '800px')
        .css('width', '100%')
        .css('margin-top', '5rem')
        .css('background-image', "url('./assets/images/logo1.png')")
        .css('background-size', 'contain')
        .css('background-repeat', 'no-repeat')
    );
};
addLogoToIngSearch();

$('#header-logo')
    .empty()
    .append("<img src='./assets/images/logo1.png'>")
    .css("img{ height:80px;}")

/*   END OF CHANGES TO PAGE */


/***** GROCERYLIST */

const displayGroceryList = () => {

    // clear existing list
    $('#grocerylist-list').empty();

    if (groceryList) {

        for (let i = 0; i < groceryList.length; i++) {
            var chkBox = $('<input>').addClass('checkbox grocery-list-item').attr('type', 'checkbox').attr('id', groceryList[i]);
            var label = $('<label>')
                .attr('for', groceryList[i])
                .addClass('grocery-list-item checkbox')
                .text(groceryList[i])

            $('#grocerylist-list').append(
                $("<div class='cont'>").append(chkBox, label).css('order', '0')
            );
        }
        let removeBtn = $('<button>')
            .addClass('button is-danger is-small')
            .text('Remove Collected')
            .css('order', '3')
            .css('margin-top', 'auto');
        $('#grocerylist-list').append(
            $("<div class='div'>").text('Collected Items').css('order', '1'),
            removeBtn
        );

    } else {
        $('#grocerylist-list').append("EMPTY");
    }
}


$('#grocerylist-list').on('click', 'input.checkbox', (e) => {

    if (e.target.closest('.cont').style.order == '0')
        e.target.closest('.cont').style.order = '2';
    else
        e.target.closest('.cont').style.order = '0';
});

$('#grocerylist-list').on('click', 'button.is-danger', (e) => {

    $("div.cont").each((idx, el) => {

        if (el.style.order == '2') {
            alert('remove ' + $(el).children('input').attr('id'))
            console.log(el)
        }


    });

});

/** END OF GROCERY LIST */