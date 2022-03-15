import './SubmitForm.css';
import { FiStar } from 'react-icons/fi';
import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { WithContext as ReactTags } from 'react-tag-input';
import './SubmitForm.css';

const suggestions = [
  "dark skin",
  "medium-dark skin",
  "color inks"
].map(key => {
  return {
    id: key,
    text: key
  };
});

const KeyCodes = {
  comma: 188,
  enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

function SubmitForm(props) {
  useEffect(()=>{
    document.getElementsByClassName('menu')[0].textContent='back';
  });

  const { handleSubmit } = props;

  const [name, setName] = useState([]);
  const [site, setSite] = useState([]);
  const [location, setLocation] = useState([]);
  const [tags, setTags] = useState(suggestions);

  const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = tag => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = index => {
    console.log('The tag at index ' + index + ' was clicked');
  };


  return (
    <div className='form'>
      <label className='name'>
        artist's name
        <input type="text" name="name" 
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label className='website'>
        instagram @
        <input type="text" name="website"
          onChange={(e) => setSite(e.target.value)}
        />
      </label>        
      <label className='location'>
        location (city state)
        <input type="text" name="location"
          onChange={(e) => setLocation(e.target.value)}
        />
      </label>        
      <label className='specializations'>
        has experience with
        <div className="tags-input">
          <ReactTags
            tags={tags}
            suggestions={suggestions}
            delimiters={delimiters}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            handleDrag={handleDrag}
            handleTagClick={handleTagClick}
            inputFieldPosition="bottom"
            autocomplete
          />
        </div>
      </label>
      <button className='submit' onClick={()=> handleSubmit(name, site, location, tags)}><FiStar/></button>
    </div>
  );
}

export default SubmitForm;