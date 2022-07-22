from PIL import Image, ImageDraw, ImageFont


def createImage(text, uuid):
    width = 1920
    height = 1080
    font = ImageFont.truetype("times.ttf", size=45)

    img = Image.new('RGBA', (width, height), color=(255, 255, 255, 0))

    imgDraw = ImageDraw.Draw(img)

    textWidth, textHeight = imgDraw.textsize(text, font=font)
    xText = (width - textWidth) / 2
    yText = ((height - textHeight) / 2) + 250

    imgDraw.text((xText, yText), text, font=font, fill=(255, 255, 255))

    img.save(f'./images/{uuid}/{text}.png')

    return f'./images/{uuid}/{text}.png'
