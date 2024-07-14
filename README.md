![ytpv logo](/logo.PNG)

# youtube playlist video maker

A web app that allows you to create and download your own playlist videos (e.g. https://www.youtube.com/watch?v=QJJqm5cClxk) by combining multiple youtube videos into one.

Technologies used:

- Backend: Firebase Functions, ffmpeg, yt-dlp, Youtube API

- Frontend: NextJS, TypeScript

- Hosting: Vercel

Check it out for yourself: https://ytpv.vercel.app/

Or scroll down for a [demo video](#demo)

# How to use ytpv

1. Search for songs using the search bar (searches yt for corresponding song)
2. add video background image
3. click create
4. wait for video to be created and click download

# Future

Some things I want to add/working on (in no particular order):

- drag and drop songs for ordering
- changing song title and artist name on frontend
- user auth to allow for videos to be saved to profile
- progress bar
- see if possible to optimize backend to use less memory

# Demo

Website demo

<video width="600" controls>
  <source src="./videos/demo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

Sample output

<video width="600" controls>
  <source src="./videos/output.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
