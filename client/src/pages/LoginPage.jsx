import {Link} from 'react-router-dom'
const LoginPage = () => {
  return (
    <div className='container-login'>
      <Link to="/home">
      <button className='button-login' >Home</button>
      </Link>
    </div>
  )
}

export default LoginPage