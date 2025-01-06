'use client'
import { Board } from '@/types/board'
import DOMPurify from 'dompurify'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AllBoard() {
   const [boardData, setBoardData] = useState<Board[]>([])
   const [currentPages, setCurrentPages] = useState(1);
   const [totalPages, setTotalPages] = useState(1)
   const router = useRouter()
   const groupSize = 3;

   //현재 페이지 그룹 계산
   const currentGroup = Math.ceil(currentPages / groupSize); // 현재 그룹 번호
   const startPage = (currentGroup - 1) * groupSize + 1; // 현재 그룹의 시작 페이지
   const endPage = Math.min(startPage + groupSize - 1, totalPages); // 현재 그룹의 끝 페이지

   useEffect(() => {
      const fetchData = async (page: number) => {
         const response = await fetch(`/api/allBoard?page=${page}`)
         const data = await response.json();

         setBoardData(data.boards)
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
      router.push(`/allBoard?page=${encodeURIComponent(currentPages)}`);
   }

   const filterImagesFromHTML = (html: string) => {
      // DOMPurify 사용하여 HTML 정화 및 이미지 태그 제거
      const cleanHtml = DOMPurify.sanitize(html, {
         FORBID_TAGS: ['img', 'div', 'span', 'b', 's', 'u', 'h1', 'h2', 'br', 'p', 'font'], // 특정 태그를 제거
      });
      return cleanHtml;
   };

   //페이지네이션
   //참고자료: https://nohack.tistory.com/125
   return (
      <div>
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
         <div>
            <form onSubmit={handleSubmit}>
               <button onClick={(() => handlePageChange(currentPages - 1))}
                  disabled={currentPages === 1}>이전</button>
               {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
                  const page = startPage + index;
                  return (
                     <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={currentPages === page ? "active" : ""}
                     >
                        {page}
                     </button>
                  );
               })}
               <button
                  onClick={() => handlePageChange(currentPages + 1)}
                  disabled={currentPages === totalPages}>다음</button>
            </form>
         </div>
      </div>
   )
}