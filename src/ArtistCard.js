import './ArtistsGrid.css';

function ArtistCard(props) {
  const {name, site, location, tags, match, k} = props
  var bgColor;
  if (k%4 === 0 || k%4 ===3) {
    bgColor = "var(--light-tan)";
  } else {
    bgColor = "var(--black)";
  }
  return (
    <div className='card' style={{backgroundColor: bgColor}}>
      <a href={'https://www.instagram.com/'+site} target="_blank" rel='noreferrer' className='artist-name'>{name}</a>
      <div className='artist-location'>{location}</div>
      <div className='artist-tags'>
        {tags.map((tag, i)=>{
          if (match.includes(tag)){
            return (<div className='artist-tag' key={i}>{tag}</div>);
          } else {
            return (<div className='tagz' key={i}>{tag}</div>);
          }
        })}
      </div>
    </div>
  )
}
export default ArtistCard;