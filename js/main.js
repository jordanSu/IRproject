$('.clear-button').on('click', function(event) {
    textarea = $(event.target).parent().parent().siblings("textarea");
    textarea.val("");
});

$('.submit-button').on('click', function(event) {
    category = $(event.target).parent().parent().parent().attr('id');
    content = $(event.target).parent().parent().siblings("textarea").val();

    switch(category) {
        case "health":
            url = "http://140.112.106.232:16881/health";
            break;
        case "politics":
            url = "http://140.112.106.232:16881/politics";
            break;
        case "technology":
            url = "http://140.112.106.232:16881/technology";
            break;
    }
    console.log('ajax send');
    $.ajax({
        url: url,
        type: "POST",
        data: {"category": category, "content": content},
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        success: function(data){
            $('#picker').removeAttr('disabled', false);
            $('.selectpicker').selectpicker('refresh');
            $('#link').attr('disabled', false);
            $('#post').attr('disabled', false);
            sentences = data.split("\n");
            for(var sentence in sentences) {
                thisone = "<option>" + sentence + "</option>";
                $('#picker').append(thisone);
            }
        }
    });
});

$(".fb-button").on('click', function(event) {
    FB.ui({
        method: 'feed',
        link: 'https://developers.facebook.com/docs/',
        message: "Oh no"
    }, function(response){});
});
