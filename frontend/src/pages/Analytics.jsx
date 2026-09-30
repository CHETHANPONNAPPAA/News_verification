import { useEffect, useState } from 'react'

import axios from 'axios'

import Sidebar from '../components/Sidebar'

import {

  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis

} from 'recharts'

export default function Analytics() {

  const [stats, setStats] = useState({

    totalNews: 0,
    realNews: 0,
    fakeNews: 0

  })

  const [news, setNews] = useState([])

  useEffect(() => {

    fetchAnalytics()

  }, [])

  const fetchAnalytics = async () => {

    try {

      const statsRes = await axios.get(
        'http://localhost:5000/api/news/stats'
      )

      const newsRes = await axios.get(
        'http://localhost:5000/api/news'
      )

      setStats(statsRes.data)

      setNews(newsRes.data)

    } catch (err) {

      console.log(err)

    }

  }

  const pieData = [

    {
      name: 'Verified',
      value: stats.realNews
    },

    {
      name: 'Fake',
      value: stats.fakeNews
    }

  ]

  return (

    <div className='app-layout'>

      <Sidebar />

      <div className='main-content'>

        <h1 className='page-title'>
          Analytics Dashboard
        </h1>

        {/* PIE CHART */}

        <div className='chart-box'>

          <h2>
            Verified vs Fake News
          </h2>

          <ResponsiveContainer
            width='100%'
            height={350}
          >

            <PieChart>

              <Pie
                data={pieData}
                dataKey='value'
                outerRadius={120}
                label
              >

                <Cell fill='#22c55e' />

                <Cell fill='#ef4444' />

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* BAR CHART */}

        <div className='chart-box'>

          <h2>
            AI Confidence Scores
          </h2>

          <ResponsiveContainer
            width='100%'
            height={350}
          >

            <BarChart data={news}>

              <XAxis dataKey='title' />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey='aiScore'
                fill='#3b82f6'
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  )
}