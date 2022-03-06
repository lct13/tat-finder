import './App.css';
import SubmitForm from './SubmitForm';
import ArtistsGrid from './ArtistsGrid';
import { useState, useEffect } from "react";

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
    let arr = [];
    let arr1 = [];
    querySnapshot.forEach((doc) => {
      artists.push(doc.data());
      doc.data().tags.forEach(tag => {
        if (!allTags.includes(tag)) {
          allTags.push(tag);
        }
      });
    });

    console.log(allTags);
    console.log(artists);
  }

  // runs when send button is clicked
  async function submitArtist(name, site, location, tags) {
    let json = {};
    json.name = name;
    json.site = site;
    json.location = location;
    json.tags = [];
    tags.forEach(tag=>{
      json.tags.push(tag.id);
    });
    console.log(tags);
    setArtists([...artists, json]);
    setAllTags([...allTags, ...tags]);
    console.log(artists);
    try {
      const docRef = await addDoc(collection(db, "artists"), json);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    

    // let newTags = [];
    // tags.forEach(tag => {
    //   if (!allTags.includes(tag.id)) {
    //     newTags.push(tag.id);
    //     //setAllTags([...allTags, tag.id]);
    //   }
    // });
    // setAllTags([...allTags, ...newTags]);
    setPage(0);
  }

  useEffect(()=>{
    console.log("hi");
    if (artists.length == 0) {
      getArtists();
    }
  });

  return (
    <div className="App">
      <div className='menu-container'>
        <button className='menu' onClick={()=> setPage(1-page)}>x</button>
      </div>
      <header className="header">
        [tAttiez] 4 me + U
      </header>

      {page===0 && <ArtistsGrid artists={artists} allTags={allTags} />}
      {page===1 && <SubmitForm handleSubmit={submitArtist}/>}

    </div>
  );
}

export default App;
