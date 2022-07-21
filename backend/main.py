from videoMaker import *
from getSong import *
import re
import os
import uuid

# keepGoing = True

# while keepGoing:
#     cmd = input("1. get song (search) \n2. get song (link) \n3. make video \n")

#     if cmd == "1":
#         query = input("search string: ")
#         getSong(query)
#     elif cmd == "2":
#         link = input("link: ")
#         getSongLink(link)
#     elif cmd == "3":
#         keepGoing = False
#         createVideo()
#     else:
#         print("unknown command")

# createVideo()


def createPlaylistVideo(videoObjects, bgFileName):

    userUuid = uuid.uuid4()

    os.mkdir(f"./ ##/audio/{userUuid}")

    videoStrings = map(lambda object: object["link"], videoObjects)
    ids = map(lambda object: object["id"], videoObjects)
    texts = map(lambda object: object["title"] +
                " by " + object["artist"], videoObjects)

    for videoString in videoStrings:
        isLink = re.search(
            "http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?", videoString)
        if isLink:
            getSongLink(videoString, userUuid)
        else:
            getSong(videoString, userUuid)

    createVideo(userUuid, ids, texts, bgFileName)
    return userUuid
    # return "test"
