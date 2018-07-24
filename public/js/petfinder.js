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
		var url = 'https://api.petfinder.com/pet.find';

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
				var pet = [];


for(let i=0;i<=10;i++){
				var petName = 'Click here to check out ' +  response.petfinder.pets.pet[i].name['$t'] + '!';

				var img = null
				if (response.petfinder.pets.pet[i].media.photos !==undefined){
					img=response.petfinder.pets.pet[i].media.photos.photo[0].$t
				}else{
					img= ""
				}

				var id = response.petfinder.pets.pet[i].id.$t;
				var description= response.petfinder.pets.pet[i].description.$t;
				var sex= response.petfinder.pets.pet[i].sex.$t;
				var age= response.petfinder.pets.pet[i].age.$t;
				var contact= response.petfinder.pets.pet[i].contact.email.$t;
        var city = response.petfinder.pets.pet[i].contact.city.$t;
        var address = response.petfinder.pets.pet[i].contact.address1.$t;
        var phone = response.petfinder.pets.pet[i].contact.phone.$t;
        var state = response.petfinder.pets.pet[i].contact.state.$t;

				var newName = document.createElement('a');
        newName.setAttribute("id", "petName");
				var newDiv = document.createElement('div');
				newName.textContent = petName;
				newName.href = 'https://www.petfinder.com/petdetail/' + id;

				var newDescription= document.createElement('p');
				newDescription.textContent = description;
        newDescription.setAttribute("id", "petDesc");

				var newSex= document.createElement('p');
				newSex.textContent = sex + " "+ age;

        var newLoc = document.createElement('p');
        newLoc.textContent = city + ', ' + state;

        var newAdd = document.createElement('p');
        newAdd.textContent = address;

        var newPhone = document.createElement('p');
        newPhone.textContent = 'call: ' + phone;

				var newContact= document.createElement('a');
				newContact.textContent = contact;
				newContact.href = "mailto:" + contact

				var newImg = document.createElement('img');
				newImg.src = img;

				var list = document.createElement("div");
				list.setAttribute("id", "List");
				var listDiv = document.getElementById("adoptResults");
				listDiv.appendChild(list);

				newDiv.appendChild(newName);
				list.appendChild(newDiv);
				list.appendChild(newSex);
        list.appendChild(newLoc);
        list.appendChild(newAdd);
				list.appendChild(newImg);
				list.appendChild(newDescription);
        list.appendChild(newPhone);
				list.appendChild(newContact);
			}
		}
		});
		})

}
