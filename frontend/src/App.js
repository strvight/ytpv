import { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import queryService from './services/query'
import axios from 'axios'
import loadingGif from './Circles-menu-3.gif'
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
const { v4: uuidv4 } = require('uuid')

const App = () => {

  const [search, setSearch] = useState('')
  const [songList, setSongList] = useState([]);
  const [bgImage, setBgImage] = useState(null)
  const [finalID, setFinalID] = useState('')
  const [loading, setLoading] = useState(false)
  const [songLoading, setSongLoading] = useState(false)

  // Function to update list on drop
  const handleDrop = (droppedItem) => {
    // Ignore drop outside droppable container
    if (!droppedItem.destination) return;
    var updatedList = [...songList];
    // Remove dragged item
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    // Add dropped item
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    // Update State
    setSongList(updatedList);
  };

  const handleItemChange = (event, index, newObject) => {
    event.preventDefault()
    let updatedList = [...songList]
    updatedList[index] = newObject
    console.log(updatedList)
    setSongList(updatedList)
  }

  const handleAdd = (event) => {
    event.preventDefault()

    const regex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/

    const regexPlaylist =  /^.*(youtu.be\/|list=)([^#\&\?]*).*/

    if (regex.test(search)) {
      setSongLoading(true)

      queryService.getInfo({ query: search }).then(info => {
        const newList = songList.concat(info)
        setSongList(newList)
        setSearch('')
        setSongLoading(false)
      })
    } else if (regexPlaylist.test(search)) {
      setSongLoading(true)

      queryService.getPlaylistInfo({ link: search }).then(res => {
        const newList = songList.concat(res.info)
        setSongList(newList)
        setSearch('')
        setSongLoading(false)
      })
    } else {
      alert('invalid link')
      return
    }
  }

  const handleCreate = (event) => {
    event.preventDefault()
    if (songList.length === 0) {
      alert('add some songs!')
      return
    }
    const formData = new FormData()

    const fileID = uuidv4()

    if (!bgImage) {
      alert('add bg image')
      return
    }
    
    formData.append('file', bgImage)
    formData.append('filename', fileID)

    setLoading(true)

    axios
      .post("/uploader", formData)
      .then(res => console.log(res))
      .catch(err => console.warn(err));

    queryService.create({ queries: songList, bgFileName: fileID.concat(bgImage.name.split('.').pop())}).then(response => {
      console.log(response)
      setFinalID(response.path)
      setLoading(false)
    })
  }

  const handleAnother = () => {

    const data = { finalID: finalID }

    axios.post('/delete-final', data).then(res => console.log(res)).catch(err => console.warn(err));

    setBgImage(null)
    setFinalID('')
    setSongList([])
    setSearch('')
  }

  if (loading) {
    return (
      <div>
        <div className='home-header'>
          <h1><span className='sky-400'>yt</span>pv</h1>
          <h3>youtube playlist video maker</h3>
        </div>
        <div className='instructions'>
            <ol>
              <li>paste youtube video or playlist link and press add</li>
              <li>edit song title and artist</li>
              <li>drag and drop to get order of songs</li>
              <li>choose video background image</li>
              <li>create and wait for download</li>
            </ol>
        </div>
        <div className='loading'>
          <img src={loadingGif} alt="wait until the page loads" />
          <h2>Creating video, please wait (may take a while)</h2>
        </div>
      </div>
    )
  }

  if (finalID) {
    return (
      <div>
        <div className='home-header'>
          <h1><span className='sky-400'>yt</span>pv</h1>
          <h3>youtube playlist video maker</h3>
        </div>
        <div className='instructions'>
            <ol>
              <li>paste youtube video or playlist link and press add</li>
              <li>edit song title and artist</li>
              <li>drag and drop to get order of songs</li>
              <li>choose video background image</li>
              <li>create and wait for download</li>
            </ol>
        </div>
        <div className='download'>
          <p>Your video is done! Download by clicking the button below.</p>
          <a href={"/video/".concat(finalID)} target="blank"><button>Download video</button></a>
        </div>
        <div className='another'>
            <button onClick={handleAnother}>Create another video</button>
          </div>
      </div>
    )
  }

  return (
    <div>
      <div className='home-header'>
        <h1><span className='sky-400'>yt</span>pv</h1>
        <h3>youtube playlist video maker</h3>
      </div>
      <div className='instructions'>
          <ol>
            <li>paste youtube video or playlist link and press add</li>
            <li>edit song title and artist</li>
            <li>drag and drop to get order of songs</li>
            <li>choose video background image</li>
            <li>create and wait for download</li>
          </ol>
      </div>
      <div className='search-form'>
        <form onSubmit={handleAdd}>
          <input placeholder='Youtube Link' type='text' onChange={(event) => setSearch(event.target.value)} value={search}></input>
          { songLoading ? "Loading song ..." : <button type='submit'>Add</button> }
        </form>
      </div>

      <div className='list'>
        <DragDropContext onDragEnd={handleDrop}>
        <Droppable droppableId="list-container">
          {(provided) => (
            <div
              className="list-container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {songList.map((item, index) => (
                <Draggable key={item.title} draggableId={item.title} index={index}>
                  {(provided) => (
                    <div
                      className="item-container"
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                    >
                      <div className='song-info'>
                        <img src={item.thumbnail} alt='video thumbnail'></img>
                        {index + 1}. {item.title} - {item.artist} 
                      </div>
                      <ListItem handleItemChange={handleItemChange} item={item} index={index}></ListItem>
                      {/* <input value={item} type='text' onChange={event => handleItemChange(event, index)}></input> */}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      </div>
      
      <form onSubmit={handleCreate} className='create-form'>
        <div>
          <label className="file-upload">
            <input type='file' accept='image/*' onChange={(event) => setBgImage(event.target.files[0])}></input>
            <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon> Upload background image
          </label>
          {bgImage && <p>{bgImage.name}</p>}
        </div>
        
        <button type='submit'>Create</button>
      </form>
      {/* https://medium.com/excited-developers/file-upload-with-react-flask-e115e6f2bf99 */}
       {/* <form action = "http://localhost:3000/" method = "POST" 
         enctype = "multipart/form-data">
         <input type = "file" name = "file" />
         <input type = "submit"/>
      </form>    */}
      {/* {finalID && <a href={"video/".concat(finalID)} target="blank">Download (local)</a>} */}

    </div>
    
  )
}

const ListItem = ({ handleItemChange, item, index }) => {

  const [title, setTitle] = useState(item.title)
  const [artist, setArtist] = useState(item.artist)
  const [edit, setEdit] = useState(false)

  const handleTitleChange = (event) => {
    event.preventDefault()
    //handleItemChange(event, index)
    setTitle(event.target.value)
  }

  const handleArtistChange = (event) => {
    event.preventDefault()
    //handleItemChange(event, index)
    setArtist(event.target.value)
  }

  const handleEdit = (event) => {
    event.preventDefault()
    handleItemChange(event, index, { title, artist, id: item.id, link: item.link, thumbnail: item.thumbnail })
    setEdit(false)
  }

  if (edit) {
    return (
      <>
        <form onSubmit={handleEdit} className='edit-form'>
          title: <input type='text' value={title} onChange={handleTitleChange} className='title-input'></input>
          artist: <input type='text' value={artist} onChange={handleArtistChange} className='artist-input'></input>
          <button type='submit' className='edit-button'>Confirm</button>
        </form>
      </>
    )
  }

  return (
    <>
      <button onClick={() => setEdit(true)} className='edit-button'>Edit</button>
    </>
  )
}

export default App;
