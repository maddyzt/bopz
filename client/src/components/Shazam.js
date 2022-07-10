import { Fragment, useState } from 'react';
import axios from 'axios'
import PostList from './PostList';
import "./Shazam.css";
import { useEffect } from 'react';


const Shazam = () => {

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
        record.onclick = function() {
          mediaRecorder.start();
          console.log(mediaRecorder.state);
          console.log("recorder started");
          record.style.background = "red";

          // stop.disabled = false;
          record.disabled = true;

          // not working
          setTimeout(() => {
            const blob = new Blob(chunks, { 
              'type': 'audio/mp3' 
            });
           
            console.log('sending audio file')
            sendAudioFile(blob)

            // returns a promise pending
            // console.log('axios return', sendAudioFile(blob))
          }, 5000);

          
          // this function sends the audio data to the shazam api
          // sendAudioFile(blob);
          // setTimeout(() => {
          //   const blob = new Blob(chunks, { 
          //     'type': 'audio/mp3' 
          //   });
          //   console.log('sending audio');
          //   sendAudioFile(blob);
          // }, 10000);
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
        //   const blob = new Blob(chunks, { 
        //     'type': 'audio/mp3' 
        //   });
        //   // this function sends the audio data to the shazam api
        //   sendAudioFile(blob);
        // }

        // when data is available it is added to chunks
        mediaRecorder.ondataavailable = function(e) {
          chunks.push(e.data);
        }
      }

      let onError = (err) => {
        console.log('The following error occured: ' + err);
      }

      navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);

    } else {
      console.log('getUserMedia not supported on your browser!');
    }
  })

  // set states
  const [posts, setPosts] = useState([]);

  // function to send audio to shazam api
  const sendAudioFile = file => {
    const formData = new FormData();
    formData.append('audio-file', file);

    // public shazam api options
    const options = {
      method: 'POST',
      url: 'https://song-recognition.p.rapidapi.com/song/detect',
      headers: formData.getHeaders ? formData.getHeaders () : {
        'X-RapidAPI-Key': '08f35b8e4amsh3b127ed76e563dap1519a8jsn095945b5e13d',
        'X-RapidAPI-Host': 'song-recognition.p.rapidapi.com',
      },
      data: formData
    };

    // axios request to the shazam api
    axios.request(options)
      .then(async function (response) {

      console.log('response data', response.data);

      // create post object to be added to posts array (state)
      const post = {
        id: response.data.tagid,
        songURL: response.data.track.url,
        songName: response.data.track.title,
        songArtist: response.data.track.subtitle
      }
      // add object to posts array
      let newPosts = [...posts, post];
      // set posts state
      setPosts(newPosts); 
      // post to song endpoint
      await persistPost(post);
      
      console.log(posts);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
    

  // function to post to song endpoint
  const persistPost = async (post) => {
    axios.post('http://localhost:8080/feed/song', post)
  };
    


  return (
    <div className="shazam-container">
    <Fragment>
      <div className="button-container">
     <form>
      <input type="submit" value="Start Bopping" className="btn btn-primary mt-4 listen bop-btn" />     
      <input type="submit" value="Send Song" className="btn btn-primary mt-4 stop bop-btn" />     
      </form>
      </div>
    </Fragment>
    <PostList 
    posts={posts}/>
    </div>
  )

}

export default Shazam;