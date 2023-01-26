import React, { useEffect, useState } from 'react'
import { generateId } from '../Links/Links'

import "./Footer.css"

import { FaFacebook, FaInstagram, FaTwitter, FaYoutube} from 'react-icons/fa'

const Footer = () => {

  const [socialMediaLinks, setSocialMediaLinks] = useState([])

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
      <a href="/">
        <button>admin login</button>
      </a>
    </footer>
  )
}

export default Footer