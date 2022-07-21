import subprocess, requests, os


# AIzaSyClNK9kcOd2y33erpep1tcFipxw2y6D7tU

#.\yt-dlp.exe -o "./audio/%(title)s-%(id)s.%(ext)s" -f bestaudio https://www.youtube.com/watch?v=Sv6dMFF_yts

#subprocess.run(["yt-dlp.exe", '-o "./audio/%(title)s-%(id)s.%(ext)s"', "-f bestaudio", "https://www.youtube.com/watch?v=Sv6dMFF_yts"], shell=True)


#GET https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=keshi&key=[YOUR_API_KEY] HTTP/1.1

# key = "AIzaSyClNK9kcOd2y33erpep1tcFipxw2y6D7tU"
# query = input('query string: ')

# querySplit = query.split()

# response = requests.get(f'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q={query}&key={key}')

# #print(response.json())

# for item in response.json()['items']:
#     print(item['snippet']['title'])
#     if all(x in item['snippet']['title'] for x in querySplit):
#         subprocess.run(["yt-dlp.exe", '-o "./audio/%(title)s-%(id)s.%(ext)s"', "-f bestaudio", item['id']['videoId']], shell=True)
#         break

# folder = r' ##\audio\\'

# for file_name in os.listdir(folder):

#     print(file_name[-4:])

#     if file_name[-4:] == 'webm':
#         continue

#     source = folder + file_name

#     new = folder + file_name[:-5] + "webm"

#     os.rename(source, new)

# for scale up need users to add own api key

# just copy youtube link

def getSong(query, uuid):
    key = "AIzaSyClNK9kcOd2y33erpep1tcFipxw2y6D7tU"

    querySplit = query.split()

    response = requests.get(f'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q={query}&key={key}')

    #print(response.json())

    for item in response.json()['items']:
        print(item['snippet']['title'])
        if all(x in item['snippet']['title'] for x in querySplit):
            subprocess.run(["yt-dlp.exe", f'-o "./audio/{uuid}/%(id)s.%(ext)s"', "-f bestaudio", item['id']['videoId']], shell=True)
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
        subprocess.run(["yt-dlp.exe", f'-o "./audio/{uuid}/%(id)s.%(ext)s"', "-f bestaudio", link], shell=True)
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


#getSongLink("om/watch?v=oBpaB2YzX8s")

def getSongInfo(query):
    key = "AIzaSyClNK9kcOd2y33erpep1tcFipxw2y6D7tU"

    response = requests.get(f'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q={query}&key={key}')

    videoID = query[-11:]
    videoLink = "https://youtu.be/" + videoID

    title = ''
    artist = ''

    for item in response.json()['items']:
        searchVideoID = item['id']['videoId']
        if searchVideoID == videoID:
            title = item['snippet']['title']
            artist = item['snippet']['channelTitle']
            break

    info = {
        "title": title,
        "artist": artist,
        "id": videoID,
        "link": videoLink
    }

    print(title, artist)

    return info

