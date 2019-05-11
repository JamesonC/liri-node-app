LIRI Application With Node.js

What is LIRI?

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

Why this project is useful?

This project is one of the best practices on your node skills and playing around with npm and api. One of the important keys of this project is that you have to make sure you hide your api keys and secrets and never push them to GitHub or any online source.

What can LIRI search and what will it show in result?

1. Bands In Town API:
- Enter band name and returns:
- Name of the venue
- Location of the venue
- Date of the event

2. OMDB Movie API:
- Enter movie name and returns: 
- Movie Title
- Year the movie came out
- IMDB Rating of the movie
- Rotten Tomatoes Rating of the movie
- Country where the movie was produced
- Language of the movie
- Movie plot
- Actors in the movie

3. Spotify API:
- Enter song name and returns: 
- Artist(s)
- Song's name
- A preview link of the song from Spotify
- The album that the song is from

How does LIRI works?

Open your terminal and navigate to LIRI's root application file.
Within terminal enter $ node liri.js and press Enter to get a list of action command.

/Users/Jameson_C/Desktop/1.png

Then pick action commmand and input your search inquiry after that, for example: 

/Users/Jameson_C/Desktop/2.png

There is a 4th command in this app as well. This command will read the random.txt file and grab an input from there using fs npm and runs spotify API or whichever command you enter.

/Users/Jameson_C/Desktop/3.png
