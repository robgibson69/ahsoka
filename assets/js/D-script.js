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
    $('#add-grocery-item').val('').css('opacity', '0').hide();

    if (groceryList) {

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
                chkBox.attr('checked', '')
            }

            $('#grocerylist-list').append(
                $("<div class='cont'>").append(chkBox, label).css('order', itemOrder)
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

const addGroceryItem = () => {
    if ($('#add-grocery-item').val()) {

        let item = $('#add-grocery-item').val();
        groceryList.push(item);
        localStorage.setItem("grocerylist", JSON.stringify(groceryList));
        displayGroceryList();
    } else {
        $('#add-grocery-item').val('').css('opacity', '0').hide();
    }
}

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

$('#grocerylist-list').on('click', 'input.checkbox', (e) => {

    let idx = $(e.target).attr('id');

    if ($(e.target).next('.deletable')[0]) {
        groceryList.splice(idx, 1);
        localStorage.setItem("grocerylist", JSON.stringify(groceryList));
        displayGroceryList();

    } else if (e.target.closest('.cont').style.order == '0') {
        e.target.closest('.cont').style.order = '2';

        groceryList[idx].status = 1;

    } else {
        e.target.closest('.cont').style.order = '0';

        groceryList[idx].status = 0;
    }

    localStorage.setItem("grocerylist", JSON.stringify(groceryList));
});

$('#grocerylist-list').on('click', 'button.is-danger', (e) => {

    $("div.cont").each((idx, el) => {

        if (el.style.order == '2') {
            let idx = $(el).children('input').attr('id');
            $(el).remove();
            groceryList.splice(idx, 1);
            localStorage.setItem("grocerylist", JSON.stringify(groceryList));
        }

    });

});

/** END OF GROCERY LIST */