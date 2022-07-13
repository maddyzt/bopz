import { Fragment, useState } from 'react';
import axios from 'axios'
import PostList from './PostList';
import "./Shazam.css";
import { useEffect } from 'react';


const Shazam = () => {
  let postId = null;
  const apiKey = process.env.REACT_APP_API_KEY;
  // set states
  const [posts, setPosts] = useState([]);
  const [existingPosts, setExistingPosts] = useState([]);
  let newPosts = [];

  // get user data 
  let userData = {};
  const getUserData = () => {
    axios.get('http://localhost:8080/feed/user')
    .then((response) => {
      console.log('response reached')
      userData = {
        id: response.data.rows[0].id,
        username: response.data.rows[0].username
      }
    })
  }

  useEffect(() => {
    getUserData();
  }, []);
  

  const userObject = {
    username: sessionStorage.getItem("user_name")
  };

  // this function will take in a user parameter (object)
  const getPostsByUser = (userObject) => {
    axios.get('http://localhost:8080/feed/posts', userObject)
    .then((response) => {
      // existing posts is an array of posts
      setExistingPosts(response.data.rows);
      console.log('existing posts', existingPosts);
    })
  }
  
  useEffect(() => {
    getPostsByUser(userObject);
  }, []);
  

  useEffect(() => {
    // target the listen/stop buttons
    const record = document.querySelector(".listen");
    // const stop = document.querySelector(".stop");

    // disable stop button while not recording
    // stop.disabled = true;

    // main block for doing the audio recording
    // check if user allows the app to record
    if (navigator.mediaDevices.getUserMedia) {
      console.log('getUserMedia supported.');

      // input has to be audio
      const constraints = { audio: true };

      // audio chunks
      let chunks = [];

      let onSuccess = (stream) => {
        const mediaRecorder = new MediaRecorder(stream);

        // when listen is clicked, the media recorder starts listening and buttons are reset
        record.onclick = () => {
          mediaRecorder.start();
          console.log(mediaRecorder.state);
          console.log("recorder started");
          record.style.background = "red";

          // stop.disabled = false;
          record.disabled = true;

          const recordAudio = async () => {
            console.log('recordAudio starting')
            const recorder = new MediaRecorder(stream);
            const chunks = [];
            recorder.ondataavailable = e => chunks.push(e.data);
            recorder.onstop = async (e) => {        

            let data = await sendAudioFile(new Blob(chunks));

            if (data.matches && data.matches.length !== 0) {
              // mediaRecorder.stop();
              record.disabled = false;
              record.style.background = "";
              record.style.color = "";
              console.log(mediaRecorder.state);
              console.log("recorder stopped");
              await persistToDatabase(data);
              stopInterval();
            }
          }
            setTimeout(()=> recorder.stop(), 5000); // we'll have a 5s media file
            recorder.start();
          
          }

          const interval = setInterval(recordAudio, 4000);
          
          const stopInterval = () => {
            clearInterval(interval)
          };
          

        }

        // when stop is clicked, the media recorder stops listening and buttons are reset
        // stop.onclick = () => {
        //   mediaRecorder.stop();
        //   console.log(mediaRecorder.state);
        //   console.log("recorder stopped");
        //   record.style.background = "";
        //   record.style.color = "";

        //   stop.disabled = true;
        //   record.disabled = false;
        // }

        // when stop is clicked, a new blob is created with the audio data
        // mediaRecorder.onstop = (e) => {
          // const blob = new Blob(chunks, { 
          //   'type': 'audio/mp3' 
          // });
          // // this function sends the audio data to the shazam api
          // sendAudioFile(blob);
        // }

        // when data is available it is added to chunks
        // mediaRecorder.ondataavailable = function(e) {
        //   chunks.push(e.data);
        // }
      }

      let onError = (err) => {
        console.log('The following error occured: ' + err);
      }

      navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);

    } else {
      console.log('getUserMedia not supported on your browser!');
    }
  });



  // function to send audio to shazam api
  const sendAudioFile = async (file) => {
    const formData = new FormData();
    formData.append('audio-file', file);
    console.log('formdata', formData);
    // public shazam api options
    const options = {
      method: 'POST',
      url: 'https://song-recognition.p.rapidapi.com/song/detect',
      headers: formData.getHeaders ? formData.getHeaders () : {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'song-recognition.p.rapidapi.com'
      },
      data: formData
    };
    console.log('sending audio file')
    // axios request to the shazam api
    
    let response = await axios.request(options);
    console.log('response', response);
    return response.data;
  }
    
    const persistToDatabase = async (data) => {
      try {
      let post = {
        id: data.tagid,
        songURL: data.track.url,
        songName: data.track.title,
        songArtist: data.track.subtitle,
        username: userData.username,
        likes: 0
      };
      // add object to posts array
      newPosts = [...posts, post];
      // set posts state
      setPosts(newPosts); 
      // post to song endpoint
      await persistPost(post);
      // console.log(posts);
    } catch(err) {
      console.log(err)
    }
    }

    
    // function to post to song endpoint
    const persistPost = (post) => {
      axios.post('http://localhost:8080/feed/song', post)
      .then((response) => {
        postId = response.data.rows[0].id
        console.log('post succesful and postId', postId)
      })
    };

  return (
    <div className="shazam-container">
    <Fragment>
      <div className="button-container">
     <form>
      <input type="submit" value="Start Bopping" className="btn btn-primary mt-4 listen bop-btn" />     
      {/* <input type="submit" value="Send Song" className="btn btn-primary mt-4 stop bop-btn" />      */}
      </form>
      </div>
    </Fragment>
    <PostList 
    posts={posts}
    existingPosts={existingPosts}
    />
    </div>
  )

}

export default Shazam;