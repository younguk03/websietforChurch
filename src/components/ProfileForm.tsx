import React, { useEffect, useState } from 'react'
import styles from './profile.module.css'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import default_avata from '@/public/default-avatar.png'
import Link from 'next/link'
import { FiEdit } from 'react-icons/fi'
import { BiPhotoAlbum } from 'react-icons/bi'

export default function ProfileForm() {
   const session = useSession()
   const [count1, setCount1] = useState<number | null>(null)
   const [count2, setCount2] = useState<number | null>(null)
   useEffect(() => {
      const fetchData = async () => {
         const response = await fetch('/api/writingCount')
         const data = await response.json();
         setCount1(data);
      }
      fetchData()
      
   },[])
   useEffect(() => {
      const fetchData3 = async () => {
         const response = await fetch('/api/albumcount')
         const data = await response.json();
         setCount2(data);
      }
      fetchData3()
      
   },[])
   return (
      <div>
         <h1 className='text-2xl pb-3 font-bold'>My profile</h1>
            <div className={styles.profile}>
               <div>
                  <Image src={session.data?.user?.image ?? default_avata} width={100} height={100} className={styles.image} alt='image'/>
               </div>
               <div className='mt-3'>
                  <p>이름: {session.data?.user?.name}</p>
                  <p>게시글 작성 개수: {count1}</p>
                  <p>앨범 작성 개수: {count2}</p>
                  
               </div>
               <div className='ml-auto'>
                  <div className={styles.append}>
                  <Link href={'/addBoard'} className='flex justify-center gap-1'><FiEdit size={22}/>게시글 작성</Link>
                  </div>
                  <div className={styles.append}>
                  <Link href={'/addAlbum'} className='flex justify-center gap-1'><BiPhotoAlbum size={23}/>앨범 작성</Link>
                  </div>
               </div>
            </div>
      </div>
   )
}
