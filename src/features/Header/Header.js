import React, { useEffect, useState } from 'react'
import "./Header.css"

import hero from '../../images/Hero_Image.jpeg'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../Admin/Admin'

const Header = () => {

  const [name, setName] = useState('')
  const [imgLink, setImgLink] = useState('')
  const [announcement, setAnnouncement] = useState('')

  useEffect(() => {
      setName('Graham')
      setImgLink(hero)
  }, [])

  const userId = 'kOcoyJuA2igqGu1CWycugSOxhPi2'

  useEffect(() => {
    const q = query(collection(db, "users"), where("user_id", "==", userId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setAnnouncement(doc.data().announcement)
      });
    });
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <header>
        <img src={imgLink} alt='hero'/>
        <section>
          <h1>{name}</h1>
          <p>{announcement}</p>
        </section>
    </header>
  )
}

export default Header