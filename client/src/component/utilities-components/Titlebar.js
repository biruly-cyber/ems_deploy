import React from 'react'

const Titlebar = ({title}) => {
  return (
    <div >
        <h1 className='text-white bg-slate-900 p-2 rounded w-36'>{title}</h1>
    </div>
  )
}

export default Titlebar