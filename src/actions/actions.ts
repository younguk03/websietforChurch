'use server'
import { convertDocToObj } from "@/libs/helpers";
import connectMongoDB from "@/libs/mongodb";
import Board from "@/models/board";
import { revalidatePath } from "next/cache";

//1. create 
export async function createBoard(title: string, description: string, bookmark:string[], categorie: string, user: string) {
   try {
      await connectMongoDB()
      const doc = await Board.create({ title, description,bookmark, categorie, user })
      revalidatePath('/')
      return { success: true, board: convertDocToObj(doc) }
   } catch (error) {
      throw new Error(`토픽 생성에 실패했습니다. ${error}`)
   }
}


// 2. Edit 
export async function updateBoard(id:string, title: string, description: string, bookmark:string[], categorie: string, user: string) {
   try {
      await connectMongoDB()
      const doc = await Board.findByIdAndUpdate(
         id,
         { title, description,bookmark, categorie, user },
         { new: true }
      )
      if (!doc) throw new Error('토픽을 찾을 수 없습니다.')
      revalidatePath('/')
      return { success: true, board: convertDocToObj(doc) }
   } catch (error) {
      throw new Error(`토픽 수정에 실패했습니다. ${error}`)
   }
}

// 3. GET by ID
export async function getBoard(id: string) {
   try {
      await connectMongoDB()
      const doc = await Board.findById(id)
      if (!doc) {
         throw new Error(`문서 수정에 실패했습니다.`)
      }
      return { success: true, board: convertDocToObj(doc) }
   } catch (error) {
      throw new Error(`문서 수정에 실패했습니다. ${error}`)
   }
}

// 4. GET all
export async function getAllBoards() {
   try {
      await connectMongoDB()
      const docs = await Board.find({}).sort({ createdAt: -1 })
      const boards = docs.map((doc) => convertDocToObj(doc))
      return { success: true, boards }
   } catch (error) {
      throw new Error(`모든 문서 조회에 실패했습니다 ${error}`)
   }
}

// 5. DELETE
export async function deleteBoard(id: string) {
   try {
      await connectMongoDB()
      const doc = await Board.findByIdAndDelete(id)
      if (!doc) await new Error('문서를 찾을 수 없습니다.')
      revalidatePath('/')
      return { success: true }
   } catch (error) {
      throw new Error(`문서 삭제를 실패했습니다. ${error}`)
   }
}