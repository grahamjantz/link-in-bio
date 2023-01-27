import React, { useEffect, useState } from 'react'
import { generateId } from '../Links/Links'

import "./Footer.css"

import { FaFacebook, FaInstagram, FaTwitter, FaYoutube} from 'react-icons/fa'
import { useNavigate } from 'react-router'

const Footer = () => {

  const [socialMediaLinks, setSocialMediaLinks] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    setSocialMediaLinks([
      {
        icon: <FaFacebook />,
        href: "/",
        id: generateId(),
        visible: true
      },
      {
        icon: <FaInstagram />,
        href: "/",
        id: generateId(),
        visible: true
      },
      {
        icon: <FaTwitter />,
        href: "/",
        id: generateId(),
        visible: true
      },
      {
        icon: <FaYoutube />,
        href: "/",
        id: generateId(),
        visible: true
      },
    ])
  }, [])

  const handleClickAdminLogin = () => {
    navigate('/login')
  }

  return (
    <footer>
      <ul>
        {socialMediaLinks !== [] ? (
          socialMediaLinks.map((link) => {
            if (link.visible === true) {
              return (
                <li key={link.id}>
                  <a href={link.href}>
                    {link.icon}
                  </a>
                </li>
              )
            }
            return ''
          })
        ) : ''}
      </ul>
      <button onClick={handleClickAdminLogin}>admin login</button>
    </footer>
  )
}

export default Footer