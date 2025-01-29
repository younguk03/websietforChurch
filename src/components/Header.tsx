'use client'
import React, { useState } from 'react'
import styles from './header.module.css'
import Image from 'next/image'
import logo from '@/public/logo.png'
import searchLogo from '@/public/search-logo.png'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { RxAvatar } from 'react-icons/rx'

export default function Header() {
   const { status, data: session } = useSession()
   const [inputValue, setInputValue] = useState('');
   const router = useRouter()

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      router.push(`/searchBoard?search=${encodeURIComponent(inputValue)}`);
   }
   return (
      <div className={styles.container}>
         <div>
            <Link href={'/'}>
               <Image src={logo} alt='logo' height={50} className={styles.image} /></Link>
         </div>

         <div className={styles.right}>
            <span>

               <form action="./searchBoard" className={styles.searchInput_form} onSubmit={handleSubmit}>
                  <input type="text" className={styles.searchInput} placeholder='게시글 검색' onChange={(e) => setInputValue(e.target.value)} />
                  <button className={styles.search_logo}>
                     <Image src={searchLogo} alt='logo' width={23} />
                  </button>
               </form>
            </span>
         </div>
         {status == 'authenticated' ? (
            <div>
               {session.user?.image ? (
                  <div className='flex'>
                     <button className={styles.logout} onClick={() => signOut()}>
                        로그아웃
                     </button>
                     <Link href={'/myPage'} className='flex'>
                        <span className='mt-6 mr-3 font-bold'>{session?.user?.name}</span>
                        <Image src={session?.user?.image ?? '/default-avatar.png'} width={45} height={45} alt='user'
                           className={styles.icon1}
                           style={{ objectFit: 'cover' }}
                        />
                     </Link>
                  </div>
               ) : (
                  <div className='flex'>
                     <button className={styles.logout} onClick={() => signOut()}>
                        로그아웃
                     </button>
                     <Link href={'/myPage'} className='flex'>
                        <span className='mt-6 mr-2 font-bold'>{session?.user?.name}</span>
                        <RxAvatar size={45} className={styles.icon2} />
                     </Link>
                  </div>
               )}
            </div>
         ) : (
            <Link href={'./login'} className={styles.login}>
               로그인
            </Link>
         )}
      </div>
   )
}
