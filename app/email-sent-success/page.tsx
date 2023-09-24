import React from 'react'

const page = () => {
  return (
    <div className="grid h-screen w-screen px-4 bg-white place-content-center">
  <div className="max-w-sm text-center">
    
    <div className='flex justify-center items-center'>
    <img  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8o3z2bJsVFP1WiW0dWYel_XNKKtie0OPtQ_1kw62vBw&s'></img>


    </div>
   
    <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
      Email sent succesfully
    </p>

    <p className="mt-4 text-gray-500">Please advise to check junk mail if email cannot be located in the inbox</p>

    <a
      href="/"
      className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring"
    >
      Homepage
    </a>
  </div>
</div>
  )
}

export default page