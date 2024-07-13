import os
import re
import uuid
from videoMaker import createVideoRAM
from getSong import *
from image import *
from delete import *


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

# getSongLink('https://www.youtube.com/watch?v=FvOpPeKSf_4', '123')
# getSongLink('https://www.youtube.com/watch?v=pbNs7tAUFkk', '123')

# createImage('Grenade - Bruno Mars', '123',
#             '5476b958-92de-4c18-9ca1-40f3fd6b85cd.jpg')


createVideoRAM('123', ['FvOpPeKSf_4', 'pbNs7tAUFkk'], [
               'Glimpse of Us - Joji', 'drunk - keshi'], '39935.jpg')
