import { useState, useEffect } from 'react';
import './ArtistsGrid.css';
import ArtistCard from './ArtistCard';
import TagSelection from './TagSelection';
import { State }  from 'country-state-city';

const states = State.getStatesOfCountry('US');

function ArtistsGrid(props) {
  const {artists, allTags} = props;

  const [sortedArtists, setSortedArtists] = useState(artists);
  const [selectedTags, setSelectedTags] = useState([]);
  const [state, selectState] = useState();

  function match(artist) {
    var match = [];
    artist.tags.forEach(tag => {
      if (selectedTags.includes(tag)) {
        match.push(tag);
      }
    });
    console.log(match.length);
    return match.length;
  }

  function updateTags(tags) {
    setSelectedTags(tags);
    console.log(tags);
    console.log(selectedTags);
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
  }

 return (
    <div >
      <TagSelection allTags={allTags} updateTags={updateTags}/>

      <div className='grid'>
      {//artists.sort((a, b) => (match(a)>match(b))).map((artist, i)=>{
      sortedArtists.map((artist, i)=>{
          return <ArtistCard {...artist} k={i} />;
        return;
      })}
    </div>
    </div>
  );
}
export default ArtistsGrid;