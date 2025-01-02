'use client'
import { Board } from '@/types/board'
import DOMPurify from 'dompurify'
import React, { useEffect, useState } from 'react'
import styles from './allBoard.module.css'
import Link from 'next/link'

export default function AllBoard() {
   const [boardData, setBoardData] = useState<Board[]>([])
   useEffect(() => {
      const fetchData = async () => {
         const response = await fetch('/api/allBoard')
         const data = await response.json();
         setBoardData(data)
      };
      fetchData();
   }, [])
   const filterImagesFromHTML = (html: string) => {
      // DOMPurify 사용하여 HTML 정화 및 이미지 태그 제거
      const cleanHtml = DOMPurify.sanitize(html, {
         FORBID_TAGS: ['img', 'div', 'span', 'b', 's', 'u', 'h1', 'h2', 'br', 'p'], // 특정 태그를 제거
      });
      return cleanHtml;
   };
   return (
      <>
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
      </>
   )
}