import React, { useState } from 'react'

import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import AdminSocialFooterLink from './AdminSocialFooterLink'


const AdminFooter = ({ socialMediaLinks, handleToggleSocialVisible, handleEditSocialLink }) => {

    const [toggleEditSocials, setToggleEditSocials] = useState(false)

    const displaySocialIcon = (icon) => {
        if (icon === 'facebook') {
          return (
            <FaFacebook />
          )
        } else if (icon === 'instagram') {
          return (
            <FaInstagram />
          )
        } else if (icon === 'twitter') {
          return (
            <FaTwitter />
          )
        } else if (icon === 'youtube') {
          return (
            <FaYoutube />
          )
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