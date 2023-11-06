import Card from "../card/Card";
import style from'./Cards.module.css'
const Cards = ({ games }) => {
  return (
    <div className={style.container}>
    {games?.map(({ id, name, image,genres}) => {
      return (
        <Card key={id} name={name} image={image} id={id} genres={genres} />
      );
      })}
    </div>
  )
}
export default Cards