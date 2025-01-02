import {v2 as cloudinary } from "cloudinary";

// Cloudinary 설정
cloudinary.config({
   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
   api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
   const body = await request.json();
   const { paramsToSign } = body;

   // Cloudinary API를 사용하여 파라미터 서명
   const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET as string
   );

   // 서명 반환
   return Response.json({ signature });
}
