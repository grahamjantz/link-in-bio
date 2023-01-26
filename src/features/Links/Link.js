import React from 'react'
import "./Link.css"

const Link = ({ link }) => {
  return (
    <a href={link.href}>
      {link.text}
    </a>
  )
}

export default Link