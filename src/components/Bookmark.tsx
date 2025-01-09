'use client'
import { updateBoard } from '@/actions/actions';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { FaBookmark } from 'react-icons/fa6';

interface Board {
   id: string;
   bookmark: string[];
   title:string;
   description:string;
   categorie:string;
   user:string;
}

export default function Bookmark({
   id,
   bookmark,
   title,
   description,
   categorie,
   user,
   size = 16,
}: Board&{size?:number}) {
   const { data: session } = useSession();
   const [isBookmark, setBookmark] = useState(bookmark.includes(session?.user?.name || ''));

   // 북마크 초기 상태 설정
   useEffect(() => {
      setBookmark(bookmark.includes(session?.user?.name || ''));
   }, [bookmark, session]);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!session?.user?.name) {
         alert('로그인이 필요합니다.');
         return;
      } else {
         if (isBookmark){
            alert('북마크 삭제되었습니다.')
         } else if(!isBookmark) {
            alert('북마크 추가되었습니다.')
         }
         
      }

      try {
         const updatedBookmarks = isBookmark
            ? bookmark.filter((name) => name !== session?.user?.name)
            : [...bookmark, session.user.name];

         // 서버 업데이트
         await updateBoard(id, title, description, updatedBookmarks, categorie, user);
         
         // 로컬 상태 업데이트
         setBookmark(!isBookmark);
      } catch (error) {
         console.error('북마크 업데이트 중 오류:', error);
         alert('북마크 업데이트 중 에러가 발생했습니다.');
      }
   };
   return (
      <div>
         <form onClick={handleSubmit}>
         <button type='submit' className='ml-2' name='bookmark'>
            {isBookmark ? (<div><FaBookmark color='#4690ea' size={size}/></div>) : (<div><FaBookmark color='#bdbdbd' size={size}/></div>) }
         </button>
         </form>
      </div>
   )
}
