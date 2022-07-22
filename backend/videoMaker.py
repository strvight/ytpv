from moviepy.editor import *
from image import *
import os


def createVideo(uuid, ids, texts, bgFileName):

    os.mkdir(f"./images/{uuid}")

    audioClips = []

    folder = "./ ##/audio/" + str(uuid) + "/"

    for idString in ids:
        source = folder + idString + ".webm"

        audioclip = AudioFileClip(source)

        audioClips.append(audioclip)

    concatAudio = concatenate_audioclips(audioClips)

    image = ImageClip(f"./images/bg/{bgFileName}")

    image = image.resize((1920, 1080))

    totalAudioDuration = sum(map(lambda a: round(a.duration), audioClips))
    # print(totalAudioDuration)

    audioDurations = list(map(lambda a: round(a.duration), audioClips))
    # print(audioDurations)

    video = image.set_audio(concatAudio)

    video = video.set_duration(totalAudioDuration)

    allClips = []

    timeCounter = 0

    for i, text in enumerate(texts):
        image = ImageClip(createImage(text, uuid))

        if i == 0:
            image = image.set_duration(
                audioDurations[i]).set_position("center")
        else:
            image = image.set_start(
                timeCounter + audioDurations[i-1]).set_duration(audioDurations[i]).set_position("center")
            timeCounter = timeCounter + audioDurations[i-1]

        allClips.append(image)

    #print(list(map(lambda c: c.start, allClips)))
    # print(allClips)

    video.resize((1920, 1080))

    allClips.insert(0, video)

    # print(allClips)

    finalVideo = CompositeVideoClip(allClips)

    os.mkdir(f"./finals/{uuid}")

    finalVideo.write_videofile(
        f"./finals/{uuid}/playlistVideo.mp4", threads=24, fps=1)

    return f"./finals/{uuid}/playlistVideo.mp4"

# createVideo()

# order is important, this loop is arbitrary tho so need way to make it not

# at start / end times cuz this method is taking too long
