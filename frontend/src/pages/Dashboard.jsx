import { useEffect, useState } from 'react'
import axios from 'axios'

import Sidebar from '../components/Sidebar'

export default function Dashboard() {

  const [stats, setStats] = useState({

    totalNews: 0,
    realNews: 0,
    fakeNews: 0

  })

  const [news, setNews] = useState([])

  const [loading, setLoading] = useState(true)

  const [chainStatus, setChainStatus] =
    useState(true)

  useEffect(() => {

    fetchDashboard()

    const interval = setInterval(() => {

      fetchDashboard()

    }, 5000)

    return () => clearInterval(interval)

  }, [])

  const fetchDashboard = async () => {

      try {

        // FETCH STATS
        const statsRes = await axios.get(
          'http://localhost:5000/api/news/stats'
        )

        setStats(statsRes.data)

      } catch (err) {

        console.log(
          'Stats Error:',
          err
        )

      }

      try {

        // FETCH NEWS
        const newsRes = await axios.get(
          'http://localhost:5000/api/news'
        )

        setNews(newsRes.data)

      } catch (err) {

        console.log(
          'News Error:',
          err
        )

      }

      try {

        // VERIFY BLOCKCHAIN
        const chainRes = await axios.get(
          'http://localhost:5000/api/news/verify-chain'
        )

        setChainStatus(
          chainRes.data.blockchainValid
        )

      } catch (err) {

        console.log(
          'Blockchain Error:',
          err
        )

        // FALLBACK
        setChainStatus(false)

      }

      // ALWAYS STOP LOADING
      setLoading(false)

  }

  return (

    <div className='app-layout'>

      <Sidebar />

      <div className='main-content'>

        <h1 className='page-title'>
          Dashboard
        </h1>

        {/* BLOCKCHAIN STATUS */}

        <div
          style={{
            marginBottom: '25px',
            padding: '15px',
            borderRadius: '14px',
            background:
              chainStatus
              ? '#052e16'
              : '#450a0a',
            color:
              chainStatus
              ? '#4ade80'
              : '#f87171',
            fontWeight: 'bold'
          }}
        >

          {

            chainStatus

            ? 'Blockchain Verified ✓'

            : 'Blockchain Tampered ✗'

          }

        </div>

        {/* STATS */}

        <div className='stats-grid'>

          <div className='stat-card blue'>

            <h3>Total News</h3>

            <h1>{stats.totalNews}</h1>

          </div>

          <div className='stat-card green'>

            <h3>Verified</h3>

            <h1>{stats.realNews}</h1>

          </div>

          <div className='stat-card red'>

            <h3>Fake News</h3>

            <h1>{stats.fakeNews}</h1>

          </div>

        </div>

        {/* NEWS PANEL */}

        <div className='news-panel'>

          <h2
            style={{
              marginBottom: '20px'
            }}
          >
            Recent News
          </h2>

          {

            news.length === 0

            ? (

              <p>No news published yet</p>

            )

            : (

              news.map((item) => (

                <div
                  key={item._id}
                  style={{
                    marginTop: '20px',
                    padding: '20px',
                    background: '#1e293b',
                    borderRadius: '16px',
                    border: '1px solid #334155'
                  }}
                >

                  <h3>
                    {item.title}
                  </h3>

                  <p
                    style={{
                      marginTop: '10px'
                    }}
                  >
                    {item.description}
                  </p>

                  <p
                    style={{
                      marginTop: '10px',
                      color:
                        item.status === 'Fake'
                        ? '#f87171'
                        : '#4ade80',
                      fontWeight: 'bold'
                    }}
                  >
                    {item.status}
                  </p>

                  <p
                    style={{
                      marginTop: '10px',
                      color: '#38bdf8'
                    }}
                  >
                    AI Score:
                    {' '}
                    {item.aiScore}
                  </p>

                  <p
                    style={{
                      marginTop: '10px',
                      color: '#facc15',
                      fontSize: '14px'
                    }}
                  >
                    {item.blockId}
                  </p>

                  <p
                    style={{
                      marginTop: '10px',
                      fontSize: '11px',
                      color: '#94a3b8',
                      wordBreak: 'break-all'
                    }}
                  >
                    Hash:
                    {' '}
                    {item.newsHash}
                  </p>

                  <p
                    style={{
                      marginTop: '10px',
                      fontSize: '11px',
                      color: '#facc15',
                      wordBreak: 'break-all'
                    }}
                  >
                    Prev Hash:
                    {' '}
                    {item.previousHash}
                  </p>

                </div>

              ))

            )

          }

        </div>

      </div>

    </div>
  )
}