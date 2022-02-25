import { useState } from 'react';
import ArtistCard from './ArtistCard';
import './ArtistsGrid.css';
function ArtistsGrid(props) {
  const {artists} = props;

  const [selectedTags, setSelectedTags] = useState([])

  var allTags = [];
  artists.forEach(artist => {
    console.log(artist.tags);
    artist.tags.forEach(tag => {
      if (!allTags.includes(tag)) {
        allTags.push(tag);
      }
    });
  });
  console.log(allTags);
  return (
    <div >
      <div className='tags'>
        {allTags.map((tag, i)=>{
          return (<div className='tag'>{tag.id}
          <button>x</button></div>);
        })}
      </div>

      <div className='grid'>
      {artists.map((artist, i)=>{
        console.log(artist);
        var match = [];
        artist.tags.forEach(tag => {
          if (selectedTags.includes(tag)) {
            match.push(tag);
          }
        });
        if (match.length < 1)
          return <ArtistCard {...artist} key={i} match={match} />;
        return;
        //return <div className='message-bubble' key={i}>{msg}</div>
      })}
    </div>
    </div>
  );
}
export default ArtistsGrid;