var topics =["Space","Solar System","NASA","Astronaut","Planets"];

        $("#addspace").on("click", function(event){
            event.preventDefault();
            var topic = $("#space-input").val().trim();
            topics.push(topic);
            renderButtons();
        });
    
        
        function renderButtons() {
            $("#buttons").empty();
    
            for (var i = 0; i < topics.length; i++) {
                var b = $("<button class='btn btn-light'>");
                b.addClass("topic");
                b.attr("data-name", topics[i]);
                b.text(topics[i]);
                $("#buttons").append(b);
            }
        };
    
        $(document).on("click",".topic", DisplayGifs);
        renderButtons();


        function DisplayGifs() {
        divclear();
        var explore = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + explore + "&api_key=HLhYuyflVhIUPgLKHnmvGUCD4xsxUpk7"

        $.ajax({
            url:queryURL,
            method:"GET"
        })

            .then(function(response) {
                console.log(queryURL);
                console.log(response);
                var results = response.data;

                for (var i = 0; i < 10; i++) {
                    var spaceDiv = $("<div class='col'>")
                    var p = $("<p>").text("Rating: " + results[i].rating);
                    var spaceImage = $("<img>");
                    spaceImage.attr("src", results[i].images.fixed_height_still.url);
                    spaceImage.addClass("gif");
                    spaceDiv.append(spaceImage);
                    spaceDiv.append(p);
                    $("#gifs").append(spaceDiv);
                }
            })
    };
    

    function divclear() {
        $("#gifs").empty();
    }

    $('body').on("click", '.gif' ,function() {
        var src = $(this).attr("src");
        if ($(this).hasClass('playing')) {
            $(this).attr("src", src.replace(/\.gif/i, "_s.gif"));
            $(this).removeClass('playing');
        } else {
            $(this).addClass('playing');
            $(this).attr('src', src.replace(/\_s.gif/i, ".gif"));
        }
    });