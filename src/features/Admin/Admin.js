import React, { useEffect, useState } from 'react'
import "./Admin.css"

import { getFirestore, query, where, onSnapshot, doc, updateDoc, collection } from "firebase/firestore";
import { useSearchParams } from 'react-router-dom';
import { app } from '../../utils/firebaseConfig';

import { FaEdit, FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaEye, FaEyeSlash } from 'react-icons/fa'

import { useDispatch, useSelector } from 'react-redux';
import { addUserData, selectUserData } from './AdminSlice';
import AdminHeader from './AdminHeader/AdminHeader';
import AdminLinksSection from './AdminLinksSection/AdminLinksSection';



export const db = getFirestore(app)

const Admin = () => {

  const userData = useSelector(selectUserData)
  console.log(userData)

  const dispatch = useDispatch()

  const [searchParams, setSearchParams] = useSearchParams()
  const userId = searchParams.get('user_id')

  const [toggleEditSocials, setToggleEditSocials] = useState(false)

  const [socialMediaLinks, setSocialMediaLinks] = useState([
    {
      icon: <FaFacebook />,
      href: "/",
      id: 'facebook',
      visible: true
    },
    {
      icon: <FaInstagram />,
      href: "/",
      id: 'instagram',
      visible: true
    },
    {
      icon: <FaTwitter />,
      href: "/",
      id: 'twitter',
      visible: true
    },
    {
      icon: <FaYoutube />,
      href: "/",
      id: 'youtube',
      visible: true
    },
  ])


  useEffect(() => {
    const q = query(collection(db, "users"), where("user_id", "==", userId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        dispatch(addUserData(doc.data()))
        setSocialMediaLinks(doc.data().social_media_links)
      });
    });

    return () => {
      unsubscribe()
    }
  }, [userId, dispatch])

  const updateDbLinks = async (links) => {
    const docRef = doc(db, 'users', userId)
    await updateDoc(docRef, {
      'links': links
    }) 
  }

  
  
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

  const handleToggleSocialVisible = async (linkId) => {
    let temp = socialMediaLinks
    temp.forEach((link) => {
      if (link.id === linkId) {
        link.visible === false ? link.visible = true : link.visible = false
      }
    })

    const docRef = doc(db, 'users', userId)

    await updateDoc(docRef, {
      'social_media_links': temp
    })
  }

  const handleEditSocialLink = async (linkId, url) => {
    let temp = socialMediaLinks
    temp.forEach((link) => {
      if (link.id === linkId) {
        link.href = url
      }
    })
  }

  return (
    <div className='admin'>
      <AdminHeader userData={userData} userId={userId}/>
      <AdminLinksSection userData={userData} updateDbLinks={updateDbLinks}/>
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
                  <li key={link.id}>
                    {displaySocialIcon(link.icon)}
                    <div>
                      {link.visible === true ? 
                        <FaEye onClick={() => handleToggleSocialVisible(link.id)}/> :
                        <FaEyeSlash onClick={() => handleToggleSocialVisible(link.id)}/>
                      }
                      <FaEdit onClick={() => handleEditSocialLink(link.id)}/>
                    </div>
                  </li>
                )
              })}
            </ul>
          ) : ''
        ) : ''}
        </div>
      </footer>
    </div>
  )
}

export default Admin