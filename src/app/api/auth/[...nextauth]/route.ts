// import { handlers } from "@/auth" // Referring to the auth.ts we just created



import NextAuth from "next-auth"
import credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import kakao from "next-auth/providers/kakao"
import naver from "next-auth/providers/naver"
import connectMongoDB from "@/libs/mongodb"
import User from "@/models/user"
import brcypt from "bcryptjs"


export const { handlers, signIn, signOut, auth } = NextAuth({
   providers: [Google, naver, kakao, credentials({
      name: "Credentials",
      id: 'credentials',
      // 로그인 form 내용
      credentials: {
         name: { label: "name", type: "text" },
         password: { label: "password", type: "password" },
      },

      // 이메일, 패스워드 부분을 체크해서
      // 맞으면 user 객체 리턴
      // 틀리면 null 리턴
      async authorize(credentials) {
         if (!credentials || typeof credentials.name !== 'string' || typeof credentials.password !== 'string') {
            throw new Error('Invalid credentials');
         }
         // MongoDB 연결
      await connectMongoDB();

      // 사용자 이름으로 사용자 찾기, 비밀번호도 선택적으로 포함하여 가져옴
      const user = await User.findOne({ name: credentials.name }).select('+password');
      
      if (!user) throw new Error("Wrong Username!"); // 사용자 없으면 오류

      // 비밀번호 비교
      const passwordMatch = await brcypt.compare(credentials.password, user.password);

      // 비밀번호가 맞지 않으면 오류
      if (!passwordMatch) throw new Error("Wrong Password");

      return user; // 로그인 성공 시 사용자 객체 반환
      },
   })],
   session: {
      strategy: 'jwt'
   }
})
export const { GET, POST } = handlers