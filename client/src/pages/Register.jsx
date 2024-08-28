import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Register() {
  const [name , setName] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')

  async function addApi(ev){
    try{
      ev.preventDefault()
      await axios.post('/register' , {
      name , email , password
    }) 
    }catch(e){
      console.log(e)
      alert('The email is already used try again with a new one ')
    }
    
  }
  return (
    <>
    <div className=' grow flex items-center justify-around'>  
        <div className='mb-40'>
            <h1 className='font-semibold text-2xl text-center'>Register</h1>
            <form className='max-w-md mx-auto' onSubmit={addApi}>
                <input type="text" placeholder='John Doh' 
                onChange={ev => setName(ev.target.value)}/> 

                <input type="email" placeholder='John@email.com' 
                onChange={ev=> setEmail(ev.target.value)}/>

                <input type="password" placeholder='password' 
                onChange={ev => setPassword(ev.target.value)}/>

                <button className='primary'>Register</button>
                
                <div className='py-2 text-center text-gray-500'>
                    Have already an account ? <Link to={'/login'} className='text-black underline'>Login now</Link> 
                </div>
            </form>
        </div>
    </div>
    </>
  )
}
