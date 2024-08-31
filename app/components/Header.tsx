import React from 'react'
import Image from 'next/image'

const Header = () => {
  
  return (
    <a href='https://www.wisci.org/' className='h-full bg-slate-50 px-3 py-0 shadow-md'>
    <Image alt='logo' src="/Picture1.svg" height={100} width={190} />
   </a>
  )
}

export default Header