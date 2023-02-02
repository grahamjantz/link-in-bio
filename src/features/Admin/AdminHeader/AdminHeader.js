import { doc, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../Admin'
import { FaEdit } from 'react-icons/fa'


const AdminHeader = ({ userData, userId }) => {


    const [toggleEditAnnouncement, setToggleEditAnnouncment] = useState(false)
    const [announcement, setAnnouncement] = useState('')

    const handleSubmitUpdateAnnouncement = async (e) => {
        e.preventDefault()
    
        const docRef = doc(db, 'users', userId)
    
        await updateDoc(docRef, {
          'announcement': announcement
        })
        setAnnouncement('')
        setToggleEditAnnouncment(false)
      }

  return (
    <header>
        <img src='https://firebasestorage.googleapis.com/v0/b/link-in-bio-ce121.appspot.com/o/kOcoyJuA2igqGu1CWycugSOxhPi2%2FHero_Image.jpeg?alt=media&token=d8a13ed1-a4bf-470e-b36c-84befd802859' alt='hero'/>
        <section>
          <h1>{userData.name}</h1>
          <p>{userData.announcement} {<FaEdit onClick={() => setToggleEditAnnouncment(true)}/>}</p>
          {toggleEditAnnouncement === true ? (
            <form onSubmit={handleSubmitUpdateAnnouncement}>
              <input type='text' onChange={(e) => setAnnouncement(e.target.value)} value={announcement} placeholder='enter announcement'/>
              <input type='submit'/>
            </form>
          ) : ''}
        </section>
      </header>
  )
}

export default AdminHeader