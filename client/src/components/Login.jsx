import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';

let Login = () => {

  // let [click, setClick] = useState(false)

  //window.location.href = 'the route'

  // react router (is a wrapper, not dealing with window location object directly)

  //useNavigate(used to go to URLs)
  let change = () => {
    console.log('First')
   return axios.get('http://localhost:8000/login')
    .then((res) => {
      console.log('successful redirect!')
    })
    .catch((err) => {
      console.log(err)
    })
  }

// With params
  // const change = () => {
  //   console.log('First')
  //  return axios.get('http://localhost:8000/login', {
  //   params: {
  //     test: 'test'
  //   }
  // })
  //   // console.log("Second")
  //   .then((res) => {
  //     console.log('successful redirect!')
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
  // }

  // Using State
  // useEffect(() => {
  //   axios.get('http://localhost:8000/login')
  //   .then((res) => {
  //     console.log('successful redirect!')
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
  // }, [click])




  return (
    <Fragment>
      {/* <button href = 'http://localhost:8000/login'> Login to Spotify </button> */}
      {/* <button onClick={() => setClick(true)}> Login to Spotify </button> */}
      <button onClick={change}> Login to Spotify </button>

    </Fragment>

  );
}

export default Login;