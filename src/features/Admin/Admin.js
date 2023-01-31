import React, { useEffect, useState } from 'react'
import "./Admin.css"

import { getFirestore, query, where, onSnapshot, doc, updateDoc, collection, arrayUnion } from "firebase/firestore";
import { useSearchParams } from 'react-router-dom';
import { app } from '../../utils/firebaseConfig';

import { FaEdit, FaFacebook, FaInstagram, FaTwitter, FaYoutube} from 'react-icons/fa'

import AdminLink from '../Links/AdminLink';
import { generateId } from '../Links/Links';

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
      return ''
    })
    
    const docRef = doc(db, 'users', userId)

    await updateDoc(docRef, {
      'links': links
    })
  }

  const toggleMoveLinkUp = async (linkId) => {
    let index;
    links.map((link) => {
      if (link.id === linkId) {
        index = links.indexOf(link)
      }
      return ''
    })
    let index2 = index - 1

    const temp = links[index]
    links[index] = links[index2]
    links[index2] = temp

    const docRef = doc(db, 'users', userId)

    await updateDoc(docRef, {
      'links': links
    })
  }

  const toggleMoveLinkDown = async (linkId) => {
    let index;
    links.map((link) => {
      if (link.id === linkId) {
        index = links.indexOf(link)
      }
      return ''
    })
    let index2 = index + 1

    const temp = links[index]
    links[index] = links[index2]
    links[index2] = temp

    const docRef = doc(db, 'users', userId)

    await updateDoc(docRef,{
      'links': links
    })
  }

  return (
    <div className='admin'>
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
      <ul className='links'>
        {links !== [] ? (
          links.map((link) => {
            return (
              <li key={link.id}>
                <AdminLink link={link} handleToggleVisible={handleToggleVisible} handleDeleteLink={handleDeleteLink} toggleMoveLinkUp={toggleMoveLinkUp} toggleMoveLinkDown={toggleMoveLinkDown}/>
              </li>
            )
          })
        ) : ''}
      </ul>
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
        <button>Edit Socials</button>
      </footer>
    </div>
  )
}

export default Admin