![ytpv logo](/logo.PNG)

# youtube playlist video maker

A web app that allows you to create and download your own playlist videos (e.g. https://www.youtube.com/watch?v=QJJqm5cClxk) by combining multiple youtube videos into one.

Technologies used:

- Backend: Python, Flask, Moviepy, yt-dlp, Pillow, Youtube API

- Frontend: JavaScript, React

- Hosting: Azure, Docker

Check it out for yourself: ~~https://ytpv.azurewebsites.net/~~ link doesn't work anymore because I ran out of credits :(

# How to use ytpv

1. paste youtube video or playlist links into search bar
2. drap and drop cards to select order
3. change title/artist names
4. add video background image
5. click create
6. wait for video to be created and click download

# How to install and run dev environment locally

1. clone project from github
2. cd into frontend/playlist-maker-frontend
3. run `npm install`
4. run `npm start`
5. cd into backend
6. run `pip install -r requirements.txt`
7. run `python app.py`

frontend will be running on localhost:3000 and backend will be on localhost:5000
