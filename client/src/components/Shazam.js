import { Fragment, useState } from 'react';
import axios from 'axios'
import PostList from './PostList';

const Shazam = () => {
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('Choose Song');
  const [posts, setPosts] = useState([]);

  const onChange = e => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    const options = {
      method: 'POST',
      url: 'https://song-recognition.p.rapidapi.com/song/detect',
      headers: formData.getHeaders ? formData.getHeaders () : {
        'X-RapidAPI-Key': '08f35b8e4amsh3b127ed76e563dap1519a8jsn095945b5e13d',
        'X-RapidAPI-Host': 'song-recognition.p.rapidapi.com',
      },
      data: formData
    };

    const persistPost = async (post) => {
      axios.post('http://localhost:8080/feed/song', post)
    };
    
    axios.request(options).then(async function (response) {
      console.log(response.data);
      const post = {
        id: response.data.tagid,
        songName: response.data.track.title,
        songArtist: response.data.track.subtitle
      }
      posts.push(post);
      setPosts(posts);
      console.log(posts);
      await persistPost(post);
    }).catch(function (error) {
      console.error(error);
    });
  };

  return (
    <div className="container mt-4">
    <Fragment>
    <h4 className="display-4 text-center mb-4">
    <i className="mx-4 fa-solid fa-microphone-lines"></i>Start Bopping
    </h4>
     <form onSubmit={onSubmit}>
      <div className="custom-file mb-4">
        <input type="file" className="custom-file-input" id="customFile" onChange={onChange} />
        <label className="custom-file-label" htmlFor="customFile">{fileName}</label>
      </div>
      <input type="submit" value="Listen" className="btn btn-primary btn-block mt-4" />     
      </form>
    </Fragment>
    <PostList 
    posts={posts}/>
    </div>
  )

}

export default Shazam;