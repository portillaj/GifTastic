//create an array string relating to a topic
$(document).ready(function(){


var topics = ["Mario", "Zelda", "Call of Duty", "Mass Effect", "Resident Evil", "Halo", "Final Fantasy",
			  "Gears of War", "Grand Theft Auto", "Battlefield", "Fallout 4", "Uncharted 4", "The Last of Us",
			  "Dark Souls", "Tomb Raider", "Metal Gear Solid", "Batman: Arkham Knight", "Minecraft", "Titanfall", "Skyrim"];

function myButtons() {
	for (var i = 0; i < topics.length; i++) {
		var buttons = $('<button>');
		buttons.addClass('giffy').attr('data-name', topics[i]).text(topics[i]);
		$(".button-gif").append(buttons);
	}//end for loop
}//end function

myButtons();


$(".giffy").on("click", function(){
	var gifClick = $(this).html();
	//variable for where to place the gif when click
	
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifClick + "&api_key=dc6zaTOxFJmzC";

	 $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
    	myResults = response.data;
      console.log(myResults);
    $(".display-gif").empty();

    for (var i = 0; i < myResults.length; i++) {   
   		 var imagePlacement = $(".display-gif");	
    	//grabs the object of images object from giphy and gets the ur for fixed height property
    	var displayImage = myResults[i].images.fixed_height.url; 
    	//variable that grabs the gif which is still
    	var stillImage = myResults[i].images.fixed_height_still.url;
    	var createImage = $('<img>')
    	.attr("src", stillImage)
    	.attr('data-play', displayImage)
    	.attr('data-still', stillImage);
    	imagePlacement.prepend(createImage);

    	//will display the rating of gif
    	var myRating = myResults[i].rating;
    	var displayRating = $(".rating").text("Rating: " + myRating);
    	//add the rating above each gif 
    	imagePlacement.prepend(displayRating);
    }
    }); 
});

});//end document.ready function