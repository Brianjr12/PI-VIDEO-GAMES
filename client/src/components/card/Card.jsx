import './Card.css'
const Card = ({name, image}) => {
  return (
      <div className='container'>
        <h1 className='card-name' >{name}</h1>
        <img src={image} alt="videogame image" className='container-img' />
        <p className=''>{""}</p>
      </div>
  );
}
export default Card