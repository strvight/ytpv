from PIL import Image, ImageDraw, ImageFont
import os


def createTextImage(text, uuid, width, height):
    font = ImageFont.truetype("times.ttf", size=45)

    img = Image.new('RGBA', (width, height), color=(255, 255, 255, 0))

    imgDraw = ImageDraw.Draw(img)

    textWidth, textHeight = imgDraw.textsize(text, font=font)
    xText = (width - textWidth) / 2
    yText = ((height - textHeight) / 2) + 300

    imgDraw.text((xText, yText), text, font=font, fill=(255, 255, 255))

    img.save(f'./images/{uuid}/{text}.png')

    return f'./images/{uuid}/{text}.png'


def createImage(text, uuid, bgFileName):
    baseheight = 1080

    background = Image.open(f"./images/bg/{bgFileName}")

    hpercent = (baseheight/float(background.size[1]))
    wsize = int((float(background.size[0])*float(hpercent)))

    background = background.resize((wsize, baseheight), Image.ANTIALIAS)

    textImgPath = createTextImage(text, uuid, wsize, baseheight)

    foreground = Image.open(textImgPath)

    background.paste(foreground, (0, 0), foreground)

    os.remove(textImgPath)

    length = len(os.listdir(f'./images/{uuid}'))

    background.save(f'./images/{uuid}/{length}.png')

    return f'./images/{uuid}/{length + 1}.png'
