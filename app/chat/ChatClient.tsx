'use client'
import { User } from '@prisma/client'
import React, { useState } from 'react'

interface ChatClientProps {
  currentUser?: User
}

const ChatClient = ({ currentUser }: ChatClientProps) => {
  const [reciver, setRevicer] = useState({
    receiverId: "",
    receiverName: "",
    recevierImage: "",
  })

  const [layout, setLayout] = useState(false);

  return (
    <main>
      <div className='grid grid-cols-[1fr] md:grid-cols-[300px_1fr]'>
        <section className={`md:flex ${layout && 'hidden'}`}>Contact Component</section>
        <section className={`md:flex ${!layout && 'hidden'}`}>Chat Component</section>
      </div>
    </main>
  )
}

export default ChatClient