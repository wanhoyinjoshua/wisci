import React from 'react'
import Image from 'next/image'
const Header = () => {
  return (
    <div className='h-full bg-slate-50 px-3 py-0 shadow-md'>
    <Image alt='' src="/Picture1.svg" height={100} width={190} />
   </div>
  )
}

export default Header