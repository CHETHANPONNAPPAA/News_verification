import { useEffect, useState } from 'react'

import axios from 'axios'

import Sidebar from '../components/Sidebar'

export default function Blockchain() {

  const [news, setNews] = useState([])

  useEffect(() => {

    fetchBlockchain()

  }, [])

  const fetchBlockchain = async () => {

    try {

      const res = await axios.get(

        'http://localhost:5000/api/news'

      )

      setNews(res.data)

    } catch (err) {

      console.log(err)

    }

  }

  return (

    <div className='app-layout'>

      <Sidebar />

      <div className='main-content'>

        <h1 className='page-title'>

          Blockchain Transactions

        </h1>

        <div className='news-grid'>

          {

            news.map((item, index) => (

              <div
                key={index}
                className='news-card'
              >

                <h2>

                  {item.title}

                </h2>

                <p>

                  <strong>
                    Status:
                  </strong>

                  {' '}

                  {item.status}

                </p>

                <p>

                  <strong>
                    AI Score:
                  </strong>

                  {' '}

                  {item.aiScore}%

                </p>

                <p>

                  <strong>
                    Block ID:
                  </strong>

                  {' '}

                  {item.blockId}

                </p>

                <p>

                  <strong>
                    Current Hash:
                  </strong>

                </p>

                <small>

                  {item.newsHash}

                </small>

                <p
                  style={{
                    marginTop: '10px'
                  }}
                >

                  <strong>
                    Previous Hash:
                  </strong>

                </p>

                <small>

                  {item.previousHash}

                </small>

                <p
                  style={{
                    marginTop: '10px'
                  }}
                >

                  <strong>
                    Timestamp:
                  </strong>

                  {' '}

                  {

                    new Date(
                      item.createdAt
                    ).toLocaleString()

                  }

                </p>

              </div>

            ))

          }

        </div>

      </div>

    </div>

  )

}