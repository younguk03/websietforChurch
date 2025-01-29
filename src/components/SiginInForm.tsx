'use client'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { handleSignIn } from '@/actions/auth';
import styles from './signInForm.module.css'

export default function SignInForm() {
   const router = useRouter();
   const [error, setError] = useState("");

   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError("");
      const formData = new FormData(e.currentTarget);
      const name = formData.get("name") as string;
      const password = formData.get("password") as string;
      try {
         const res = await handleSignIn(name,password)
         // router.push('/')
         if (res.success){
            router.push('/')
         }else {
            alert('아이디또는 비밀번호가 틀렸습니다.')
         }
      } catch (error) {
         console.error("Sign in error:", error);
         setError("에러가 났어요ㅜㅜ");
      }
   };

   return (
      <form onSubmit={handleSubmit} className='mt-4 border-b pb-3 mb-2 border-gray-500'>
         {error && <div className="text-black">{error}</div>}
         <div>
            <input type="text" placeholder='name' name='name' className={styles.name}/>
         </div>
         <div>
            <input type="password" placeholder='password' name='password' className={styles.password}/>
         </div>
         <button type='submit' className={styles.button}>로그인</button>
      </form>
   );
}
