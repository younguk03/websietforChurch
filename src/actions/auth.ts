'use server'

import { signIn } from "@/app/api/auth/[...nextauth]/route"
import connectMongoDB from "@/libs/mongodb"
import User from "@/models/user"
import bcrypt from 'bcryptjs';


export async function googleSignIn() {
   await signIn("google", { redirectTo: '/' })
}

export async function naverSignIn() {
   await signIn("naver", { redirectTo: '/' })
}

export async function kakaoSignIn() {
   await signIn("kakao", { redirectTo: '/' })
}

// export async function handleSignIn(name: string, password: string) {
//    try {
//       await connectMongoDB()
//       var a = await User.findOne({name})
//       if(!a) {
//          return console.log('로그인 실패')
//       }
//       const isValid = await bcrypt.compare(password, a.password);
      
//       if (!isValid) {
//          return { error: "비밀번호가 일치하지 않습니다." };
//       }
//       const result =  await signIn("credentials", {
//          name,
//          password,
//          redirect: false,
//       });
//       if(result?.error) {
//          return {error:result.error}
//       }
//       return {success:true}
//    } catch (error) {
//       console.error("Sign in error:", error);
//       return { error: "An unexpected error occurred" };
//    }
// }
export async function handleSignIn(name: string, password: string) {
   try {
      await connectMongoDB()
      const a = await User.findOne({name})
      if(!a) {
         return { error: "사용자를 찾을 수 없습니다." }
      }
      const isValid = await bcrypt.compare(password, a.password);
      
      if (!isValid) {
         return { error: "비밀번호가 일치하지 않습니다." };
      }
      const result = await signIn("credentials", {
         name,
         password,
         redirect: false,
      });

      if (result?.error) {
         return { error: result.error };
      }

      return { success: true };
   } catch (error) {
      console.error("Sign in error:", error);
      return { error: "An unexpected error occurred" };
   }
}
