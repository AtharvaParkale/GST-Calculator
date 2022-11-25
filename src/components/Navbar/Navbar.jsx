import React from 'react'
import "./Navbar.css"

function Navbar() {
  return (
    <div className="navbar_container">
        <div className="nav_logo">
            <h2>Value Plus</h2>
        </div>
        <div className="nav_links">
            <ul className="nav_ul">
                <li>What is GST?</li>
                <li>Types of GST</li>
                <li>GST Formulas</li>
                <li>FAQs</li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar