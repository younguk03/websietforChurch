import React from 'react'
import style from './page.module.css'
import Header from '@/components/Header';
import { auth } from '@/auth';
import Link from 'next/link';
import { getBoard } from '@/actions/actions';
import AutoLink from './AutoLink';
import RemoveBtn from '@/components/RemoveBoardBtn';
import Bookmark from '@/components/Bookmark';
import { BiEditAlt } from 'react-icons/bi';
//Next.js 15부터 params가 비동기적으로 처리되어 Promise를 반환하도록 변경되었다.
export default async function page({ params }: { params: Promise<{ id: string }> }) {
   const { id } = await params;
   const { board } = await getBoard(id);
   const session = await auth();

   return (
      <div className={style.main}>
         <div>
            <Header />
         </div>
         <div className={style.main2}>
            <div className='flex border-b'>
               <div>
                  <div className={style.title}>{board.title}</div>
                  <div className={style.user}><span className={style.categorie}>{board.categorie}</span> | 작성자: {board.user}</div>
               </div>
               <div className='ml-auto flex'>
               {session?.user?.name === board.user && (
                  <>
                     <div className={style.edit_icon}>
                        <Link href={`/editAlbum/${board._id}`}>
                           <BiEditAlt size={26}/>
                        </Link>
                     </div>

                     <div className={style.removeBtn}>
                        <button>
                           <RemoveBtn id={board._id} />
                        </button>
                     </div>
                  </>
               )}
               <div className={style.bookmark}>
                  <Bookmark bookmark={board.bookmark} id={board._id} categorie={board.categorie} user={board.user} description={board.description} title={board.title} size={31}/>
               </div>
            </div>
            </div>
            <div className={style.description}>
               {/* <div dangerouslySetInnerHTML={{ __html: board.description }} /> */}
               <AutoLink id='board' content={board.description} />
            </div>
         </div>
      </div>
   )
}
