var topic = ["Wonder Woman", "Thor", "Spider Man", "Black Panther"];


function initializeScreen() {
  console.log(topic);
  $("#idButtonDiv").empty();
  for (var i = 0; i < topic.length; i++) {
    var newButton = $("<button>");
    newButton.attr("data-Name", topic[i]);
    newButton.addClass("clsButton");
    newButton.text(topic[i]);
    $("#idButtonDiv").prepend(newButton);
  }
}

$(document).ready(function () {
  

initializeScreen();
console.log("goingaroundloop");
  $("#hero").on("click", function () {

    event.preventDefault();
    console.log("addbutton");
    if ($("#ShowInput").val() != '') {
      console.log($("#hero-input").val());
      topic.push($("#hero-input").val());
      $("#hero-input").val("");
      initializeScreen();
    }
  });

  $(document).on("click", ".clsButton", function () {

    $("#idGiphysDiv").empty();
    var topicName = $(this).attr("data-Name");
    console.log(topicName);
    loadGiphys(topicName);

  });

    function loadGiphys(topic) {

      var queryQRL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=ec39TgeqepD5nsT1yMc0XmDComzJ8p63";
      console.log(queryQRL);

    $.ajax({
      url: queryQRL,
      method: "GET"
    }).done(function (response) {
      var results = response.data;
        console.log(results);
        console.log(results.length);
        if (results.length > 0) {

      for (var i = 0; i < results.length; i++) {

      var gifDiv = $("<div class='clsImgDiv'>");

      var rating = results[i].rating;

      var p = $("<p style='margin-bottom:0%'>").text("Rating: " + rating.toUpperCase());

      var ShowImage = $("<img>");
      ShowImage.addClass("clsImage");
      ShowImage.attr("data-animated", "false");
      ShowImage.attr("data-url-non-animated", results[i].images.fixed_height_still.url);
      ShowImage.attr("data-url-animated", results[i].images.fixed_height.url);

      ShowImage.attr("src", results[i].images.fixed_height_still.url);
      console.log(results[i]);

      gifDiv.prepend(ShowImage);
      gifDiv.prepend(p);

      $("#idGiphysDiv").prepend(gifDiv);     
        }
      }
    });
  }

    $("#idGiphysDiv").on("click", ".clsImage", function () {

      var animatedState = $(this).attr("data-animated");
      var animatedURL = $(this).attr("data-url-animated");
      var nonanimatedURL = $(this).attr("data-url-non-animated");
      if (animatedState === "false") {
        $(this).attr("data-animated", "true");
        $(this).attr("src", animatedURL);
        
      } else {
        $(this).attr("data-animated", "false");
        $(this).attr("src", nonanimatedURL);
      }

    });

});
