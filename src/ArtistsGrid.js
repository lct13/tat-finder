import { useState, useEffect } from 'react';
import './ArtistsGrid.css';
import ArtistCard from './ArtistCard';
import TagSelection from './TagSelection';
import { State }  from 'country-state-city';

const states = State.getStatesOfCountry('US');

function ArtistsGrid(props) {
  const {artists, allTags} = props;

  const [state, setState] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  //const [sortedArtists, setSortedArtists] = useState(artists);
//  const [artistsByState, setArtistsByState] = useState(artists);

  function updateTags(tags) {
    console.log(tags);
    setSelectedTags(tags);
  }

  function filterArtists() {
    var artistsByTags = [];
    if (selectedTags.length===0) {
      artistsByTags = artists;
    } else {
      artists.forEach(artist=>{
        var match = [];
        artist.tags.forEach(tag => {
          if (selectedTags.includes(tag)) {
            match.push(tag);
          }
        });
        if (match.length > 0) {
          const newArtist = {...artist};
          newArtist.match = match;
          artistsByTags.push(newArtist);
        }
      });
      artistsByTags.sort((a,b) => {return b.match.length - a.match.length});
    }

    if (state==="") {
      return artistsByTags;
    }
    var artistsByState = [];
    artistsByTags.forEach(artist=>{
      if (typeof artist.location === 'string' 
      && artist.location.split(" ")[1] === state) {
        artistsByState.push(artist);
      }
    });
    return artistsByState;
  }

  return (
    <div >
      <TagSelection allTags={allTags} updateTags={updateTags}/>
      <select className='state-filter'
      onChange={(e) => setState(e.target.value)}>
        <option value="" id='blank-state' selected>state</option>
        {states.map((json, i) => {
          const state = json.isoCode;
          return (<option value={state} key={i}>
          {state}</option>);
        })}
      </select>
      <div className='grid'>
      {filterArtists().length===0 && 
        <div className='error'>no artist in {state} found... submit one!</div>
      }
      {filterArtists().map((artist, i)=>{
        console.log(artist.match);
        return <ArtistCard {...artist} k={i} />;
      })}
    </div>
    </div>
  );
}
export default ArtistsGrid;