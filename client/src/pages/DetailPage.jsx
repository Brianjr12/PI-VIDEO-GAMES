import { useSelector } from "react-redux"
import Card from '../components/card/Card'

const DetailPage = () => {
  const gameById = useSelector(({ gameById }) => gameById)
  return (
    <div>
      <Card gameById={gameById}/>
    </div>
  )
}

export default DetailPage