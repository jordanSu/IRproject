$('.clear-button').on('click', function(event) {
    textarea = $(event.target).parent().parent().siblings("textarea");
    textarea.val("");
});

$('.submit-button').on('click', function(event) {
    category = $(event.target).parent().parent().parent().attr('id');
    content = $(event.target).parent().parent().siblings("textarea").val();

    //url = "http://140.112.106.232:16881/hello"
    url = "http://localhost:5000/register";
    console.log('ajax send');
    $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify({"category": category, "content": content}),
        contentType: "application/json"
    }).success(function(data){
            $('#picker').attr('disabled', false);
            $('#picker').data('selectpicker').$button.focus();
            resp_data = JSON.parse(data);
            sentences = resp_data.sentences_list;

            console.log(sentences);
            for(var i in sentences) {
                thisone = "<option>" + sentences[i].trim() + "</option>";
                $('#picker').append(thisone);
            }
            $('.selectpicker').selectpicker('refresh');
            $('.pick-button').attr('disabled', false);

    });
});
/*
$("#picker").on('shown.bs.select', function() {
    $('div.dropdown-menu').css('overflow', 'scroll');
})
*/
$(".pick-button").on('click', function() {
    $(this).attr("disabled", true);
    $("#picker").attr("disabled", true);
    $('#link').attr('disabled', false);
    $('#post').attr('disabled', false);
    $('.fb-button').attr('disabled', false);
    $('.selectpicker').selectpicker('refresh');
    selected = $("#picker").find("option:selected");

    for (var i=0; i<selected.length; i++) {
        $("#post").val(function(j, val) {
            return val + selected[i].innerText + "\n";
        });
    }
});

$(".fb-button").on('click', function(event) {
    FB.login(function(){
        FB.api('/me/feed', 'post', {
            message: $("#post").val(),
            link: 'https://developers.facebook.com/docs/'
        });
    }, {scope: 'publish_actions'});
});
