//create an array string relating to a topic


var topics = ["Mario", "Zelda", "Call of Duty", "Mass Effect", "Resident Evil", "Halo", "Final Fantasy",
			  "Gears of War", "Grand Theft Auto", "Battlefield", "Fallout 4", "Uncharted 4", "The Last of Us",
			  "Dark Souls", "Tomb Raider", "Metal Gear Solid", "Batman: Arkham Knight", "Minecraft", "Titanfall", "Skyrim"];


//function that displays the buttons on the screen
function myButtons() {
	for (var i = 0; i < topics.length; i++) {
		var buttons = $('<button>');
		buttons.addClass('giffy').attr('data-name', topics[i]).text(topics[i]);
		$(".button-gif").append(buttons);
	}//end for loop
}//end function


myButtons();
myGif();

//function that call the Giphy API
function myGif() {
$(".giffy").on("click", function(){
	var gifClick = $(this).html(); //will get get the data-value of the gif and it will insert it to api variable
	//variable for where to place the gif when click
	
	var api = "http://api.giphy.com/v1/gifs/search?q=" + gifClick + "&limit=10&rating=pg-13&api_key=dc6zaTOxFJmzC";

	 $.ajax({
      url: api,
      method: 'GET'
    }).done(function(response) {
    	myResults = response.data;
      console.log(myResults);
    $(".display-gif").empty();

    //for loop that displays gifs on the screen when click..result is 25 gifs.
        for (var i = 0; i < myResults.length; i++) {
            var gameDiv = $("<div>");
            gameDiv.addClass("my-giffy");
            var gifRating = $("<p>");
            gifRating.addClass("rating");
            gifRating.text("Rating: " + myResults[i].rating);   
       		 var imagePlacement = $(".display-gif");
             imagePlacement.append(gameDiv);	
        	 //grabs the object of images object from giphy and gets the ur for fixed height property
        	 var displayImage = myResults[i].images.fixed_height.url; 
        	 //variable that grabs the gif which is still
        	 var stillImage = myResults[i].images.fixed_height_still.url;
        	 var createImage = $('<img>').addClass("gif-image")
        	 .attr("src", stillImage)
        	 .attr('data-play', displayImage) //this will play the gif
             .attr('data-still', stillImage); //the current state of gif when added to screen is still

            //add rating and gif to div
            gameDiv.prepend(createImage);  
            gameDiv.prepend(gifRating); 
        }//end for loop

        //when the gif is clicked
        $(".gif-image").on("click", function(){
              var gifState = $(this).attr('data-state'); //current state is still
            if(gifState === 'still'){
               $(this).attr('src', ($(this).data('still'))); //when clicked state will play gif
                $(this).attr('data-state', 'play'); //gif will play
            }else{
                 $(this).attr('src', ($(this).data('play'))); //when clicked, state will be still if gif is playing
                 $(this).attr('data-state', 'still'); //gif will become still
           }//end else
        });//end click function

    });//end ajax function

});//end button click function
}//end function

//when a value is entered in the search field and it is added to the array
$(".search-button").on("click", function(){
    var gifClick = $(this).html();
    //variable for where to place the gif when click
    var api = "http://api.giphy.com/v1/gifs/search?q=" + gifClick + "&limit=10&rating=pg-13&api_key=dc6zaTOxFJmzC";
             var search = $(".search-input");
        //if search field is empty, it will prompt the user to put something in
        if(search.val() === ''){
            alert("you did not enter anything in the search bar, try again");
        }else{
                var newButton = $("<button>");
                var display = newButton.addClass('giffy').attr('data-name', search.val()).text(search.val());
                $(".button-gif").append(display); //append the new button to the gif section
                search.val(''); //the search bar will empty
                myGif();//when the new button is added it will run the myGif() function to use Giphy api
        }//end else
});//end click
