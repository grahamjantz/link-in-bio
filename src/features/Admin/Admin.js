import React, { useEffect, useState } from 'react'
import "./Admin.css"

import { getFirestore, query, where, onSnapshot, doc, updateDoc, collection } from "firebase/firestore";
import { useSearchParams } from 'react-router-dom';
import { app } from '../../utils/firebaseConfig';

import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'

import { useDispatch, useSelector } from 'react-redux';
import { addUserData, selectUserData } from './AdminSlice';
import AdminHeader from './AdminHeader/AdminHeader';
import AdminLinksSection from './AdminLinksSection/AdminLinksSection';
import AdminFooter from './AdminFooter/AdminFooter';



export const db = getFirestore(app)

const Admin = () => {

  const userData = useSelector(selectUserData)

  const dispatch = useDispatch()

  const [searchParams, setSearchParams] = useSearchParams()
  const userId = searchParams.get('user_id')

  const [links, setLinks] = useState([])

  

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
        setLinks(doc.data().links)
      });
    });

    return () => {
      unsubscribe()
    }
  }, [userId, dispatch])

  const handleToggleVisible = async (linkId) => {
    const temp = links
    temp.forEach((link) => {
      if (link.id === linkId) {
        link.visible === true ? link.visible = false : link.visible = true
      }
    })

    const docRef = doc(db, 'users', userId)
    await updateDoc(docRef, { 
      'links': temp
    })
  }

  const handleDeleteLink = async (linkId) => {
    const temp = links
    temp.map((link) => {
        if (link.id === linkId) {
          const index = temp.indexOf(link)

          temp.splice(index, 1)
        }
        return ''
    })
    
    const docRef = doc(db, 'users', userId)

    await updateDoc(docRef, {
        'links': temp
    })
  }

  const toggleMoveLinkUp = async (linkId) => {
    let index;
    const tempArr = links
    tempArr.map((link) => {
        if (link.id === linkId) {
          index = tempArr.indexOf(link)
        }
        return ''
    })
    if (index > 0 ) {
        let index2 = index - 1
    
        const temp = tempArr[index]
        tempArr[index] = tempArr[index2]
        tempArr[index2] = temp
    
        const docRef = doc(db, 'users', userId)
    
        await updateDoc(docRef, {
        'links': tempArr
        })
    }
  }

  const toggleMoveLinkDown = async (linkId) => {
    let index;
    const tempArr = links
    tempArr.map((link) => {
        if (link.id === linkId) {
          index = tempArr.indexOf(link)
        }
        return ''
    })
    if (index < tempArr.length - 1) {
        let index2 = index + 1
    
        const temp = tempArr[index]
        tempArr[index] = tempArr[index2]
        tempArr[index2] = temp
    
        const docRef = doc(db, 'users', userId)
    
        await updateDoc(docRef,{
        'links': tempArr
        })
    }
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

  const handleEditSocialLink = async (e, linkId, url) => {
    e.preventDefault()

    let temp = socialMediaLinks
    temp.forEach((link) => {
      if (link.id === linkId) {
        link.href = url
      }
    })
    
    const docRef = doc(db, 'users', userId)

    await updateDoc(docRef, {
      'social_media_links': temp
    })
  }

  return (
    <div className='admin'>
      <AdminHeader userData={userData} userId={userId}/>
      <AdminLinksSection 
        userData={userData} 
        handleToggleVisible={handleToggleVisible}
        handleDeleteLink={handleDeleteLink}
        toggleMoveLinkUp={toggleMoveLinkUp}
        toggleMoveLinkDown={toggleMoveLinkDown}
      />
      <AdminFooter 
        socialMediaLinks={socialMediaLinks}
        handleToggleSocialVisible={handleToggleSocialVisible}
        handleEditSocialLink={handleEditSocialLink}
      />
    </div>
  )
}

export default Admin