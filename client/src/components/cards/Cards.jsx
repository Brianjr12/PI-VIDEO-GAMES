import Card from "../card/Card";
import style from'./Cards.module.css'
const Cards = ({ games }) => {
  return (
    <div className={style.container}>
    {games?.map(({ id, name, image,}) => {
      return (
          <Card key={id} name={name} image={image}/>
      );
      })}
    </div>
  )
}
export default Cards