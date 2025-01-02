
import Image from "next/image";
import Header from "@/components/Header";
import styles from './mainpage.module.css'
import hoebok from '@/public/image/main_image.jpg'
import HomeBoardList from "@/components/HomeBoardList";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.main}>
      <div>
        <Header />
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
    </div>
  );
}
