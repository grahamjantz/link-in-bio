import React, { useEffect, useState } from 'react'
import "./Admin.css"

import { getFirestore, query, where, onSnapshot, doc, updateDoc, collection, deleteDoc, arrayUnion } from "firebase/firestore";
import { useSearchParams } from 'react-router-dom';
import { app } from '../../utils/firebaseConfig';

import { FaEdit } from 'react-icons/fa'

import AdminLink from '../Links/AdminLink';

const generateLinkId = () => {
  let id = ''

  for (let i=0; i<15; i++) {
    id += String(Math.floor(Math.random() * 9))
  }
  return id
}

export const db = getFirestore(app)

const Admin = () => {

  const [searchParams, setSearchParams] = useSearchParams()
  const userId = searchParams.get('user_id')

  const [userData, setUserData]=useState({})
  const [links, setLinks] = useState([])

  const [toggleEditAnnouncement, setToggleEditAnnouncment] = useState(false)
  const [announcement, setAnnouncement] = useState('')

  const [toggleAddLink, setToggleAddLink] = useState(false)
  const [addLinkText, setAddLinkText] = useState('')
  const [addLinkLink, setAddLinkLink] = useState('')

  useEffect(() => {
    const q = query(collection(db, "users"), where("user_id", "==", userId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setUserData(doc.data())
        setLinks(doc.data().links)
      });
    });
    return () => {
      unsubscribe()
    }
  }, [userId])

  // console.log(userData)

  const handleSubmitUpdateAnnouncement = async (e) => {
    e.preventDefault()

    const docRef = doc(db, 'users', userId)

    await updateDoc(docRef, {
      'announcement': announcement
    })
    setAnnouncement('')
    setToggleEditAnnouncment(false)
  }

  const handleAddLinkSubmit = async (e) => {
    e.preventDefault()

    setToggleAddLink(false)
    const docRef = doc(db, 'users', userId)

    await updateDoc(docRef, {
      'links': arrayUnion({
        text: addLinkText,
        href: addLinkLink,
        visible: true,
        id: generateLinkId()
      })
    })

    setAddLinkText('')
    setAddLinkLink('')
  }

  const handleToggleVisible = async (linkId) => {
    links.map((link) => {
      if (link.id === linkId){
        link.visible === false ? link.visible = true : link.visible = false
      }
      return ''
    })
    const docRef = doc(db, 'users', userId)
    await updateDoc(docRef, {
      'links' : links
    })
  }

  const handleDeleteLink = async (linkId) => {
    links.map((link) => {
      if (link.id === linkId) {
        const index = links.indexOf(link)

        links.splice(index, 1)
      }
    })
    
    const docRef = doc(db, 'users', userId)

    await updateDoc(docRef, {
      'links': links
    })
  }

  const toggleMoveLinkUp = async () => {
    
  }

  return (
    <div className='admin'>
      <header>
        {/* <img src={imgLink} alt='hero'/> */}
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
      <div className='add-link'>
          <button onClick={() => toggleAddLink === false ? setToggleAddLink(true) : setToggleAddLink(false)}><h4>Add New Link</h4></button>
          {toggleAddLink === true ? (
            <form onSubmit={handleAddLinkSubmit}>
              <label htmlFor='text'>Display Text:</label>
              <input type='text' name='text' placeholder='text' onChange={(e) => setAddLinkText(e.target.value)}/>
              
              <label htmlFor='link'>Link:</label>
              <input type='text' name='link' placeholder='link' onChange={(e) => setAddLinkLink(e.target.value)}/>

              <input type='submit'/>
            </form>
          ) : ''}
      </div>
      <ul>
        {links !== [] ? (
          links.map((link) => {
            return (
              <li key={link.id}>
                <AdminLink link={link} handleToggleVisible={handleToggleVisible} handleDeleteLink={handleDeleteLink}/>
              </li>
            )
          })
        ) : ''}
      </ul>
    </div>
  )
}

export default Admin