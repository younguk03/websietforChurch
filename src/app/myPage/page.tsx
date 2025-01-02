'use client'
import Header from '@/components/Header'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { Board } from '@/types/board'
import Link from 'next/link'
import DOMPurify from 'dompurify'
import default_avata from '@/public/default-avatar.png'
export default function Page() {
   const session = useSession()
   if (!session){
      alert('이용불가합니다. 로그인해주세요')
      redirect('./login')
   }
   const [count, setCount] = useState<number | null>(null)
   const [boardData, setBoardData] = useState<Board[]>([])
   useEffect(() => {
      const fetchData = async () => {
         const response = await fetch('/api/writingCount')
         const data = await response.json();
         setCount(data);
      }
      fetchData()
      
   },[])
   useEffect(() => {
      const fetchData2 = async () => {
         const response = await fetch('/api/myBoard')
         const data = await response.json()
         setBoardData(data)
      }
      fetchData2()
   },[])
   const filterImagesFromHTML = (html: string) => {
      // DOMPurify 사용하여 HTML 정화 및 이미지 태그 제거
      const cleanHtml = DOMPurify.sanitize(html, {
         FORBID_TAGS: ['img', 'div', 'span', 'b', 's', 'u', 'h1', 'h2', 'br', 'p'], // 특정 태그를 제거
      });
      return cleanHtml;
   };
   return (
      <div className={styles.main}>
         <div>
            <Header/>
         </div>
         <div className={styles.main2}>
            <h1 className='text-2xl pb-3 font-bold'>My profile</h1>
            <div className={styles.profile}>
               <div>
                  <Image src={session?.data?.user?.image ?? default_avata} width={100} height={100} className={styles.image} alt='image'/>
               </div>
               <div className='mt-3'>
                  <p>이름: {session.data?.user?.name}</p>
                  <p>이메일:{session.data?.user?.email}</p>
                  <p>글 작성 개수: {count}</p>
               </div>
            </div>
            <div>
               <div className='flex mt-9'>
                  <h1 className=' text-2xl font-bold'>내가 쓴 글</h1>
                  <Link href={'./addBoard'} className='border pt-1 ml-auto rounded-full pl-4 pr-4 hover:bg-black hover:text-white transition-all'>글쓰기</Link>
               </div>
               
               {boardData.map((board) => (
                  <div key={board._id} className={styles.bigList}>
                  <Link href={`./board/${board._id}`}>
                     <div className={styles.list}>
                        <div className='flex'>
                           <h2 className='font-bold'>{board.title}</h2>
                           <h2 className='text-gray-600 text-xs pt-1 pl-3'>-작성자: {board.user} </h2>
                           <p className='text-gray-600 text-xs pt-1 pl-3 ml-auto'>
                              작성일: {new Date(board.createdAt).toLocaleString()}
                              </p>
                        </div>
                        <div>
                           <div><div dangerouslySetInnerHTML={{ __html: filterImagesFromHTML(board.description) }} className={styles.description} />
                           </div></div>
                        <div className={styles.categorie}>카테고리: {board.categorie}</div>
                     </div>
                  </Link>
               </div>
               ))}
            </div>
         </div>
      </div>
   )
}
