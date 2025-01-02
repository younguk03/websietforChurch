'use client'
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import React, { useState } from 'react';
import styles from './page.module.css'

export default function Page() {
   const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);

   const handleUpload = (result: any) => {
      console.log('Upload result:', result);
      const fileUrl = result.info?.secure_url;
      if (fileUrl) {
         setUploadedFileUrl(fileUrl);
         console.log('File uploaded successfully:', fileUrl);
         // 여기에 추가적인 처리 로직을 넣을 수 있습니다.
      }
   };

   return (
      <div className={styles.main}>
         <div>
            <CldUploadWidget
               uploadPreset="ml_default"
               onSuccess={handleUpload}
            >
               {({ open }) => (
                  <button type="button" onClick={() => open()}>
                     파일 선택 및 업로드
                  </button>
               )}
            </CldUploadWidget>
         </div>
         {uploadedFileUrl && (
            <div>
               <p>업로드된 파일 URL:</p>
               <a href={uploadedFileUrl} target="_blank" rel="noopener noreferrer">
                  {uploadedFileUrl}
                  <Image 
                  src={uploadedFileUrl} alt='image'
                  width={200}
                  height={200}
                  // fill
                  className='relative w-auto'
                  />
               </a>
            </div>
         )}
      </div>
   )
}
