// imports, css, any react state/hooks/other
//import React from 'react';

//React.useState()
import {useState, useEffect} from 'react'

// import component
import People from './components/People.jsx'

// get the css
import './App.css';

// get my util
import getData from './util/GetData.js'

import Degrees from './components/Degrees.jsx'
import Minors from './components/Minors.jsx'
import Employment from './components/Employment.jsx';
import NavBar from './components/NavBar.jsx'

const App=()=>{
  // set up my state vars
  // const [var, setVar] = useState(init);
  const [loadAbout, setLoadAbout] = useState(false);
  const [aboutObj, setAboutObj] = useState();

  useEffect(()=>{
    getData('about/')
      .then((json)=>{
        console.log('worked', json);
        //load the data into the obj
        setAboutObj(json);
        //flip the bit on loaded
        setLoadAbout(true);
      })
  }, []);

  if(!loadAbout) return (
    <div>
      <div className="stick">
        <h1>Welcome to the iSchool Website!</h1>
        <div>...Menu Component...</div>
      </div>
      <div className="App">
        <h1>Loading...</h1>
      </div>
    </div>
  )

  return (
    <div>
      <NavBar/>
      <div className="App">
        <div className="About">
          <h3 id="about">{aboutObj.title}</h3>
          <hr></hr>
          <h3>{aboutObj.description}</h3>
          <div className="quote">{aboutObj.quote}</div>
          <h5>---{aboutObj.quoteAuthor}---</h5>
        </div>
        <hr/>
        <Degrees/>
        <hr></hr>
        <Minors/>
        <hr></hr>
        <Employment/>
        <hr></hr>
        <People/>
      </div>
    </div>
  )
}
export default App;