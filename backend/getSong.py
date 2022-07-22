import subprocess
import requests
import os
from dotenv import load_dotenv

load_dotenv()
key = os.getenv('YOUTUBE_KEY')


def getSong(query, uuid):
    querySplit = query.split()

    response = requests.get(
        f'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q={query}&key={key}')

    # print(response.json())

    for item in response.json()['items']:
        print(item['snippet']['title'])
        if all(x in item['snippet']['title'] for x in querySplit):
            subprocess.run(
                ["yt-dlp.exe", f'-o "./audio/{uuid}/%(id)s.%(ext)s"', "-f bestaudio", item['id']['videoId']], shell=True)
            break

    folder = "./ ##/audio/" + str(uuid) + "/"

    for file_name in os.listdir(folder):

        print(file_name[-4:])

        if file_name[-4:] == 'webm':
            continue

        source = folder + file_name

        new = folder + file_name[:-5] + "webm"

        os.rename(source, new)


def getSongLink(link, uuid):
    try:
        subprocess.run(
            ["yt-dlp.exe", f'-o "./audio/{uuid}/%(id)s.%(ext)s"', "-f bestaudio", link], shell=True)
    except:
        print("invalid link")

    folder = "./ ##/audio/" + str(uuid) + "/"

    for file_name in os.listdir(folder):

        print(file_name[-4:])

        if file_name[-4:] == 'webm':
            continue

        source = folder + file_name

        new = folder + file_name[:-5] + "webm"

        os.rename(source, new)


# getSongLink("om/watch?v=oBpaB2YzX8s")

def getSongInfo(query):

    response = requests.get(
        f'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q={query}&key={key}')

    videoID = query[-11:]
    videoLink = "https://youtu.be/" + videoID

    title = ''
    artist = ''
    thumbnail = ''

    for item in response.json()['items']:
        searchVideoID = item['id']['videoId']
        if searchVideoID == videoID:
            title = item['snippet']['title']
            artist = item['snippet']['channelTitle']
            thumbnail = item['snippet']['thumbnails']['default']['url']
            break

    info = {
        "title": title,
        "artist": artist,
        "id": videoID,
        "link": videoLink,
        "thumbnail": thumbnail
    }

    # print(info)

    return info
