import React from 'react'
import "./AdminLink.css"

import { FaWindowClose, FaEye, FaEyeSlash,FaChevronUp, FaChevronDown } from 'react-icons/fa'
import { doc } from 'firebase/firestore'
import { db } from '../Admin/Admin'

const AdminLink = ({ link, handleToggleVisible, handleDeleteLink }) => {

    

  return (
    <div className={`admin-link ${link.visible === false ? 'hidden' : ''}`}>
        <div>
          <FaChevronUp />
          <FaChevronDown />
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