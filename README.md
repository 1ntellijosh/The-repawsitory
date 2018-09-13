# The Re-PAWS-itory

## Created By: Joshua Payne, Alexis Bohlander, and Kellie Dambroso

> "Animals are such agreeable friends―they ask no questions, they pass no criticisms." ― George Eliot


## App for animal lovers to share their animal content, and if all the cuteness online isn't enough, you can access the power of PetFinder to help you adopt your very own furry friend.


### Built With:

_Node.js  
Mongoose  
Express  
AngularJS  
Hosted on Heroku  
AJAX- Allows Cross Origin response from the API  
Third party PetFinder API- Generates list of adoptable pets_

### Challenges

One obstacle we faced in this project early on was getting Youtube videos to render on the page. Youtube videos brought two issues. First, AngularJS does not like to accept content from outside domains. In order to fix this, we had to learn how to whitelist domains. The second Youtube issue was that any one Youtube video can come in various formats. This would cause problems in that each url format required a separate whitelisted url to render the video correctly, and some still wouldn't render at all. We had to do some research on Youtube urls. We found that the one thing all the url's had in common is the identifier, which is a string to identify the video. We made a method to parse every youtube url and strip only the ID string. Than we could inject the ID into a fixed whitelisted Youtube url format. Once Youtube's domain was whitelisted, and the urls were cleaned and parsed, we could play Youtube videos on the site. 

Another obstacle was the PetFinder api on the site. Unfortunately, PetFinder does not carry the CORS headers in its response packages that modern browser require in order to trust the source. Modern browsers simply won't accept the packages without CORS when it is made from an AJAX request. The HTML page in the front, however, will execute any method sent to it with a <script> tag. PetFinder supports JSONP, which sends its information in a script block, which is passed as an argument in a function. To get the PetFinder information to be accepted for render on the browser, we wrote a Javascript function to call the api from the html page. The browser than accepted the data as an argument executed the function. We were able to parse and render the data from there.

### Future Goals:

_As a user, I would love to be able to make comments  
As a user, it would be nice if I could save the posts I like  
As a user, I'd like to search the site or filter for topics I'm interested in_

### Enjoy The Re-PAWS-itory today:
https://repawsitory.herokuapp.com/

### Credits:

https://www.petfinder.com/developers/api-docs
