import './App.css';
import SubmitForm from './SubmitForm';
import ArtistsGrid from './ArtistsGrid';
import { useState } from "react";

function App() {
  const [page, setPage] = useState([0]);
  const [artists, setArtists] = useState([]);

  // runs when send button is clicked
  function submitArtist(name, site, location, tags) {
    let json = {};
    json.name = name;
    json.site = site;
    json.location = location;
    json.tags = tags;
    setArtists([...artists, json]);
    console.log(artists);
    setPage(0);
  }
  return (
    <div className="App">
      <div className='menu-container'>
        <button className='menu' onClick={()=> setPage(1-page)}>x</button>
      </div>
      <header className="header">
        [tAttiez] 4 me + U
      </header>

      {page===0 && <ArtistsGrid artists={artists} />}
      {page===1 && <SubmitForm handleSubmit={submitArtist}/>}

    </div>
  );
}

export default App;
