import { useContext, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import axios from  'axios'
import { UserContext } from '../UserContext'

export default function Login() {
  const[email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const {setUser} = useContext(UserContext)
  const navigate = useNavigate()

  async function  handleLogin(ev){
    try{
      ev.preventDefault()
      const {data}  = await axios.post('/login' , {email , password})
      setUser(data)
      navigate('/')
    }catch(err){
      console.log(err)
      alert('user not found ')
    }
  }
  return (
    <div className=' grow flex items-center justify-around'>  
        <div className='mb-40'>
            <h1 className='font-semibold text-2xl text-center'>Login</h1>
            <form className='max-w-md mx-auto' onSubmit={handleLogin}> 
                <input type="email" placeholder='John@email.com'
                onChange={ev => setEmail(ev.target.value)} />

                <input type="password" placeholder='password' 
                onChange={ev => setPassword(ev.target.value)}/>

                <button className='primary'>Login</button>
                <div className='py-2 text-center text-gray-500'>
                    Do not have an account yet?  <Link to={'/register'} className='text-black underline'>Register now</Link>
                </div>
            </form>
        </div>
    </div>
  )
}
