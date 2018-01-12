$('.clear-button').on('click', function(event) {
    textarea = $(event.target).parent().parent().siblings("textarea");
    textarea.val("");
});

$('.submit-button').on('click', function(event) {
    category = $(event.target).parent().parent().parent().attr('id');
    content = $(event.target).parent().parent().siblings("textarea").val();

    switch(category) {
        case "health":
            url = "http://140.112.106.232:16881/hello";
            //url = "http://localhost:16881"
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
        data: "okok",//JSON.stringify({"category": category, "content": content}),
        contentType: "text/plain"   //"application/json"
    }).done(function(data){
            $('#picker').removeAttr('disabled', false);
            $('#link').attr('disabled', false);
            $('#post').attr('disabled', false);
            sentences = data.split("\n");
            console.log(sentences);
            for(var i in sentences) {
                thisone = "<option>" + sentences[i] + "</option>";
                $('#picker').append(thisone);
            }
            $('.selectpicker').selectpicker('refresh');
    });
});

$(".pick-button").on('click', function() {
    $(this).attr("disabled", true)
    $("#picker").attr("disabled", true)
    $('.selectpicker').selectpicker('refresh');
    selected = $("#picker").find("option:selected")

    for (var i=0; i<selected.length; i++) {
        $("#post").val(function(j, val) {
            return val + selected[i].innerText + "\n";
        });
    }
})

$(".fb-button").on('click', function(event) {
    FB.ui({
        method: 'feed',
        link: 'https://developers.facebook.com/docs/',
        caption: 'An example caption',
    }, function(response){});
});

$(".new-fb-button").on('click', function(event) {
    FB.ui()
})
