import { useState, useEffect } from 'react';
import './ArtistsGrid.css';
import ArtistCard from './ArtistCard';
import TagSelection from './TagSelection';
import { State }  from 'country-state-city';

const states = State.getStatesOfCountry('US');

function ArtistsGrid(props) {
  const {artists, allTags} = props;

  const [state, setState] = useState("");
  const [sortedArtists, setSortedArtists] = useState(artists);
//  const [artistsByState, setArtistsByState] = useState(artists);

  function updateTags(selectedTags) {
    //js set select
    console.log("update: " + selectedTags);
    var artistMatrix = [];
    artists.forEach(artist=>{
      var match = [];
      artist.tags.forEach(tag => {
        if (selectedTags.includes(tag)) {
          match.push(tag);
        }
      });
      if (match.length > 0) {
        const newArtist = artist;
        newArtist.match = match;
        artistMatrix.push(newArtist);
      }
    });
    artistMatrix.sort((a,b) => {
      return b.match.length - a.match.length;
    })
    setSortedArtists(artistMatrix);
    filterState(state);
  }

  function filterState(s) {
    setSortedArtists((sortedArtists)=>{
      setState(s);//if prev state is not "" prompt 2 reselect tags
      if (s==="") {
        return sortedArtists;
      } else {
        var filterArtists = [];
        sortedArtists.forEach(artist=>{
          if (typeof artist.location === 'string' && artist.location.split(" ")[1] === s) {
            filterArtists.push(artist);
          }
        });
        return filterArtists;
      }
    });
  }
  return (
    <div >
      <TagSelection allTags={allTags} updateTags={updateTags}/>
      <select className='state-filter'
        onChange={(e) => filterState(e.target.value)}>
          <option value="" id='blank-state' selected>state</option>
          {states.map((json, i) => {
            const state = json.isoCode;
            return (<option value={state} key={i}>
            {state}</option>);
          })}
        </select>
      <div className='grid'>
      {sortedArtists.length===0 && 
        <div className='error'>no artist in {state} found... submit one!</div>
      }
      {sortedArtists.map((artist, i)=>{
        return <ArtistCard {...artist} k={i} />;
      })}
    </div>
    </div>
  );
}
export default ArtistsGrid;