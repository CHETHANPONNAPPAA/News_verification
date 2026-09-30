import { useEffect, useState } from 'react'

import axios from 'axios'

import jsPDF from 'jspdf'

import Sidebar from '../components/Sidebar'

export default function Reports() {

  const [news, setNews] = useState([])

  useEffect(() => {

    fetchReports()

  }, [])

  const fetchReports = async () => {

    try {

      const res = await axios.get(
        'http://localhost:5000/api/news'
      )

      setNews(res.data)

    } catch (err) {

      console.log(err)

    }

  }

  // GENERATE PDF
  const downloadPDF = (item) => {

    const doc = new jsPDF()

    doc.setFontSize(22)

    doc.text(
      'TruthChain Verification Report',
      20,
      20
    )

    doc.setFontSize(14)

    doc.text(
      `Title: ${item.title}`,
      20,
      40
    )

    doc.text(
      `Status: ${item.status}`,
      20,
      55
    )

    doc.text(
      `AI Score: ${item.aiScore}`,
      20,
      70
    )

    doc.text(
      `Block ID: ${item.blockId}`,
      20,
      85
    )

    doc.text(
      `Hash:`,
      20,
      100
    )

    doc.setFontSize(10)

    doc.text(
      item.newsHash,
      20,
      110,
      {
        maxWidth: 170
      }
    )

    doc.setFontSize(14)

    doc.text(
      'Description:',
      20,
      140
    )

    doc.setFontSize(11)

    doc.text(
      item.description,
      20,
      150,
      {
        maxWidth: 170
      }
    )

    doc.save(
      `${item.title}.pdf`
    )

  }

  return (

    <div className='app-layout'>

      <Sidebar />

      <div className='main-content'>

        <h1 className='page-title'>
          Reports
        </h1>

        <div className='news-panel'>

          {

            news.length === 0

            ? (

              <p>No Reports Available</p>

            )

            : (

              news.map((item) => (

                <div
                  key={item._id}
                  className='report-card blockchain-card'
                >

                  <div>

                    <h3>
                      {item.title}
                    </h3>

                    <p>
                      {item.description}
                    </p>

                  </div>

                  <div className='report-status'>

                    <span
                      className={
                        item.status === 'Fake'
                        ? 'fake-badge'
                        : 'real-badge'
                      }
                    >

                      {item.status}

                    </span>

                    <p>
                      AI Score:
                      {' '}
                      {item.aiScore}
                    </p>

                    <p
                      style={{
                        marginTop: '10px',
                        color: '#38bdf8'
                      }}
                    >
                      {item.blockId}
                    </p>
                    <p
                      style={{
                        marginTop: '10px',
                        fontSize: '12px',
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
                        fontSize: '12px',
                        color: '#facc15',
                        wordBreak: 'break-all'
                      }}
                    >
                      Prev Hash:
                      {' '}
                      {item.previousHash}
                    </p>

                    <button
                      onClick={() => {

                        downloadPDF(item)

                      }}
                      className='download-btn'
                    >
                      Download PDF
                    </button>

                  </div>

                </div>

              ))

            )

          }

        </div>

      </div>

    </div>
  )
}