import './App.css';
import SubmitForm from './SubmitForm';
import { useState } from "react";

function App() {
  const [page, setPage] = useState([0]);

  // runs when send button is clicked
  function submitArtist(name, site, location, tags) {
    console.log("submit " + name);
    setPage(0);
  }
  return (
    <div className="App">
      <div className='menu-container'>
        <button className='menu' onClick={()=> setPage(1)}> a</button>
      </div>
      <header className="header">
        [tAttiez] 4 me + U
      </header>

      {page===1 && <SubmitForm handleSubmit={submitArtist}/>}

    </div>
  );
}

export default App;
