from videoMaker import *
from getSong import *
from delete import *
import re
import os
import uuid


def createPlaylistVideo(videoObjects, bgFileName):

    userUuid = uuid.uuid4()

    os.mkdir(f"./audio/{userUuid}")

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

    deleteFiles(userUuid, bgFileName)

    return userUuid
