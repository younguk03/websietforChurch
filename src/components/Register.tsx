'use client'
import { register } from '@/actions/register'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import styles from './register.module.css'
//출처: https://www.mongodb.com/developer/languages/typescript/nextauthjs-authentication-mongodb/

export default function Register() {
   const router = useRouter()
   const [email, setEmail] = useState('')
   const [name, setName] = useState('')
   const [password, setPassword] = useState('')

   //양식이 호출되는 비동기함수
   //FormData를 사용하여 양식 추출, 등록 서버 작음을 호출하여 사용자 등록, 오류처리, 등록성공식 로그인 페이지로 리다이렉션등의 양식 제출을 처리
   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      try {
         const p1 = document.querySelector('password1')
         const p2 = document.querySelector('password2')
         const n = document.querySelector('name')
         const em = document.querySelector('email')
         if (p1 === null || p2 === null || n === null || em === null) {
            alert('전부 적어주세요')
         }
         else if (p1 === p2) {
            const result = await register(name, email, password)
            if (result?.success) {
               router.push('/login')
            } else if (result?.error) {
               console.log(result.error)
            }
         } else {
            alert('비밀번호가 일치하지 않습니다.')
         }
      } catch (error) {
         console.error('Registration error:', error)
      }
   }


   return (
      <div className={styles.main}>
         <form onSubmit={handleSubmit} className={styles.border}>
            <div>
               <h1 className={styles.title}>Register</h1>
            </div>
            <div>
               <label>이름</label>
               <input type="text" placeholder='이름' onChange={(e) => setName(e.target.value)} value={name} className={styles.name} id='name' />
            </div>
            <div>
               <label>이메일</label>
               <input type="email" placeholder='이메일' onChange={(e) => setEmail(e.target.value)} value={email} className={styles.email} id='email' />
            </div>
            <div>
               <label>비밀번호</label>
               <input type="password" placeholder='비밀번호' onChange={(e) => setPassword(e.target.value)} value={password} id='password1' className={styles.p1} />
            </div>
            <div>
               <label>비밀번호 확인</label>
               <input type="password" id='password2' placeholder='비밀번호 확인' className={styles.p2} />
            </div>
            <button className={styles.button} type='submit' >가입하기</button>
         </form>
      </div>
   )
}
