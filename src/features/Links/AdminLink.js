import React from 'react'
import "./AdminLink.css"

import { FaWindowClose, FaEye, FaEyeSlash,FaChevronUp, FaChevronDown } from 'react-icons/fa'

const AdminLink = ({ link, handleToggleVisible, handleDeleteLink, toggleMoveLinkUp, toggleMoveLinkDown }) => {

    

  return (
    <div className={`admin-link ${link.visible === false ? 'hidden' : ''}`}>
        <div>
          <FaChevronUp onClick={() => toggleMoveLinkUp(link.id)}/>
          <FaChevronDown onClick={() => toggleMoveLinkDown(link.id)}/>
        </div>
        <section>
            <button>{link.text}</button>
        </section>
        <div>
          {link.visible === true ? <FaEye onClick={() => handleToggleVisible(link.id)}/> : <FaEyeSlash onClick={() => handleToggleVisible(link.id)}/>}
          <FaWindowClose onClick={() => handleDeleteLink(link.id)}/>
        </div>
    </div>
  )
}

export default AdminLink