import React, { useEffect, useState } from 'react'
import "./Header.css"

import hero from '../../images/Hero_Image.jpeg'

const Header = () => {

    const [name, setName] = useState('')
    const [imgLink, setImgLink] = useState('')

    useEffect(() => {
        setName('Graham')
        setImgLink(hero)
    }, [])

  return (
    <header>
        <img src={imgLink} alt='hero'/>
        <h1>{name}</h1>
    </header>
  )
}

export default Header