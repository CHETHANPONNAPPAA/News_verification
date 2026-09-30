import { Link, useNavigate } from 'react-router-dom'

export default function Sidebar() {

  const role =
    localStorage.getItem('role')

  const navigate = useNavigate()

  const handleLogout = () => {

    localStorage.removeItem('token')

    localStorage.removeItem('role')

    navigate('/')

  }

  return (

    <div className='sidebar'>

      <div>

        <h1 className='logo'>
          TruthChain
        </h1>

        <p className='tagline'>
          AI + Blockchain Verification
        </p>

        <div className='nav-links'>

          <Link to='/dashboard'>
            Dashboard
          </Link>

          <Link to='/publish'>
            Publish News
          </Link>

          <Link to='/verify'>
            Verify News
          </Link>

          <Link to='/analytics'>
            Analytics
          </Link>

          <Link to='/reports'>
            Reports
          </Link>
          <Link to='/blockchain'>
              Blockchain
          </Link>
          {

            role === 'validator' && (

              <>

                <Link to='/live-news'>
                  Live Fact Check
                </Link>

                <Link to='/admin'>
                  Admin Panel
                </Link>

              </>

            )

          }

        </div>

      </div>

      <button
        className='logout-btn'
        onClick={handleLogout}
      >
        Logout
      </button>

    </div>

  )

}