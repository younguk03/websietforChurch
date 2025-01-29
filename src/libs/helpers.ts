import { Board } from "@/types/board";
import { User } from "@/types/user";



export function convertDocToObj(board:Board){
   return {
      _id: board._id.toString(),
      title:board.title,
      description:board.description,
      categorie:board.categorie,
      bookmark:board.bookmark,
      user:board.user,
   }
}

export function convertUserToObj(user:User) {
   return {
      _id:user._id.toString(),
      name:user.name,
      email:user.email,
      password:user.password
   }
}