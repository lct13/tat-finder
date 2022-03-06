import { useState } from 'react';

function Tag(props) {
  const {selectTag, deselectTag, tag} = props;
  const [selected, setSelected] = useState(false);

  function select() {
    setSelected(true);
    selectTag(tag);
  }

  function deselect() {
    setSelected(false);
    deselectTag(tag);  
  }

  if (selected) {
    return (
    <div className='tag'>{tag}
      <button onClick={deselect}>x</button>
    </div>
    );
  } else {
    return (
      <button className='tagz' onClick={select}>
        {tag}
      </button>
    );
  }

}
export default Tag;