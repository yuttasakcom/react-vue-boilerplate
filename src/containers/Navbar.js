import React from 'react'
import { Link } from 'react-router-dom'
import '@/assets/css/navbar.scss'

const Navbar = () => (
  <nav>
    <div className="text-center">
      <Link to="/">Home</Link>
    </div>
  </nav>
)

export default Navbar