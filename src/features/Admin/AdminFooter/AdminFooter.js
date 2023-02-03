import React, { useState } from 'react'

import { FaDiscord, FaFacebook, FaInstagram, FaLinkedinIn, FaPinterest, FaReddit, FaSnapchatGhost, FaTiktok, FaTwitch, FaTwitter, FaYoutube } from 'react-icons/fa'
import AdminSocialFooterLink from './AdminSocialFooterLink'


const AdminFooter = ({ socialMediaLinks, handleToggleSocialVisible, handleEditSocialLink, toggleMoveSocialLinkUp, toggleMoveSocialLinkDown }) => {

  const [toggleEditSocials, setToggleEditSocials] = useState(false)

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

    const handleToggleEditSocials = () => {
      toggleEditSocials === false ? setToggleEditSocials(true) : setToggleEditSocials(false)
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
        <button onClick={handleToggleEditSocials}>Edit Socials</button>
        <div className='edit-socials'>
        {toggleEditSocials === true ? (
          socialMediaLinks !== [] ? (
            <ul>
              {socialMediaLinks.map((link) => {
                return (
                    <AdminSocialFooterLink 
                        key={link.id}
                        link={link}
                        displaySocialIcon={displaySocialIcon}
                        handleToggleSocialVisible={handleToggleSocialVisible}
                        handleEditSocialLink={handleEditSocialLink}
                        toggleMoveSocialLinkUp={toggleMoveSocialLinkUp}
                        toggleMoveSocialLinkDown={toggleMoveSocialLinkDown}
                    />
                )
              })}
            </ul>
          ) : ''
        ) : ''}
        </div>
      </footer>
  )
}

export default AdminFooter