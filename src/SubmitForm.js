import './SubmitForm.css';
import { FiStar } from 'react-icons/fi';
import React, { useState, useEffect } from 'react';
import TagSelection from './TagSelection';
import { State, City, Country }  from 'country-state-city';
import { Field, FieldError, Form } from 'react-jsonschema-form-validation';
import InfoButton from './InfoButton';

const suggestions = [
  "dark skin",
  "medium-dark skin",
  "color inks"
]

const states = State.getStatesOfCountry('US');

const demoSchema = {
  type: 'object',
  properties: {
      email: { type: 'string', format: 'email' },
  },
  required: [
      'email',
  ],
};


function SubmitForm(props) {
  const { submitArtist } = props;
  const [name, setName] = useState("");
  const [site, setSite] = useState("");
  const [location, setLocation] = useState("");
  const [state, setState] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  function updateTags(tags) {
    setSelectedTags(tags);
    console.log(tags);
    console.log("update: " + selectedTags);
  }

  const [formData, setFormData] = useState({ email: '' });
    
  const handleChange = (newData) => {
      // newData is a copy of the object formData with properties (and nested properties)
      // updated using immutability pattern for each change occured in the form.
      setFormData(newData);
  }
  
  const handleSubmit = () => {
      submitArtist(formData); // Do whatever you want with the form data
  }

  return (      
    <div className='form'>
        {/* <Form
            data={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            schema={demoSchema}
        >
            <label>Email :</label>
            <Field
                name="email"
                value={formData.email}
            />
            <FieldError name="email" />
            <button type="submit">Submit</button>
        </Form> */}

      <label className='name label'>
        artist's name
        <input type="text" name="name" className='input'
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label className='website label'>
        instagram
        <div>
          <span className='handle'>@</span>
          <input type="text" name='website input'
            onChange={(e) => setSite(e.target.value)}          
          />
        </div>
      </label>        
      <label className='location label'>
        location
        <select className='states input'
        onChange={(e) => setState(e.target.value)}>
          <option value="" selected disabled hidden>state</option>
          {states.map((json, i) => {
            const state = json.isoCode;
            return (<option value={state} key={i}>
            {state}</option>);
          })}
        </select>
        <select className='cities input'
        onChange={(e) => setLocation(e.target.value + " " + state)}>
        <option value="" selected disabled hidden>city</option>
          {City.getCitiesOfState('US', state).map((json, i) => {
            const city = json.name;
            return (<option value={city} key={i}>
            {city}</option>);
          })}
        </select>
      </label>        
      <div className='specializations label'>
        <p>has experience with
          {/* <InfoButton /> */}
        </p>
        <div className="tags-input">
          <TagSelection allTags={suggestions} updateTags={updateTags}/>
        </div>
      </div>
      <button className='submit' onClick={()=> submitArtist(name, site, location, selectedTags)}><FiStar/></button>
    </div>
  );
}

export default SubmitForm;