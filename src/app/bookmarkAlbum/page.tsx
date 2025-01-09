'use client'
import { Board } from '@/types/board'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Bookmark from '@/components/Bookmark'
import Header from '@/components/Header'
import ProfileForm from '@/components/ProfileForm'


export default function HomeAlbumList() {
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
         const response = await fetch(`/api/bookmarkAlbum?page=${page}`)
         const data = await response.json();

         setAlbumData(data.boards)
         setCurrentPages(data.page)
         setTotalPages(data.totalPage)
      };
      fetchData(currentPages)
   }, [currentPages])

   const handlePageChange = (newPage: number) => {
      setCurrentPages(newPage)
   }
   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      router.push(`bookmarkAlbum?page=${encodeURIComponent(currentPages)}`);
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
            <ProfileForm/>
            <div>
               <div className='mt-9 flex'>
                  <div className={styles.menu}>
                     <h1 className={styles.menuTitle}>메뉴</h1>
                     <ul className={styles.menuUl}>
                        <Link href={'./myPage'}>
                           <li className='mt-1 p-2 transition-all hover:bg-gray-200 '>나의 게시글</li></Link>
                        <Link href={'./myAlbum'}>
                           <li className='mt-1 p-2 transition-all hover:bg-gray-200 '>나의 앨범</li>
                        </Link>
                        <Link href={'./bookmarkBoard'}>
                           <li className='mt-1 p-2 transition-all hover:bg-gray-200'>북마크한 게시글</li>
                        </Link>
                        <Link href={'./bookmarkAlbum'}>
                           <li className='mt-1 p-2 transition-all hover:bg-gray-200 text-blue-600'>북마크한 앨범</li></Link>
                     </ul>
                  </div>
                  <div className={styles.myBoard}>
                     <h1 className=' text-2xl font-bold pl-3'>북마크한 앨범</h1>
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