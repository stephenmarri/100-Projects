import React from 'react'

const Wrapper = ({children}) => {
  return (
    <div id='wrapper' className='w-full h-3/5 sm:w-1/2 sm:h-1/2 rounded fr'>
        {children}
    </div>
  )
}

export default Wrapper