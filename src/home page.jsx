import React from 'react'

export default function header() {
  return (
    <header>
    <nav className="navbar">
        <ul>
          <li className="l1">DEV@DEAKIN</li>
           <input className = "bar" placeholder="Search" />
           <li><a href="">Post</a></li>
           <li><a href="/login">Login</a></li>
        </ul>
    </nav>
</header>
  )
}
