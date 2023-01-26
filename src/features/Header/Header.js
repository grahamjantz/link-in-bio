import React, { useEffect, useState } from 'react'
import "./Header.css"

import hero from '../../images/Hero_Image.jpeg'

const Header = () => {

  const [name, setName] = useState('')
  const [imgLink, setImgLink] = useState('')
  const [announcement, setAnnouncement] = useState('')

  useEffect(() => {
      setName('Graham')
      setImgLink(hero)
      setAnnouncement('Announcement')
  }, [])

  return (
    <header>
        <img src={imgLink} alt='hero'/>
        <section>
          <h1>{name}</h1>
          <p>{announcement}</p>
        </section>
    </header>
  )
}

export default Header