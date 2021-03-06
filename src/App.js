import './App.css';
import SubmitForm from './SubmitForm';
import ArtistsGrid from './ArtistsGrid';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { all } from 'async';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCPnjAzlRagNorzxU-Twqsu5ccO_GDbgdE",
  authDomain: "tatzfinder.firebaseapp.com",
  projectId: "tatzfinder",
});

const db = getFirestore();


function App() {
  const [page, setPage] = useState(0);
  const [artists, setArtists] = useState([]);
  const [allTags, setAllTags] = useState([]);

  async function getArtists() {
    const querySnapshot = await getDocs(collection(db, "artists"));
    var arr = [];
    querySnapshot.forEach((doc) => {
      //setArtists([...artists, doc.data()]);
      let json = doc.data()
      json.match = [];
      artists.push(json);
      json.tags.forEach(tag => {
        if (!arr.includes(tag)) {
          arr.push(tag);
        }
      });
    });
    setArtists(artists);
    setAllTags(arr);
    console.log(allTags);
    console.log(artists);
  }

  // runs when submit button is clicked
  async function submitArtist(name, site, location, tags) {
    let json = {};
    json.name = name;
    json.site = site;
    json.location = location;
    json.tags = tags;
    console.log(tags);
    try {
      const docRef = await addDoc(collection(db, "submissions"), json);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    json.match = [];
    setArtists([...artists, json]);
    console.log(artists);    
    setPage(0);
  }

  useEffect(()=>{
    console.log("hi");
    if (artists.length === 0) {
      getArtists();
    }
  });

  return (
    <div className="App">
      <div className='menu-container'>
        <button className='menu' onClick={()=> setPage(1-page)}>
          {page===0 && "submit"}
          {page===1 && "back"}
        </button>
      </div>
      <header className="header">
        [tAttiez] 4 me + U
      </header>

      {page===0 && <ArtistsGrid artists={artists} allTags={allTags} />}
      {page===1 && <SubmitForm submitArtist={submitArtist}/>}

      <footer>
        --How 2 use--
        <p>
          --Submit a tattoo artist-- using the orange button on the top right corner.
          <ul>
            <li>put their name under artist's name; insta handle under instagram and city + state under location</li>
            <li>customize their specializations by clicking a tag to remove it</li>
          </ul>
        </p>
        <p>
          --Browsing thru tattoo artists--
          click on the tags to filter what kinds of artists you're looking for.
        </p>
        <p>
          --How are you categorizing skin tones?--
          For this app I'm using the fitzpatrick scale below as reference.
          <ul>
            <li>"medium dark" refers to skin tones between Type IV & V</li>
            <li>"dark" refers to between Type V & VI</li>
          </ul>
          <img src='https://suttonderm.com/wp-content/uploads/2016/09/FITZPATRICK-COLOR-CHART.png' alt='fitzpatrick scale'/>
        </p>
        React app by <a href='https://www.instagram.com/tootopus' target="_blank" rel='noreferrer'>chi</a>
        <Link to="/edit">.</Link>
      </footer>
    </div>
  );
}

export default App;
