import Card from "../card/Card";

const Cards = ({games}) => {
  return (
    <div>
    {games.map(({ id, name, image }) => {
      return (
        <div key={id} >
          <Card id={id} name={name} image={image} />
        </div>
        );
      })}
    </div>
  )
}
export default Cards