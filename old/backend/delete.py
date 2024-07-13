import os
import shutil


def deleteFiles(uuid, bgFileName):
    # remove audio
    shutil.rmtree(f'./audio/{uuid}/')

    # remove images
    shutil.rmtree(f'./images/{uuid}/')
    os.remove(f'./images/bg/{bgFileName}')
