import React from 'react'
import style from './page.module.css'
import Header from '@/components/Header';
import { auth } from '@/auth';
import Link from 'next/link';
import edit_icon from '@/public/image/edit_icon.png'
import { getBoard } from '@/actions/actions';
import AutoLink from './AutoLink';
import Image from 'next/image';
import RemoveBtn from '@/components/RemoveBoardBtn';
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
                  <div className={style.user}><span className={style.categorie}>카테고리:{board.categorie}</span> | 작성자: {board.user}</div>
               </div>
               {session?.user?.name === board.user && (
                  <>
                     <div className='ml-auto mt-7 mb-3 border border-gray-500 text-gray-600 rounded-sm pt-1 pl-1 h-8 hover:bg-gray-300'>
                        <Link href={`/editBoard/${board._id}`}>
                           <Image src={edit_icon} alt='edit' height={25} />
                        </Link>
                     </div>

                     <div className='mt-7 h-8 ml-3 mb-3 border border-gray-500 text-gray-600' style={{borderRadius:'3px'}}>
                        <button>
                           <RemoveBtn id={board._id} />
                        </button>
                     </div>

                  </>
               )}
            </div>
            <div className={style.description}>
               {/* <div dangerouslySetInnerHTML={{ __html: board.description }} /> */}
               <AutoLink id='board' content={board.description} />
            </div>
         </div>
      </div>
   )
}
