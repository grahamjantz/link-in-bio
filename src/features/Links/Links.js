import React, { useEffect, useState } from 'react'
import './Links.css'

import Link from './Link'

export const generateId = () => {
  return Math.floor(Math.random() * 10000000)
}

const Links = () => {

  const [links, setLinks] = useState([])


  useEffect(() => {
    setLinks([
      {
        text: "Link 1",
        href: "/",
        visible: true,
        id: generateId()
      },
      {
        text: "Link 2",
        href: "/",
        visible: true,
        id: generateId()
      },
      {
        text: "Link 3",
        href: "/",
        visible: true,
        id: generateId()
      },
    ])
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