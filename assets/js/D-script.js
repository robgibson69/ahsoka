/*** CHANGES TO PAGE  */
const addLogoToIngSearch = () => {
    $('#searchOutput').append($("<div id='LOGO'>").text(' '));

};
addLogoToIngSearch();

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
    $("<div class='nav-item button is-pink'>").text('Random').attr('id', 'randoBtn').appendTo(elOut);
    $("<div class='nav-item button is-warning'>").text('Grocery List').attr('id', 'grocery-nav').appendTo(elOut);


};
addRightCol();
/*   END OF CHANGES TO PAGE */


/***** GROCERYLIST */
const listenForIngredientClicks = () => {

    $('.addList').click(function() {

        $.each($("input[class='food']"), function() {
            groceryList.push($(this).val());
            this.checked = true;
        });
        //console.log(groceryList)
        localStorage.setItem("grocerylist", JSON.stringify(groceryList));
    })

    $('.food').click((e) => {
        if (e.target.checked) groceryList.push($(e.target).val());
        else {
            // check grocerylist for target.val()
            $(groceryList).each((i, item) => {
                if (item.name === $(e.target).val()) {
                    displayModal('found in list');
                    //remove if found
                    groceryList.splice(i, 1); // remove

                }
            });

        }
        localStorage.setItem("grocerylist", JSON.stringify(groceryList));
    })

};

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
};

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


const searchByRecipe = (searchString) => {

    /****** */
    // testing without api call
    if (!makeAPICalls) {
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

/***  MODAL ALERTS */

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

/**** END OF MODAL ALERTS */


/**** INGREDIENT LIST */

const ingredientToGroceryListener = () => {
    $('input.checkbox').on('change', (e) => {
        let removeList = [];
        if (e.target.checked) {
            // if checked add to grocerylist
            groceryList.push(e.target.id);

            // remove duplicates
            //code here

            $(groceryList).each((idx, item) => {
                //console.log(item)
                //duplicateArray.push(item.name || item)
                $(groceryList).each((x, ite) => {
                    if (((item.name || item) === (ite.name || ite)) && x != idx) {
                        //console.log((item.name || item) + idx + " == " + (ite.name || ite) + x);
                        //groceryList.splice(x, 1)
                        removeList.push(x);

                    } else if (x != idx) {
                        //console.log((item.name || item) + " ne " + (ite.name || ite))
                    }
                });
            });

            $(removeList).each((idx, item) => {
                    // go through the remove list and remove the corresponding entry from grocerylist  
                    // keeping in mind that the index will shift down with each item removed
                    groceryList.splice(item - idx, 1);
                    console.log(item - idx);
                })
                //console.log(groceryList);
                //*** ABOVE NOT WORKING GOOD */
                /* REMOVES ALL INSTANCES WHEN DUP FOUND */

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

/**** END OF INGREDIENT *****/