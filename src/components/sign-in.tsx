import Image from 'next/image'
import styles from './sign-in.module.css'
import { signIn } from "@/auth"
import naver from '@/public/image/naver_icon.png'
import google from '@/public/image/google-logo.png'
import kakao from '@/public/image/kakao_logo.png'

export default function SignIn() {
   return (
      <div className={styles.signin}>
         <h1 className='text-4xl font-bold pb-4'>Login</h1>
         <div className="flex flex-col items-center">
            <div className={styles.border_line}>
         <form
            action={async () => {
               "use server"
               await signIn("google",{redirectTo:'/'})
            }}
            className={styles.google}
         >
            <button type="submit" className='flex'>
               <Image src={google} alt='google' width={40}/>
               <span className='pt-2 text-blue-600'>
               구글 계정으로 로그인</span>
               </button>
         </form>
         </div>
         <form
            action={async () => {
               "use server"
               await signIn("naver",{redirectTo:'/'})
            }}
            className={styles.naver}
         >
            <button type="submit" className='flex'>
               <Image src={naver} alt='naver' width={40} />
               <span className='pt-2'>네이버 계정으로 로그인</span>
            </button>
         </form>
         <form
            action={async () => {
               "use server"
               await signIn("kakao",{redirectTo:'/'})
            }}
            className={styles.kakao}
         >
            <button type="submit" className='flex'>
               <Image src={kakao} width={35} alt='kakao'/>
               <span className='pt-1 pl-2'>
                  카카오 계정으로 로그인
               </span>
               </button>
         </form>
      </div>
      </div>
   )
} 