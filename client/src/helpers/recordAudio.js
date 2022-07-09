const record = document.querySelector(".listen");
const stop = document.querySelector(".stop");

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  console.log("getUserMedia supported.");
  navigator.mediaDevices
    .getUserMedia(
      // constraints - only audio needed for this app
      {
        audio: true,
      }
    )

    // Success callback
    .then(function (stream) { 
      // all code goes here
    })

    // Error callback
    .catch(function (err) {
      console.log("The following getUserMedia error occurred: " + err);
    });
} else {
  console.log("getUserMedia not supported on your browser!");
}