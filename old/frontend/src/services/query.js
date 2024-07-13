import axios from 'axios'

const getInfo = async (queryObject) => {
    const response = await axios.post('/api/get-video-info', queryObject)
    return response.data
}

const getPlaylistInfo = async (link) => {
    const response = await axios.post('/api/get-playlist-info', link)
    return response.data
}

const create = async (songListObjet) => {
    const response = await axios.post('/api/make-video', songListObjet)
    return response.data
}

export default { getInfo, getPlaylistInfo, create }