import Image from 'next/image'
import styles from './sign-in.module.css'
import naver from '@/public/image/naver_icon.png'
import google from '@/public/image/google-logo.png'
import kakao from '@/public/image/kakao_logo.png'
import Link from 'next/link'
import { googleSignIn, kakaoSignIn, naverSignIn } from '@/actions/auth'
import SignInForm from './SiginInForm'

export default function SignIn() {
   return (
      <div className={styles.main}>
      <div className={styles.signin}>
         <h1 className={styles.title}>Login</h1>
         <div className="flex flex-col items-center">
            <div>
               <SignInForm />
            </div>
            <div className={styles.border_line}>
               <form
                  action={googleSignIn}
                  className={styles.google}
               >
                  <button type="submit" className='flex'>
                     <Image src={google} alt='google' width={40} />
                     <span className='pt-2 text-blue-600'>
                        구글 계정으로 로그인</span>
                  </button>
               </form>
            </div>
            <form
               action={naverSignIn}
               className={styles.naver}
            >
               <button type="submit" className='flex'>
                  <Image src={naver} alt='naver' width={40} />
                  <span className='pt-2'>네이버 계정으로 로그인</span>
               </button>
            </form>
            <form
               action={kakaoSignIn}
               className={styles.kakao}
            >
               <button type="submit" className='flex'>
                  <Image src={kakao} width={35} alt='kakao' />
                  <span className='pt-1 pl-2'>
                     카카오 계정으로 로그인
                  </span>
               </button>
            </form>
            <div>
               <span className='text-xs mr-1'>계정이 없으신가요?</span>
               <Link href={'/register'}><span className='text-xs text-blue-500 hover:underline'>여기를 클릭하세요!</span></Link>
            </div>
         </div>
      </div >
      </div>
   )
} 