import Header from '@/components/Header'
import React from 'react'
import styles from './page.module.css'
import Link from 'next/link'
import Introduction from '@/components/Introduction'
export default function page() {
   return (
      <div className={styles.main}>
         <div><Header/></div>
         <div>
            <div className='flex text-center justify-center border-b border-gray-400 bg-slate-100'>
               <div className={styles.menu}><Link href={'./allBoard'}>전체</Link></div>
               <div className={styles.menu}><Link href={'./introduction'}>회복의 교회 청년부 소개</Link></div>
               <div className={styles.menu}><Link href={'./column'}>목사님 칼럼</Link></div>
               <div className={styles.menu}><Link href={'./faithGrowUp'}>신앙 성장을 위한 참고자료</Link></div>
               <div className={styles.menu}><Link href={'./active'}>청년부 활동 게시판</Link></div>
            </div>
            <div className={styles.allBoard}>
               <h2 className='text-2xl ml-4 mt-8 font-bold'>회복의 교회 청년부 소개</h2>
               <Introduction/>
            </div>
         </div>
      </div>
   )
}