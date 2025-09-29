import DashBoard from '@/modules/dashboard/layout/DashBoard'
import React from 'react'

const DashBoardlayout = ({children}: {children: React.ReactNode}) => {
  return (
    <DashBoard>
        {children}
    </DashBoard>
  )
}

export default DashBoardlayout