import React, { useEffect, useState } from 'react'
import { generateId } from '../Links/Links'

import "./Footer.css"

import { FaFacebook, FaInstagram, FaTwitter, FaYoutube} from 'react-icons/fa'

const Footer = () => {

  const [socialMediaLinks, setSocialMediaLinks] = useState([])

  useEffect(() => {
    setSocialMediaLinks([
      {
        icon: FaFacebook,
        href: "/",
        id: generateId(),
        visible: true
      },
      {
        icon: "I",
        href: "/",
        id: generateId(),
        visible: true
      },
      {
        icon: "T",
        href: "/",
        id: generateId(),
        visible: true
      },
      {
        icon: "Y",
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
    </footer>
  )
}

export default Footer