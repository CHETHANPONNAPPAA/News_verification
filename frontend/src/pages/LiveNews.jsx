import { useEffect, useState } from 'react'

import axios from 'axios'

import Sidebar from '../components/Sidebar'

export default function LiveNews() {

  const [news, setNews] = useState([])

  useEffect(() => {

    fetchLiveNews()

  }, [])

  const fetchLiveNews = async () => {

    try {

      const res = await axios.get(
        'http://localhost:5000/api/live-news'
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
          Live Fact Check
        </h1>

        {

          news.map((item, index) => (

            <div
              key={index}
              className='report-card'
            >

              <div>

                <h3>
                  {item.title}
                </h3>

                <p>
                  Source:
                  {' '}
                  {item.source}
                </p>

              </div>

              <div>

                <span
                  className={
                    item.status === 'Fake'
                    ? 'fake-badge'
                    : 'real-badge'
                  }
                >

                  {item.status}

                </span>

                <p
                  style={{
                    marginTop: '10px'
                  }}
                >
                  AI Score:
                  {' '}
                  {item.aiScore}
                </p>

              </div>

            </div>

          ))

        }

      </div>

    </div>
  )
}