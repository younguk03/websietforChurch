import { convertUserToObj } from "@/libs/helpers";
import connectMongoDB from "@/libs/mongodb"
import User from "@/models/user"
import bcrypt from 'bcryptjs';

export async function login(name: string, password: string) {
   try {
      await connectMongoDB()
      const id = await User.findOne({ name })
      if (!id) {
         alert('이름 또는 비밀번호가 틀렸습니다.')
      }
      // 입력한 비밀번호와 저장된 비밀번호 비교
      const isPasswordCorrect = await bcrypt.compare(password, id.password);

      if (!isPasswordCorrect) {
         alert('이름또는 비밀번호가 틀렸습니다.')
      }
      return { success: true, user: convertUserToObj(id) }
   } catch (error) {
      throw new Error(`문서 수정에 실패했습니다. ${error}`)
   }
}