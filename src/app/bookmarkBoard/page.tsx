'use client'
import Header from '@/components/Header'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { Board } from '@/types/board'
import Link from 'next/link'
import DOMPurify from 'dompurify'
import default_avata from '@/public/default-avatar.png'
import Bookmark from '@/components/Bookmark'
import { useRouter } from 'next/navigation'


export default function Page() {
   const session = useSession()
   const [count1, setCount1] = useState<number | null>(null)
   const [count2, setCount2] = useState<number | null>(null)
   const [boardData, setBoardData] = useState<Board[]>([])
   const [totalPages,setTotalPages] = useState(1)
   const [currentPages,setCurrentPages] = useState(1)
   const groupSize = 5
   const router = useRouter()

   //현재 페이지 그룹 계산
   const currentGroup = Math.ceil(currentPages / groupSize); // 현재 그룹 번호
   const startPage = (currentGroup - 1) * groupSize + 1; // 현재 그룹의 시작 페이지
   const endPage = Math.min(startPage + groupSize - 1, totalPages); // 현재 그룹의 끝 페이지

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
   useEffect(() => {
      const fetchData2 = async (page:number) => {
         const response = await fetch(`/api/bookmarkBoard?page=${page}`)
         const data = await response.json()
         setCurrentPages(data.page)
         setTotalPages(data.totalPage)
         setBoardData(data.userBoard)
      }
      fetchData2(currentPages)
   },[currentPages])

   const handlePageChange = (newPage: number) => {
      setCurrentPages(newPage)
   }

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      router.push(`/bookmarkBoard?page=${encodeURIComponent(currentPages)}`);
   }

   
   const filterImagesFromHTML = (html: string) => {
      // DOMPurify 사용하여 HTML 정화 및 이미지 태그 제거
      const cleanHtml = DOMPurify.sanitize(html, {
         FORBID_TAGS: ['img', 'div', 'span', 'b', 's', 'u', 'h1', 'h2', 'br', 'p','font'], // 특정 태그를 제거
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
                  <Image src={session.data?.user?.image ?? default_avata} width={100} height={100} className={styles.image} alt='image'/>
               </div>
               <div className='mt-3'>
                  <p>이름: {session.data?.user?.name}</p>
                  <p>게시글 작성 개수: {count1}</p>
                  <p>앨범 작성 개수: {count2}</p>
                  
               </div>
               <div className='ml-auto'>
                  <div className={styles.append1}>
                  <Link href={'/addBoard'}>게시글 작성</Link>
                  </div>
                  <div className={styles.append1}>
                  <Link href={'/addAlbum'}>앨범 작성</Link>
                  </div>
               </div>
            </div>
            <div>
               <div className='mt-9 flex'>
                  <div className={styles.menu}>
                     <h1 className={styles.menuTitle}>메뉴</h1>
                     <ul className={styles.menuUl}>
                        <Link href={'./myPage'}>
                        <li className='mt-1 p-2 transition-all hover:bg-gray-200 '>나의 게시글</li></Link>
                        <Link href={'./myAlbum'}>
                        <li className='mt-1 p-2 transition-all hover:bg-gray-200'>나의 앨범</li>
                        </Link>
                        <Link href={'./bookmarkBoard'}>
                        <li className='mt-1 p-2 transition-all hover:bg-gray-200 text-blue-600'>북마크한 게시글</li>
                        </Link>
                        <Link href={'./myPage'}>
                        <li className='mt-1 p-2 transition-all hover:bg-gray-200'>북마크한 앨범</li></Link>
                     </ul>
                  </div>
                  <div className={styles.myBoard}>
                  <h1 className=' text-2xl font-bold pl-3'>북마크한 게시글</h1>
               {boardData&&boardData.map((board) => (
                  <div key={board._id} className={styles.bigList}>
                  
                     <div className={styles.list}>
                        <div className='flex'>
                           <h2 className='font-bold'>{board.title}</h2>
                           <h2 className='text-gray-600 text-xs pt-1 pl-3'>-작성자: {board.user} </h2>
                           <p className='text-gray-600 text-xs pt-1 pl-3 ml-auto'>
                              작성일: {new Date(board.createdAt).toLocaleDateString()}
                              </p>
                              <Bookmark bookmark={board.bookmark} id={board._id} categorie={board.categorie} user={board.user} description={board.description} title={board.title}/>
                        </div>
                        <div>
                           <div><Link href={`./board/${board._id}`}><div dangerouslySetInnerHTML={{ __html: filterImagesFromHTML(board.description) }} className={styles.description} /></Link>
                           </div></div>
                        <div className={styles.categorie}>카테고리: {board.categorie}</div>
                     </div>
                  
               </div>
               ))}
            
            <div className={styles.pagination1}>
            <form onSubmit={handleSubmit}>
               <button onClick={(() => handlePageChange(currentPages - 1))}
                  disabled={currentPages === 1} className={styles.pagination2}>&lt;</button>
               {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
                  const page = startPage + index;
                  return (
                     <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`${currentPages === page ? "active" : ""} ${styles.pagination3}`}
                     >
                        {page}
                     </button>
                  );
               })}
               <button
                  onClick={() => handlePageChange(currentPages + 1)}
                  disabled={currentPages === totalPages} className={styles.pagination4}>&gt;</button>
            </form>
            </div>
         </div>
         </div>
         </div>
      </div>
      </div>
   )
}