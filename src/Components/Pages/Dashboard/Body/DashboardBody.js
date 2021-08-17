import React from 'react'
import AccountInfo from './AccountInfo'
import MainContent from './MainContent'

const DashboardBody = () => {
  return (
    <main className="dashboard-main">
      <AccountInfo />
      <MainContent />
    </main>
  )
}

export default DashboardBody
