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