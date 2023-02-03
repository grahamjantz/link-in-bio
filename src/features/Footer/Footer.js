import React, { useEffect, useState } from 'react'

import "./Footer.css"

import { FaDiscord, FaFacebook, FaInstagram, FaLinkedinIn, FaPinterest, FaReddit, FaSnapchatGhost, FaTiktok, FaTwitch, FaTwitter, FaYoutube } from 'react-icons/fa'


import { useNavigate } from 'react-router'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../Admin/Admin'

const Footer = () => {

  const [socialMediaLinks, setSocialMediaLinks] = useState([])

  const userId = 'kOcoyJuA2igqGu1CWycugSOxhPi2'
  
  useEffect(() => {
    const q = query(collection(db, "users"), where("user_id", "==", userId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setSocialMediaLinks(doc.data().social_media_links)
      });
    });
    return () => {
      unsubscribe()
    }
  }, [userId])


  const navigate = useNavigate()

  const displaySocialIcon = (icon) => {
    switch (icon) {
      case 'facebook':
        return <FaFacebook />
      case 'instagram':
        return <FaInstagram />
      case 'twitter':
        return <FaTwitter />
      case 'youtube':
        return <FaYoutube />
      case 'tiktok':
        return <FaTiktok /> 
      case 'pinterest':
        return <FaPinterest />
      case 'snapchat':
        return <FaSnapchatGhost />
      case 'reddit':
        return <FaReddit />
      case 'linkedin':
        return <FaLinkedinIn />
      case 'discord':
        return <FaDiscord />
      case 'twitch':
        return <FaTwitch />
      default:
        return ''
    }
  }

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
                  {displaySocialIcon(link.icon)}
                  </a>
                </li>
              )
            }
            return ''
          })
        ) : ''}
      </ul>
      <button onClick={handleClickAdminLogin}>admin</button>
    </footer>
  )
}

export default Footer