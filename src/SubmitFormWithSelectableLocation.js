import './SubmitForm.css';
import { FiStar } from 'react-icons/fi';
import React, { useState, useEffect } from 'react';
import './SubmitForm.css';
import TagSelection from './TagSelection';
import { State, City, Country }  from 'country-state-city';

const suggestions = [
  "dark skin",
  "medium-dark skin",
  "color inks"
]

const states = State.getStatesOfCountry('US');

function SubmitForm(props) {
  useEffect(()=>{
    document.getElementsByClassName('menu')[0].textContent='back';
  });

  const { handleSubmit } = props;

  const [name, setName] = useState();
  const [site, setSite] = useState();
  const [location, setLocation] = useState();
  const [state, setState] = useState();
  const [selectedTags, setSelectedTags] = useState([]);

  function updateTags(tags) {
    setSelectedTags(tags);
    console.log(tags);
    console.log("update: " + selectedTags);
  }

  return (
    <div className='form'>
      <label className='name'>
        artist's name
        <input type="text" name="name" className='input'
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label className='website'>
        instagram
        <div>
          <span className='handle'>@</span>
          <input type="text" name="website" className='input'
            onChange={(e) => setSite(e.target.value)}          
          />
        </div>
      </label>        
      <label className='location'>
        location
        <select className='states' className='input'
        onChange={(e) => setState(e.target.value)}>
          <option value="" selected disabled hidden>state</option>
          {states.map((json, i) => {
            const state = json.isoCode;
            return (<option value={state} key={i}>
            {state}</option>);
          })}
        </select>
        <select className='cities' className='input'
        onChange={(e) => setLocation(e.target.value + " " + state)}>
        <option value="" selected disabled hidden>city</option>
          {City.getCitiesOfState('US', state).map((json, i) => {
            const city = json.name;
            return (<option value={city} key={i}>
            {city}</option>);
          })}
        </select>
      </label>        
      <label className='specializations'>
        has experience with
        <div className="tags-input">
          <TagSelection allTags={suggestions} updateTags={updateTags}/>
        </div>
      </label>
      <button className='submit' onClick={()=> handleSubmit(name, site, location, selectedTags)}><FiStar/></button>
    </div>
  );
}

export default SubmitForm;