'use client'
import { useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'
import styles from './page.module.css'
import Link from 'next/link';
import DOMPurify from 'dompurify';
import Header from '@/components/Header';
import Bookmark from '@/components/Bookmark';

export default function searchBoard(){
   return(
      <div className={styles.main}>
         <div>
            <Header/>
         </div>
         <div className={styles.main2}>
            <Suspense fallback={<div>Loading...</div>}>
               <Search/>
            </Suspense>
         </div>
      </div>
   )
}

function Search() {
   const searchParams = useSearchParams()
   const query = searchParams.get('search') || '';
   const [boardData, setBoardData] = useState<[]>([])

   useEffect(() => {
      const fetchData = async () => {
         const response = await fetch(`/api/searchBoard?title=${decodeURIComponent(query)}`)
         const data = await response.json();
         setBoardData(data)
      }
      fetchData();
   }, [query])
   const filterImagesFromHTML = (html: string) => {
      // DOMPurify 사용하여 HTML 정화 및 이미지 태그 제거
      const cleanHtml = DOMPurify.sanitize(html, {
         FORBID_TAGS: ['img', 'div', 'span', 'b', 's', 'u', 'h1', 'h2', 'br', 'p','font'], // 특정 태그를 제거
      });
      return cleanHtml;
   };
   return (
      <div>
         <div className='font-bold mt-5 text-xl'>&ldquo;{decodeURIComponent(query)}&ldquo; <span className='text-base font-normal text-gray-400'>검색결과</span></div>
         <div>
            {boardData.map((item: any, index: number) => (
                  <div key={index} className={styles.bigList}>
                     
                        <div className={styles.list}>
                           <div className='flex'>
                              <h2 className='font-bold'>{item.title}</h2>
                              <h2 className='text-gray-600 text-xs pt-1 pl-3'>-작성자: {item.user} </h2>
                              <p className='text-gray-600 text-xs pt-1 pl-3 ml-auto'>
                                 작성일: {new Date(item.createdAt).toLocaleString()}
                              </p>
                              <Bookmark bookmark={item.bookmark} id={item._id} categorie={item.categorie} user={item.user} description={item.description} title={item.title}/>
                           </div>
                           <div>
                              <Link href={`./board/${item._id}`}><div dangerouslySetInnerHTML={{ __html: filterImagesFromHTML(item.description) }} className={styles.description} /></Link>
                              </div>
                           <div className={styles.categorie}>카테고리: {item.categorie}</div>
                        </div>
                     
                  </div>
            ))}
         </div>
      </div>
   )
}
