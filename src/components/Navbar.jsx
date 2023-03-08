import React from 'react'
import { Link } from 'react-router-dom'
import ConnectionButton from './ConnectionButton'

const Navbar = () => {
  return (
    <div className='flex justify-end bg-black py-3 border-b border-gray-300'>

        <ConnectionButton />
        
    </div>
  )
}

export default Navbar