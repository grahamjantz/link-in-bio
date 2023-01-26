import React from 'react'
import "./Link.css"

const Link = ({ link }) => {
  return (
    <a href={link.href}>
      <button>
        {link.text}
      </button>
    </a>
  )
}

export default Link