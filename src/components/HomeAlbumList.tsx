'use client'
import { Board } from '@/types/board'
import React, { useEffect, useState } from 'react'
import styles from './homeAlbumList.module.css'
import Link from 'next/link'
import Image from 'next/image'

export default function HomeAlbumList() {
   const [albumData, setAlbumData] = useState<Board[]>([])
   useEffect(() => {
      const fetchData = async () => {
         const response = await fetch('/api/homeAlbum')
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
      <div className={styles.main}>
         {albumData.map((album) => (
            <div key={album._id} className={styles.bigList}>
               <Link href={`./album/${album._id}`}>
                  <div className={styles.list}>
                     <div>
                        {/* 첫 번째 이미지 표시 */}
                        {extractFirstImage(album.description) ? (
                           <Image
                              src={extractFirstImage(album.description)!}
                              alt="Album Thumbnail"
                              className={styles.image}
                           />
                        ) : (
                           <p>이미지가 없습니다</p>
                        )}<h2 className='font-bold'>{album.title}</h2>
                        <h2 className='text-gray-600 text-xs pt-1 pl-3'>-작성자: {album.user}</h2>
                        <p className='text-gray-600 text-xs pt-1 pl-3 ml-auto'>
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