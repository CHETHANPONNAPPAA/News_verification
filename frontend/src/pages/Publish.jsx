import { useState } from 'react'
import axios from 'axios'

import Sidebar from '../components/Sidebar'

export default function Publish() {

  const [formData, setFormData] = useState({

    title: '',
    description: ''

  })

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    })

  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    if (
      !formData.title ||
      !formData.description
    ) {

      return alert('Fill all fields')

    }

    try {

      await axios.post(

        'http://localhost:5000/api/news',

        formData

      )

      alert('News Published')

      setFormData({

        title: '',
        description: ''

      })

    } catch (err) {

      alert('Failed To Publish')

    }

  }

  return (

    <div className='app-layout'>

      <Sidebar />

      <div className='main-content'>

        <h1 className='page-title'>
          Publish News
        </h1>

        <div className='form-container'>

          <form onSubmit={handleSubmit}>

            <input
              type='text'
              name='title'
              placeholder='News Title'
              className='input-box'
              value={formData.title}
              onChange={handleChange}
            />

            <textarea
              name='description'
              placeholder='News Description'
              className='input-box'
              value={formData.description}
              onChange={handleChange}
            />

            <button className='primary-btn'>
              Publish News
            </button>

          </form>

        </div>

      </div>

    </div>
  )
}