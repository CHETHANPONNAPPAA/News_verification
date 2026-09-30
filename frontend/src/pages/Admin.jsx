import { useEffect, useState } from 'react'

import axios from 'axios'

import Sidebar from '../components/Sidebar'

export default function Admin() {

  const [users, setUsers] =
    useState([])

  const [news, setNews] =
    useState([])

  useEffect(() => {

    fetchUsers()

    fetchNews()

  }, [])

  const fetchUsers = async () => {

    try {

      const res = await axios.get(
        'http://localhost:5000/api/users'
      )

      setUsers(res.data)

    } catch (err) {

      console.log(err)

    }

  }

  const fetchNews = async () => {

    try {

      const res = await axios.get(
        'http://localhost:5000/api/news'
      )

      setNews(res.data)

    } catch (err) {

      console.log(err)

    }

  }

  // PROMOTE USER
  const promoteUser = async (id) => {

    try {

      await axios.put(

        `http://localhost:5000/api/users/promote/${id}`

      )

      fetchUsers()

    } catch (err) {

      console.log(err)

    }

  }

  // DELETE USER
  const deleteUser = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/users/${id}`
      )

      fetchUsers()

    } catch (err) {

      console.log(err)

    }

  }

  // DELETE NEWS
  const deleteNews = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/news/${id}`
      )

      fetchNews()

    } catch (err) {

      console.log(err)

    }

  }

  return (

    <div className='app-layout'>

      <Sidebar />

      <div className='main-content'>

        <h1 className='page-title'>
          Admin Panel
        </h1>

        {/* USERS */}

        <h2
          style={{
            marginBottom: '20px'
          }}
        >
          Users
        </h2>

        {

          users.map((user) => (

            <div
              key={user._id}
              className='report-card'
            >

              <div>

                <h3>
                  {user.username}
                </h3>

                <p>
                  {user.email}
                </p>

                <p
                  style={{
                    marginTop: '10px',
                    color: '#38bdf8'
                  }}
                >
                  Role:
                  {' '}
                  {user.role}
                </p>

              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '10px'
                }}
              >

                {

                  user.role !==
                  'validator' && (

                    <button
                      onClick={() => {

                        promoteUser(user._id)

                      }}
                      className='promote-btn'
                    >
                      Promote
                    </button>

                  )

                }

                <button
                  onClick={() => {

                    deleteUser(user._id)

                  }}
                  className='delete-btn'
                >
                  Delete
                </button>

              </div>

            </div>

          ))

        }

        {/* NEWS */}

        <h2
          style={{
            margin:
              '40px 0 20px'
          }}
        >
          News Moderation
        </h2>

        {

          news.map((item) => (

            <div
              key={item._id}
              className='report-card'
            >

              <div>

                <h3>
                  {item.title}
                </h3>

                <p>
                  {item.description}
                </p>

              </div>

              <button
                onClick={() => {

                  deleteNews(item._id)

                }}
                className='delete-btn'
              >
                Delete
              </button>

            </div>

          ))

        }

      </div>

    </div>
  )
}