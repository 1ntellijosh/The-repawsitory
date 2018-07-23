console.log('called');

var apiKey = '40cd84ccc829ff498eef92970e909146'; // assign our key to a variable, easier to read

// the next line and function set up the button in our html to be clickable and reactive
document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons(){
	document.getElementById('submitAQuery').addEventListener('click', function(event){
    console.log('called');
		event.preventDefault();
		var zip = document.getElementById('zip').value; // this line gets the zip code from the form entry
    var spec = document.getElementById('aspecies').value; // this line gets the zip code from the form entry
		var url = 'http://api.petfinder.com/pet.find';

		// Within $.ajax{...} is where we fill out our query
		$.ajax({
			url: url,
			jsonp: "callback",
			dataType: "jsonp",
			data: {
				key: apiKey,
				'animal': spec,
				'location': zip,
				output: 'basic',
				format: 'json'
			},
			// Here is where we handle the response we got back from Petfinder
			success: function( response ) {
				console.log(response); // debugging
				var petName = response.petfinder.pets.pet[0].name['$t'];
				var img = response.petfinder.pets.pet[0].media.photos.photo[0].$t;
				var id = response.petfinder.pets.pet[0].id.$t;

				var newName = document.createElement('a');
				var newDiv = document.createElement('div');
				newName.textContent = petName;
				newName.href = 'https://www.petfinder.com/petdetail/' + id;

				var newImg = document.createElement('img');
				newImg.src = img;

				var list = document.createElement("div");
				list.setAttribute("id", "List");
				var listDiv = document.getElementById("adoptResults");
				listDiv.appendChild(list);

				newDiv.appendChild(newName);
				list.appendChild(newDiv);
				list.appendChild(newImg);
			}
		});
		})

}
