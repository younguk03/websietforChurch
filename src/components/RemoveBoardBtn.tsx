'use client'
import React from 'react'
// import style from './remove.module.css'
import { deleteBoard } from '@/actions/actions'
import Image from 'next/image'
import trash from '@/public/image/trash_icon.png'
import { useRouter } from 'next/navigation'


export default function RemoveBtn({id}: {id:string}) {
   const router = useRouter()
   async function handleRemove() {
      const config = confirm('정말로 삭제하시겠습니까?')
      
      if (config){
         try {
            await deleteBoard(id)
            router.push('/')
         } catch (error) {
            console.log(error)
         }
      }
   }
   return (
      <div onClick={handleRemove}><Image src={trash} height={30} alt='delete' className='bg-red-600 hover:bg-red-700 rounded-sm' /></div>
   )
}