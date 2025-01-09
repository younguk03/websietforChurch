'use client'
import React from 'react'
// import style from './remove.module.css'
import { deleteBoard } from '@/actions/actions'
import { useRouter } from 'next/navigation'
import { FaRegTrashCan } from 'react-icons/fa6'


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
      <div onClick={handleRemove}><FaRegTrashCan color='black' size={25}/></div>
   )
}