import { Board } from "@/types/board";



export function convertDocToObj(board:Board){
   return {
      _id: board._id.toString(),
      title:board.title,
      description:board.description,
      categorie:board.categorie,
      imgUpload:board.imgUpload,
      user:board.user,
   }
}