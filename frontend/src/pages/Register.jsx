import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Register() {

  const [formData, setFormData] = useState({

    username: '',
    email: '',
    password: '',
    role: 'user'

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

      !formData.username ||
      !formData.email ||
      !formData.password

    ) {

      return alert(
        'Please fill all fields'
      )

    }

    try {

      await axios.post(

        'http://localhost:5000/api/register',

        formData

      )

      alert('Registration Successful')

      window.location = '/'

    } catch (err) {

      alert('Registration Failed')

    }

  }

  return (

    <div className='auth-container'>

      <div className='auth-box'>

        <h1 className='auth-title'>
          Register
        </h1>

        <form onSubmit={handleSubmit}>

          <input
            type='text'
            name='username'
            placeholder='Username'
            className='input-box'
            onChange={handleChange}
            required
          />

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

          <input
            type='hidden'
            name='role'
            value='user'
          />

          <button className='primary-btn'>
            Register
          </button>

        </form>

        <p className='switch-text'>

          Already have an account?

          {' '}

          <Link to='/'>
            Login
          </Link>

        </p>

      </div>

    </div>
  )
}