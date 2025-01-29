'use server'
import { convertUserToObj } from "@/libs/helpers";
import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import bcrypt from 'bcryptjs'
import { revalidatePath } from "next/cache";

export async function register( name: string, email: string, password: string) {
   try {
      await connectMongoDB();
      console.log("Register 함수 호출됨", { name, email, password });
      // const user = await User.create({email,name, password});
      

      const userFound = await User.findOne({email})
      if (userFound) {
         return {
            error: 'Email already exists!'
         }
      }
      const hashedPassword = await bcrypt.hash(password, 7);
      const user = await User.create({
         name,
         email,
         password:hashedPassword,
      });
      revalidatePath('/')
      // const savedUser = await user.save();
      return {
         success:true,
         user: convertUserToObj(user),
      }

   } catch (e) {
      console.log(e);
   }
}

// 이 함수는 MongoDB 데이터베이스에 연결하고, 기존 이메일 주소를 확인하고, 암호를 해시하고, 사용자 데이터를 데이터베이스에 저장하여 새 사용자를 등록하는 프로세스를 처리합니다.