import os
import re
import uuid
from getSong import *
from image import *
from delete import *

deleteFiles('fcd8ef08-d30e-4874-8e37-eb42ae8bf272',
            'c33d5c8d-0e05-40c3-8b8d-5d407425447b.jpg')

name = "310dde77-aed7-44c5-8c78-850309ba8419.png"

print(name[-3:])

# folder = r' ##\audio\\'

# print(os.listdir(folder)[0][:-17])


# for i, filename in enumerate(os.listdir('./audio')):
#     print(i, filename)

# for file_name in os.listdir("./images"):
#     os.remove("./images/" + file_name)

# txt = "https://youtu.be/3iM_06QeZi8"
# x = re.search("http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?", txt)

# if x:
#   print("YES! We have a match!")
# else:
#   print("No match")

# myuuid = uuid.uuid4()

# print('Your UUID is: ' + str(myuuid))
# print(myuuid)

# getSongInfo("https://www.youtube.com/watch?v=nkz0M4TS7oA")

#createImage('Counting Stars by OneRepublic','043147f4-3020-4d8b-ada5-ee2d4ad80c86')
