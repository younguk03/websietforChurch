import { getBoard } from '@/actions/actions'
import React from 'react'
import EditBoardForm from '@/components/EditBoardForm'

interface Props {
   params: {
      id: string
   }
}

export default async function EditBoard({ params }: Props) {
   const { board } = await getBoard(params.id)
   return (
      <div>
         <EditBoardForm
            id={board._id}
            title={board.title}
            description={board.description}
            categorie={board.categorie}
         />
      </div>
   )
}