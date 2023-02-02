import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import AdminLink from '../../Links/AdminLink'
import { db } from '../Admin'

const generateLinkId = () => {
    let id = ''
  
    for (let i=0; i<15; i++) {
      id += String(Math.floor(Math.random() * 9))
    }
    return id
  }

const AdminLinksSection = ( { userData, updateDbLinks }) => {

    const [toggleAddLink, setToggleAddLink] = useState(false)
    const [addLinkText, setAddLinkText] = useState('')
    const [addLinkLink, setAddLinkLink] = useState('')

  

    const handleAddLinkSubmit = async (e) => {
        e.preventDefault()
    
        setToggleAddLink(false)
        const docRef = doc(db, 'users', userData.user_id)
    
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

        
    }

    const handleDeleteLink = async (linkId) => {
    userData.links.map((link) => {
        if (link.id === linkId) {
        const index = userData.links.indexOf(link)

        userData.links.splice(index, 1)
        }
        return ''
    })
    
    const docRef = doc(db, 'users', userData.user_id)

    await updateDoc(docRef, {
        'links': userData.links
    })
    }

    const toggleMoveLinkUp = async (linkId) => {
    let index;
    userData.links.map((link) => {
        if (link.id === linkId) {
        index = userData.links.indexOf(link)
        }
        return ''
    })
    if (index > 0 ) {
        let index2 = index - 1
    
        const temp = userData.links[index]
        userData.links[index] = userData.links[index2]
        userData.links[index2] = temp
    
        const docRef = doc(db, 'users', userData.user_id)
    
        await updateDoc(docRef, {
        'links': userData.links
        })
    }
    }

    const toggleMoveLinkDown = async (linkId) => {
    let index;
    userData.links.map((link) => {
        if (link.id === linkId) {
        index = userData.links.indexOf(link)
        }
        return ''
    })
    if (index < userData.links.length - 1) {
        let index2 = index + 1
    
        const temp = userData.links[index]
        userData.links[index] = userData.links[index2]
        userData.links[index2] = temp
    
        const docRef = doc(db, 'users', userData.user_id)
    
        await updateDoc(docRef,{
        'links': userData.links
        })
    }
    }

  return (
    <div style={{width: "100%", display: 'flex', flexDirection:'column', gap: '1rem'}}>
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
            {userData.links ? (
            userData.links.map((link) => {
                return (
                <li key={link.id}>
                    <AdminLink link={link} handleToggleVisible={handleToggleVisible} handleDeleteLink={handleDeleteLink} toggleMoveLinkUp={toggleMoveLinkUp} toggleMoveLinkDown={toggleMoveLinkDown}/>
                </li>
                )
            })
            ) : ''}
        </ul>
    </div>
  )
}

export default AdminLinksSection