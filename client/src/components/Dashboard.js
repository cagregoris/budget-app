import React, {Fragment} from 'react'

function Dashboard({setAuth}) {
  return (
    <Fragment>
      <h1>Dashboard</h1>
      <button onClick={() => setAuth(false)}>Logout</button>
    </Fragment>
  )
}

export default Dashboard