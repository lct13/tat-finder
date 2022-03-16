import { useState } from 'react';
import Tagger from './Tagger';
import "./Tags.css";

function TagSelection(props) {
  const {allTags, updateTags} = props;
  const [selectedTags, setSelectedTags] = useState([]);

  async function select(tag) {
    var arr = selectedTags.slice();
    arr.push(tag);
    setSelectedTags(arr);
    //setSelectedTags([...selectedTags, tag]) //doesnt work???!
    console.log('selected ' + tag);
    console.log('all: ' + selectedTags);
    updateTags(arr);// this is called before setSelectedTags?
  }

  function deselect(tag) {
    let arr = selectedTags.slice();
    for (var i = 0; i < arr.length; i++){ 
      if (arr[i] === tag) { 
        arr.splice(i, 1); 
      }  
    }
    setSelectedTags(arr); //delete from selectedtags
    console.log('deselected ' + tag)
    updateTags(arr);
  }

  return(
    <div className='tags'>
      {allTags.map((tag, i)=>{
        if (selectedTags.includes(tag)) {
          console.log(tag + " is selected");
          return (
            <div className='tag' key={i}>{tag}
              <button onClick={()=>deselect(tag)}>x</button>
            </div>
          );
        } else {
          console.log(tag + " is not selected");
          return (
            <button className='tagz' key={i} onClick={()=>select(tag)}>
              {tag}
            </button>
          );
        }
        //return <Tagger tag={tag} key={i} selectTag={selectTag} deselectTag={deselectTag} />
      })}
    </div>
  );
}

export default TagSelection;