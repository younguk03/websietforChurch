'use client'
import Header from '@/components/Header'
import React from 'react'
import styles from './page.module.css'
import Link from 'next/link'
import AllAlbum from '@/components/AllAlbum'
import Image from 'next/image'
import icon from '@/public/image/edit_icon.png'
import { useSession } from 'next-auth/react'

export default function Page() {
   const {status} = useSession()
   return (
      <div className={styles.main}>
         <div><Header/></div>
         <div>
            <div className={styles.main2}>
               <div className='flex mt-11'>
               <h2 className='text-2xl font-bold'>앨범</h2>
               {status === 'authenticated' && (
               <Link href={'/addAlbum'} className={styles.append}>
                  <Image src={icon} alt='write' height={20} className={styles.icon}/>
               글쓰기</Link>
               )}
               </div>
               <AllAlbum/>
            </div>
            
         </div>
      </div>
   )
}
