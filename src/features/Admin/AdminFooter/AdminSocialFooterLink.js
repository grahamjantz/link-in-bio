import React, { useState } from 'react'

import { FaEdit, FaEye, FaEyeSlash } from 'react-icons/fa'


const AdminSocialFooterLink = ({ link, displaySocialIcon, handleToggleSocialVisible,handleEditSocialLink }) => {

    const [toggleEditSocialLink, setToggleEditSocialLink] = useState(false)
    const [linkUrl, setLinkUrl] = useState('')

  return (
    <li key={link.id}>
        <section>
            {displaySocialIcon(link.icon)}
            <div>
                {link.visible === true ? 
                    <FaEye onClick={() => handleToggleSocialVisible(link.id)}/> :
                    <FaEyeSlash onClick={() => handleToggleSocialVisible(link.id)}/>
                }
                <FaEdit onClick={() => {
                    toggleEditSocialLink === false ? setToggleEditSocialLink(true) : setToggleEditSocialLink(false)
                }}/>
            </div>
        </section>
        {toggleEditSocialLink === true ? (
            <form onSubmit={(e) => {
                handleEditSocialLink(e, link.id, linkUrl)
                setToggleEditSocialLink(false)
                setLinkUrl('')
            }}>
                <label htmlFor='link-url'>Enter Link:</label>
                <div>
                    <input type='text' value={linkUrl} name='link-url' onChange={(e) => setLinkUrl(e.target.value)}/>
                    <input type='submit'/>
                </div>
            </form>
        ) : ''}
    </li>
  )
}

export default AdminSocialFooterLink