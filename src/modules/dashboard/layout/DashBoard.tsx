import React from 'react'

const DashBoard = ({children}: {children: React.ReactNode}) => {
  return (
    <div>DashBoard passed by layout
        {children}
    </div>
  )
}

export default DashBoard