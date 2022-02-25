import './ArtistsGrid.css';

function ArtistCard(props) {
  const name = props.name;
  const site = props.site;
  const location = props.location;
  const tags = props.tags;
  return (
    <div className='card'>
      <a href={'https://www.instagram.com/'+site} className='artist-name'>{name}</a>
      <div className='artist-location'>{location}</div>
      <div className='artist-tags'>
        {tags.map((tag, i)=>{
          return (<div className='tag'>{tag.id}</div>);
        })}
      </div>
    </div>
  )
}
export default ArtistCard;