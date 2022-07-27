from flask import Flask, request, send_file
from werkzeug.utils import secure_filename
from main import *
from getSong import getSongInfo
import shutil

app = Flask(__name__, static_url_path='', static_folder='frontend/build')


@app.route("/", methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        f = request.files['file']
        f.save('./images' + secure_filename(f.filename))
        return 'file uploaded successfully'


@app.route('/uploader', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        f = request.files['file']
        print(request.form['filename'])
        f.save('./images/bg/' +
               secure_filename(request.form['filename']) + f.filename[-4:])
        return 'file uploaded successfully'


@app.route('/api/make-video', methods=['GET', 'POST'])
def video():
    if request.method == 'POST':
        print(request.json['queries'])
        # print(request.json['queries'][0]['artist'])
        # print(request.json['bgFileName'])
        print(request.json['bgFileName'][0:36] +
              "." + request.json['bgFileName'][-3:])
        bgFilename = request.json['bgFileName'][0:36] + \
            "." + request.json['bgFileName'][-3:]
        path = createPlaylistVideo(
            request.json['queries'], bgFilename)
        response = {
            "path": path
        }
        return response
    else:
        print(request.json['queries'])
        fileID = createPlaylistVideo(request.json['queries'])
        response = {
            "fileID": fileID
        }
        return response


@app.route('/api/get-video-info', methods=['POST'])
def info():
    if request.method == 'POST':
        query = request.json['query']
        info = getSongInfo(query)
        return info


@app.route('/video/<uuid:fileID>')
def get_video(fileID):
    # print(fileID)
    try:
        return send_file(f'./finals/{fileID}/playlistVideo.mp4', attachment_filename='playlistVideo.mp4', as_attachment=True)
    except Exception as e:
        return str(e)


@app.route('/delete-final', methods=['POST'])
def delete_final():
    if request.method == 'POST':
        print(request.json)
        fileID = request.json['finalID']
        try:
            # os.remove(f'./finals/{fileID}/playlistVideo.mp4')
            shutil.rmtree(f'./finals/{fileID}')
            return 'file removed'
        except Exception as e:
            return str(e)


if __name__ == "__main__":
    port = os.environ.get("PORT", 5000)
    #app.run(debug=True, host="0.0.0.0", port=port)
    app.run(debug=True)
