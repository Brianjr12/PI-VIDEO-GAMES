const Card = ({id,name,image}) => {
  return (
      <div>
        <h2>{id}</h2>
        <h1>{name}</h1>
        <img src={image} alt="videogame image" />
      </div>
  );
}
export default Card