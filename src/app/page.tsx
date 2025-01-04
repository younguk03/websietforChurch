
import Image from "next/image";
import Header from "@/components/Header";
import styles from './mainpage.module.css'
import hoebok from '@/public/image/main_image.jpg'
import HomeBoardList from "@/components/HomeBoardList";
import Link from "next/link";
import HomeAlbumList from "@/components/HomeAlbumList";

export default function Home() {
  return (
    <div className={styles.main}>
      <div>
        <Header />
      </div>
      <div>
        <div className='flex text-center justify-center border-b border-gray-400 bg-slate-100'>
          <div className={styles.menu}><Link href={'./allBoard'}>전체</Link></div>
          <div className={styles.menu}><Link href={'./introduction'}>회복의 교회 청년부 소개</Link></div>
          <div className={styles.menu}><Link href={'./column'}>목사님 칼럼</Link></div>
          <div className={styles.menu}><Link href={'./faithGrowUp'}>신앙 성장을 위한 참고자료</Link></div>
          <div className={styles.menu}><Link href={'./active'}>청년부 활동 게시판</Link></div>
        </div>
      </div>
      <div>
        <Image src={hoebok} alt="메인 이미지" className={styles.main_Image} />
      </div>
      <div className={styles.homeboardList}>
        <div className="flex">
          <h1 className={styles.boardTitle}>최신 게시판</h1>
          <Link href={'./allBoard'} className={styles.btn1}>전체보기</Link>
        </div>
        <HomeBoardList />
      </div>
      <div className={styles.HomeAlbumList}>
        <div className="flex">
          <h1 className={styles.boardTitle}>최신 앨범</h1>
          <Link href={'./allAlbum'} className={styles.btn1}>전체보기</Link>
        </div>
        <div className="">
          <HomeAlbumList />
        </div>
      </div>
    </div>
  );
}
