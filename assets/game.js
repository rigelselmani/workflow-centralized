$(document).ready(function(){
    var players = ["ronaldo","messi","hazard","neymar","bebeto"];
     
    function displayGif(){
       
        var player = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +  player + "&api_key=dc6zaTOxFJmzC&limit=10";
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
    
          var results = response.data;
          for(var j =0;j<results.length;j++){
            var displayDiv = $("<div>");
            displayDiv.addClass("player-name");
            var image = $("<img>");
            image.attr("src", response.data[j].images.original_still.url);
            image.attr("data-still", response.data[j].images.original_still.url);
            image.attr("data-animate", response.data[j].images.original.url);
            image.attr("data-state", "still");
            image.attr("class", "gif");
            displayDiv.append(image);
            var rating = $('<p>').text('Rating: ' + results[j].rating.toUpperCase());
        
            var title = $('<p>').text('Title: ' + results[j].title.toUpperCase());
    
            displayDiv.append(rating);
            displayDiv.append(title);
            displayDiv.append(image);
            $("#player-view").prepend(displayDiv);
    
          }
    
        
    
    });
    };
    function renderButtons(){
    
        $(".display-buttons").empty();
    
        for (var i = 0; i < players.length; i++){
    
            var a = $("<button>");
            a.addClass("topic");
            // Adding a class for styling
            a.addClass("btn btn-lg");
            // Adding a data-attribute
            a.attr("data-name", players[i]);
            // adding attr for Bootstrap
            a.attr("type", "button");
            // Button Text
            a.text(players[i]);
            // Adding the Button to the Buttons Div
            $(".display-buttons").append(a);
        }
    }
    function playGif() {
    
        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");
    
        if(state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        }
    
        else if(state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }
    }
    $("#subPress").on("click",function(event){
        event.preventDefault();
        var inputPlayer =$("#player-input").val().trim();
        players.push(inputPlayer);
        $("form").trigger("reset")
        renderButtons();
        return false;
        
    
    });
    renderButtons();
    
    $(document).on("click", ".topic",displayGif)
    // Click on the Gif image to animate or make it still
    $(document).on("click", ".gif", playGif)
    });