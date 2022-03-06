import { useState } from 'react';
import './ArtistsGrid.css';
import ArtistCard from './ArtistCard';
import Tag from './Tag';

function ArtistsGrid(props) {
  const {artists, allTags} = props;
  console.log(allTags);

  const [selectedTags, setSelectedTags] = useState([]);
  //const [otherTags, setOtherTags] = useState(allTags);

  function selectTag(tag) {
    setSelectedTags([...selectedTags, tag]);
    console.log(selectedTags);

    // let arr = otherTags.slice();
    // for (var i = 0; i < arr.length; i++){ 
    //   if (arr[i] === tag) { 
    //     arr.splice(i, 1); 
    //   }  
    // }
    // setOtherTags(arr); //delete from selectedtags
  }

  function deselectTag(tag) { //this feels chunky
    //setOtherTags([...otherTags, tag]);

    let arr = selectedTags.slice();
    for (var i = 0; i < arr.length; i++){ 
      if (arr[i] === tag) { 
        arr.splice(i, 1); 
      }  
    }
    setSelectedTags(arr); //delete from selectedtags
    console.log(selectedTags);
  }

  return (
    <div >
      <div className='tags'>
        {allTags.map((tag, i)=>{
          return <Tag tag={tag} key={i} selectTag={selectTag} deselectTag={deselectTag} />
        })}
        {/* {otherTags.map((tag, i)=>{
          return <div></div>
          //return <Tag tag={tag} key={i} selectTag={selectTag} deselectTag={deselectTag} />
        })} */}
      </div>

      <div className='grid'>
      {artists.map((artist, i)=>{
        var match = [];
        artist.tags.forEach(tag => {
          if (selectedTags.includes(tag)) {
            match.push(tag);
          }
        });
        if (match.length > 0)
          return <ArtistCard {...artist} key={i} match={match} />;
        return;
      })}
    </div>
    </div>
  );
}
export default ArtistsGrid;