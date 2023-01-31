import React, { useEffect, useState } from 'react'
import './Links.css'

import Link from './Link'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../Admin/Admin'
import { useSearchParams } from 'react-router-dom'

export const generateId = () => {
  return Math.floor(Math.random() * 10000000)
}

const Links = () => {

  const [links, setLinks] = useState([])
  
  // useEffect(() => {
  //   setLinks([
  //     {
  //       text: "Link 1",
  //       href: "/",
  //       visible: true,
  //       id: generateId()
  //     },
  //     {
  //       text: "Link 2",
  //       href: "/",
  //       visible: true,
  //       id: generateId()
  //     },
  //     {
  //       text: "Link 3",
  //       href: "/",
  //       visible: true,
  //       id: generateId()
  //     },
  //   ])
  // }, [])
  const userId = 'kOcoyJuA2igqGu1CWycugSOxhPi2'

  useEffect(() => {
    const q = query(collection(db, "users"), where("user_id", "==", userId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setLinks(doc.data().links)
      });
    });
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <main>
      <ul>
        {links !== [] ? (
          links.map((link) => {
            if (link.visible === true) {
              return (
                <li key={link.id}>
                  <Link link={link}/>
                </li>
              )
            }
            return ''
          })
        ) : ''}
      </ul>
    </main>
  )
}

export default Links