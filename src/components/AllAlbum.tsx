'use client'
import { Board } from '@/types/board'
import React, { useEffect, useState } from 'react'
import styles from './allAlbum.module.css'
import Link from 'next/link'

export default function HomeAlbumList() {
   const [albumData, setAlbumData] = useState<Board[]>([])
   useEffect(() => {
      const fetchData = async () => {
         const response = await fetch('/api/allAlbum')
         const data = await response.json();
         setAlbumData(data)
      };
      fetchData();
   }, [])
   // HTML에서 첫 번째 이미지 태그의 src 추출
   const extractFirstImage = (html: string) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const imgTag = doc.querySelector('img'); // 첫 번째 <img> 태그
      return imgTag?.getAttribute('src') || null; // src 속성 추출
   };
   return (
      <>
      <div className={styles.display}>
         {albumData.map((album) => (
            <div key={album._id}>
               <Link href={`./album/${album._id}`}>
                  <div className={styles.list}>
                     <div>
                        {/* 첫 번째 이미지 표시 */}
                        {extractFirstImage(album.description) ? (
                           <img
                              src={extractFirstImage(album.description)!}
                              alt="Album Thumbnail"
                              className="h-40 object-cover rounded-md"
                           />
                        ) : (
                           <p>이미지가 없습니다</p>
                        )}<h2 className='font-bold pt-1 pl-1 hover:underline'>{album.title}</h2>
                        <h2 className={styles.user}>작성자: {album.user}</h2>
                        <p className={styles.date}>
                           작성일: {new Date(album.createdAt).toLocaleDateString()}
                        </p>
                     </div>
                  </div>
               </Link>
            </div>
         ))}
         </div>
      </>
   )
}