'use client'
import { Board } from '@/types/board'
import DOMPurify from 'dompurify'
import React, { useEffect, useState } from 'react'
import styles from './homeBoardList.module.css'
import Link from 'next/link'
import Bookmark from './Bookmark'

export default function HomeBoardList() {
   const [boardData, setBoardData] = useState<Board[]>([])
   useEffect(() => {
      const fetchData = async () => {
         const response = await fetch('/api/homeboardList')
         const data = await response.json();
         setBoardData(data)
      };
      fetchData();
   }, [])
   const filterImagesFromHTML = (html: string) => {
      // DOMPurify 사용하여 HTML 정화 및 이미지 태그 제거
      const cleanHtml = DOMPurify.sanitize(html, {
         FORBID_TAGS: ['img', 'div', 'span', 'b', 's', 'u', 'h1', 'h2', 'br', 'p','font'], // 특정 태그를 제거
      });
      return cleanHtml;
   };
   return (
      <div>
         { boardData.map((board) => (
            <div key={board._id} className={styles.bigList}>
               
                  <div className={styles.list}>
                     <div className='flex'>
                        <h2 className='font-bold text-black'>{board.title}</h2>
                        <h2 className='text-gray-600 text-xs pt-1 pl-3'>-작성자: {board.user}</h2>
                        <p className='text-gray-600 text-xs pt-1 pl-3 ml-auto'>
                           작성일: {new Date(board.createdAt).toLocaleString()}
                        </p>
                        <Bookmark bookmark={board.bookmark} id={board._id} categorie={board.categorie} user={board.user} description={board.description} title={board.title}/>
                     </div>
                     {/* <div dangerouslySetInnerHTML={{ __html: board.description }} /> */}
                     <div>
                        <div>
                           <Link href={`./board/${board._id}`}><div dangerouslySetInnerHTML={{ __html: filterImagesFromHTML(board.description) }} className={styles.description} />
                        </Link></div></div>
                     <div className={styles.categorie}>카테고리: {board.categorie}</div>
                     
                  </div>
               
            </div>
         ))}
      </div>
   )
}
