import { getBoard } from '@/actions/actions'
import React from 'react'
import EditAlbumForm from '@/components/EditAlbumFrom'

interface Props {
   params: {
      id: string
   }
}

export default async function EditAlbum({ params }: Props) {
   const { board } = await getBoard(params.id)
   return (
      <div>
         <EditAlbumForm
            id={board._id}
            title={board.title}
            description={board.description}
            bookmark = {board.bookmark}
         />
      </div>
   )
}