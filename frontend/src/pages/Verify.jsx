import { useState } from 'react'
import axios from 'axios'

import Sidebar from '../components/Sidebar'

export default function Verify() {

  const [newsText, setNewsText] = useState('')

  const [result, setResult] = useState(null)

  const handleVerify = async (e) => {

    e.preventDefault()

    if (!newsText) {

      return alert('Enter News Content')

    }

    try {

      const res = await axios.post(

        'http://localhost:5000/api/news',

        {

          title: 'Verification Request',

          description: newsText

        }

      )

      setResult(res.data)

    } catch (err) {

      alert('Verification Failed')

    }

  }

  return (

    <div className='app-layout'>

      <Sidebar />

      <div className='main-content'>

        <h1 className='page-title'>
          Verify News
        </h1>

        <div className='form-container'>

          <form onSubmit={handleVerify}>

            <textarea
              placeholder='Paste news content here...'
              className='input-box'
              value={newsText}
              onChange={(e) => {

                setNewsText(e.target.value)

              }}
            />

            <button className='primary-btn'>
              Verify News
            </button>

          </form>

          {

            result && (

              <div
                style={{
                  marginTop: '30px',
                  padding: '30px',
                  borderRadius: '20px',
                  background:
                    result.status === 'Fake'
                    ? '#3f1d1d'
                    : '#052e16',
                  border:
                    result.status === 'Fake'
                    ? '2px solid #ef4444'
                    : '2px solid #22c55e'
                }}
              >

                <h2>
                  Verification Result
                </h2>

                <p
                  style={{
                    marginTop: '15px'
                  }}
                >

                  <strong>Status:</strong>

                  {' '}

                  <span
                    style={{
                      color:
                        result.status === 'Fake'
                        ? '#f87171'
                        : '#4ade80'
                    }}
                  >
                    {result.status}
                  </span>

                </p>

                <p
                  style={{
                    marginTop: '10px'
                  }}
                >

                  <strong>AI Score:</strong>

                  {' '}

                  {result.aiScore}

                </p>

              </div>

            )

          }

        </div>

      </div>

    </div>
  )
}