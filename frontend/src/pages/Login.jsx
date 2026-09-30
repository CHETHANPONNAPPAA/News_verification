import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Login() {

  const [formData, setFormData] = useState({

    email: '',
    password: ''

  })

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    })

  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    // VALIDATION
    if (

      !formData.email ||
      !formData.password

    ) {

      return alert(
        'Please enter email and password'
      )

    }

    try {

      const res = await axios.post(

        'http://localhost:5000/api/login',

        formData

      )

      // SAVE TOKEN
      localStorage.setItem(

        'token',

        res.data.token

      )

      // SAVE ROLE
      localStorage.setItem(

        'role',

        res.data.user.role

      )

      alert('Login Successful')

      window.location = '/dashboard'

    } catch (err) {

      alert('Invalid Credentials')

    }

  }

  return (

    <div className='auth-container'>

      <div className='auth-box'>

        <h1 className='auth-title'>
          Login
        </h1>

        <form onSubmit={handleSubmit}>

          <input
            type='email'
            name='email'
            placeholder='Email'
            className='input-box'
            onChange={handleChange}
            required
          />

          <input
            type='password'
            name='password'
            placeholder='Password'
            className='input-box'
            onChange={handleChange}
            required
          />

          <button className='primary-btn'>
            Login
          </button>

        </form>

        <p className='switch-text'>

          Don't have an account?

          {' '}

          <Link to='/register'>
            Register
          </Link>

        </p>

      </div>

    </div>
  )
}