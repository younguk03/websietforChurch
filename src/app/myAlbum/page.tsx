'use client'
import { Board } from '@/types/board'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Bookmark from '@/components/Bookmark'
import Image from 'next/image'
import Header from '@/components/Header'
import { useSession } from 'next-auth/react'
import default_avata from '@/public/default-avatar.png'


export default function HomeAlbumList() {
   const session = useSession()
   const [count1, setCount1] = useState<number | null>(null)
   const [count2, setCount2] = useState<number | null>(null)
   const [albumData, setAlbumData] = useState<Board[]>([])
   const [currentPages, setCurrentPages] = useState(1);
   const [totalPages, setTotalPages] = useState(1)
   const router = useRouter()
   const groupSize = 5;


   //현재 페이지 그룹 계산
   const currentGroup = Math.ceil(currentPages / groupSize); // 현재 그룹 번호
   const startPage = (currentGroup - 1) * groupSize + 1; // 현재 그룹의 시작 페이지
   const endPage = Math.min(startPage + groupSize - 1, totalPages); // 현재 그룹의 끝 페이지

   useEffect(() => {
      const fetchData = async (page: number) => {
         const response = await fetch(`/api/myAlbum?page=${page}`)
         const data = await response.json();

         setAlbumData(data.boards)
         setCurrentPages(data.page)
         setTotalPages(data.totalPage)
      };
      fetchData(currentPages)
   }, [currentPages])

   useEffect(() => {
      const fetchData2 = async () => {
         const response = await fetch('/api/albumcount')
         const data = await response.json();
         setCount1(data);
      }
      fetchData2()
      
   },[])
   useEffect(() => {
      const fetchData3 = async () => {
         const response = await fetch('/api/albumcount')
         const data = await response.json();
         setCount2(data);
      }
      fetchData3()
      
   },[])

   const handlePageChange = (newPage: number) => {
      setCurrentPages(newPage)
   }
   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      router.push(`myAlbum?page=${encodeURIComponent(currentPages)}`);
   }
   // HTML에서 첫 번째 이미지 태그의 src 추출
   const extractFirstImage = (html: string) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const imgTag = doc.querySelector('img'); // 첫 번째 <img> 태그
      return imgTag?.getAttribute('src') || null; // src 속성 추출
   };
   return (
      <div className={styles.main}>
         <div>
            <Header />
         </div>
         <div className={styles.main2}>
            <h1 className='text-2xl pb-3 font-bold'>My profile</h1>
            <div className={styles.profile}>
               <div>
                  <Image src={session.data?.user?.image ?? default_avata} width={100} height={100} className={styles.image} alt='image' />
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
                           <li className='mt-1 p-2 transition-all hover:bg-gray-200 text-blue-600'>나의 앨범</li>
                        </Link>
                        <Link href={'./bookmarkBoard'}>
                           <li className='mt-1 p-2 transition-all hover:bg-gray-200'>북마크한 게시글</li>
                        </Link>
                        <Link href={'./myPage'}>
                           <li className='mt-1 p-2 transition-all hover:bg-gray-200'>북마크한 앨범</li></Link>
                     </ul>
                  </div>
                  <div className={styles.myBoard}>
                     <h1 className=' text-2xl font-bold pl-3'>내가 쓴 글</h1>
                     <div className={styles.display}>
                        {albumData && albumData.map((album) => (
                           <div key={album._id}>
                              <div className={styles.list}>
                                 <Link href={`./album/${album._id}`}>
                                    <div>
                                       {/* 첫 번째 이미지 표시 */}
                                       {extractFirstImage(album.description) ? (
                                          <img
                                             src={extractFirstImage(album.description)!}
                                             alt="Album Thumbnail"
                                             className={styles.image}
                                          />
                                       ) : (
                                          <p>이미지가 없습니다</p>
                                       )}<h2 className='font-bold pt-1 hover:underline'>{album.title}</h2>
                                       <h2 className={styles.name}>작성자: {album.user}</h2>
                                       <p className={styles.clock}>
                                          작성일: {new Date(album.createdAt).toLocaleDateString()}
                                       </p>
                                    </div>
                                 </Link>
                                 <div className='float-right'>
                                    <Bookmark bookmark={album.bookmark} id={album._id} categorie={album.categorie} user={album.user} description={album.description} title={album.title} />
                                 </div>
                              </div>


                           </div>
                        ))}
                     </div>
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