import { React, Fragment, useState } from 'react';
import axios from 'axios'
import PostList from './PostList';
import "./Shazam.css";
import { useEffect } from 'react';

const Shazam = (props) => {
  const apiKey = process.env.REACT_APP_API_KEY;
  // set states
  const [posts, setPosts] = useState([]);
  const [existingPosts, setExistingPosts] = useState([]);
  const [userData, setUserData] = useState({});

  let newPosts = [];

  useEffect(() => {
    const userObject = {
      username: props.user?.name
    }  
    getPostsByUser(userObject);
  }, [props.loggedIn]);

  const getUserData = (userObject) => {
    axios.post('http://localhost:8080/feed/user', userObject)
    .then((response) => {
      setUserData({
        id: response.data.rows[0].id,
        username: response.data.rows[0].username
      })
    })
  }

  useEffect(() => {
    const userObject = {
      username: props.user?.name
    }  
    getUserData(userObject);
  }, [posts, props.loggedIn]);


  // this function will take in a user parameter (object)
  const getPostsByUser = (userObject) => {
    axios.post('http://localhost:8080/feed/posts', userObject)
    .then((response) => {
      // existing posts is an array of posts
      setExistingPosts(response.data.rows);

    })
  }

  useEffect(() => {
    // target the listen/stop buttons
    const record = document.querySelector(".listen");

    // main block for doing the audio recording
    // check if user allows the app to record
    if (navigator.mediaDevices.getUserMedia) {
      // input has to be audio
      const constraints = { audio: true };

      let onSuccess = (stream) => {
        const mediaRecorder = new MediaRecorder(stream);

        // when listen is clicked, the media recorder starts listening and buttons are reset
        record.onclick = () => {
          mediaRecorder.start();
          record.style.background = "red";
          record.style.border = "1px solid red";
          document.getElementById("recButton").textContent = 'Listening...';
          record.disabled = true;

          const recordAudio = async () => {
            const recorder = new MediaRecorder(stream);
            const chunks = [];
            recorder.ondataavailable = e => chunks.push(e.data);
            recorder.onstop = async (e) => {

            let data = await sendAudioFile(new Blob(chunks));

            if (data.matches && data.matches.length !== 0) {
              stopInterval();
              record.disabled = false;
              record.style.background = "";
              record.style.color = "";
              record.style.border = "#1CA2F1";
              document.getElementById("recButton").textContent = "Start Bopping";

              await persistToDatabase(data);
              return;
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
    // axios request to the shazam api
    let response = await axios.request(options);
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
        userId: userData.id,
        likes: 0,
        date: "Just now",
        coverArt: data.track.images.coverart,
        albumName: data.track.sections[0].metadata[0].text
      };
      // add object to posts array
      newPosts = [...posts, post];
      // set posts state
      setPosts(newPosts);
      // post to song endpoint
      persistPost(post);
    } catch(err) {
      console.log(err)
    }
    }

    // function to post to song endpoint
    const persistPost = (post) => {
      axios.post('http://localhost:8080/feed/song', post)
      .then((response) => {
        postId = response.data.rows[0].id
      })
    };


  return (
    <div className="shazam-container">
    <Fragment>
      <div className="button-container">
     <form>
      <button type="submit" className="listen bop-btn" id="recButton">
        Start Bopping <i class="fa-solid fa-microphone"></i>
      </button>
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