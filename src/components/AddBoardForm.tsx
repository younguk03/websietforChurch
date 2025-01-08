'use client';
import { useRouter } from 'next/navigation';
import React, { useState, useRef } from 'react';
import styles from './addBoardForm.module.css';
import { createBoard } from '@/actions/actions';
import { CldUploadWidget } from 'next-cloudinary';
import { useSession } from 'next-auth/react';

export default function AddPostForm() {
   const { data: session } = useSession()
   const [title, setTitle] = useState('');
   const [description, setDescription] = useState('');
   const [categorie, setCategorie] = useState('')
   // const [user, setUser] = useState('');
   const user = `${session?.user?.name}`
   const editorRef = useRef<HTMLDivElement>(null);
   const router = useRouter();

   const handleUpload = (result: any) => {
      const fileUrl = result.info?.secure_url;
      if (fileUrl && editorRef.current) {
         // 이미지 태그 삽입
         const imgElement = `<img src="${fileUrl}" alt="Uploaded Image" style="max-width: 500px; max-height: 500px;" /><p><br/></p>`;
         editorRef.current.innerHTML += imgElement;
         console.log('File uploaded successfully:', fileUrl);
      }
   };


   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (editorRef.current) {
         setDescription(editorRef.current.innerHTML); // HTML 콘텐츠 저장
      }
      try {
         await createBoard(title, description, [], categorie, user);
         router.push('/');
      } catch (error) {
         console.error('글 생성 중 오류', error);
         alert('생성 중 에러');
      }
   };


   const toggleStyle = (tag: string) => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const range = selection.getRangeAt(0);
      let currentElement = range.commonAncestorContainer as HTMLElement;

      // 텍스트 노드인 경우 부모 요소를 선택
      if (currentElement.nodeType === Node.TEXT_NODE) {
         currentElement = currentElement.parentElement!;
      }

      // 상위 4개의 태그까지 확인
      let targetElement = null;
      for (let i = 0; i < 4; i++) {
         if (currentElement.tagName.toLowerCase() === tag.toLowerCase()) {
            targetElement = currentElement;
            break;
         }
         if (currentElement.parentElement) {
            currentElement = currentElement.parentElement;
         } else {
            break;
         }
      }

      if (targetElement) {
         // 일치하는 태그를 찾았을 경우, 해당 태그 제거
         const textNode = document.createTextNode(targetElement.textContent || '');
         targetElement.replaceWith(textNode);
      } else {
         // 일치하는 태그가 없을 경우, 새로운 스타일 적용
         const wrapper = document.createElement(tag);

         wrapper.appendChild(range.extractContents());
         range.insertNode(wrapper);
      }
      // 선택 영역 초기화
      selection.removeAllRanges();
   }

   const setFontBackgroundColor = (tag: string, value: string) => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const range = selection.getRangeAt(0);
      let currentElement = range.commonAncestorContainer as HTMLElement;

      // 텍스트 노드인 경우 부모 요소를 선택
      if (currentElement.nodeType === Node.TEXT_NODE) {
         currentElement = currentElement.parentElement!;
      }

      // 상위 4개의 태그까지 확인
      let targetElement = null;
      for (let i = 0; i < 4; i++) {
         if (currentElement.tagName.toLowerCase() === tag.toLowerCase()) {
            targetElement = currentElement;
            break;
         }
         if (currentElement.parentElement) {
            currentElement = currentElement.parentElement;
         } else {
            break;
         }
      }
      if (targetElement && targetElement?.style.backgroundColor == 'red' || targetElement?.style.backgroundColor == 'yellow') {
         // 일치하는 태그를 찾았을 경우, 해당 태그 제거
         const textNode = document.createTextNode(targetElement.textContent || '');
         targetElement.replaceWith(textNode);
      } else {
         // 일치하는 태그가 없을 경우, 새로운 스타일 적용
         const wrapper = document.createElement(tag);
         wrapper.style.backgroundColor = value

         wrapper.appendChild(range.extractContents());
         range.insertNode(wrapper);
      }
      // 선택 영역 초기화
      selection.removeAllRanges();
   }

   const setFontSize = (tag: string) => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const range = selection.getRangeAt(0);
      let currentElement = range.commonAncestorContainer as HTMLElement;

      // 텍스트 노드인 경우 부모 요소를 선택
      if (currentElement.nodeType === Node.TEXT_NODE) {
         currentElement = currentElement.parentElement!;
      }

      // 상위 4개의 태그까지 확인
      let targetElement = null;
      for (let i = 0; i < 4; i++) {
         if (currentElement.tagName.toLowerCase() === tag.toLowerCase()) {
            targetElement = currentElement;
            break;
         }
         if (currentElement.parentElement) {
            currentElement = currentElement.parentElement;
         } else {
            break;
         }
      }
      if (targetElement) {
         // 일치하는 태그를 찾았을 경우, 해당 태그 제거
         const textNode = document.createTextNode(targetElement.textContent || '');
         targetElement.replaceWith(textNode);
      } else {
         // 일치하는 태그가 없을 경우, 새로운 스타일 적용
         const wrapper = document.createElement(tag);
         if (tag === 'h1') {
            wrapper.style.fontSize = '28px'
         } else if (tag === 'h2') {
            wrapper.style.fontSize = '24px'
         }

         wrapper.appendChild(range.extractContents());
         range.insertNode(wrapper);
      }

      // 선택 영역 초기화
      selection.removeAllRanges();
   }




   return (
      <div className={styles.main}>
         <form onSubmit={handleSubmit}>
            <div className={styles.container1}>
               <h1 className={styles.boardTitle}>글쓰기</h1>
               <button type="submit" className={styles.submit}>
                  글 추가
               </button>
            </div>
            <div className={styles.container2}>
               <div className='border-b border-gray-100'>

               </div>
               <div className='flex'>
                  <div className='border rounded-md border-gray-400 bg-white'>
                     <button className={styles.tagStyle} type='button' onClick={() => toggleStyle('b')}><b>B</b></button>
                     <button className={styles.tagStyle} type='button' onClick={() => toggleStyle('i')}><i>i</i></button>
                     <button className={styles.tagStyle} type='button' onClick={() => toggleStyle('u')}><u>U</u></button>
                     <button className={styles.tagStyle} type='button' onClick={() => toggleStyle('s')}><s>S</s></button>
                  </div>
                  <div className='border rounded-md border-gray-400 ml-2 pl-1 mr-3 bg-white'>
                     <button type='button' className={styles.tagTitle} onClick={() => setFontSize('h1')}>제목1</button>
                     <button className={styles.tagTitle} type='button' onClick={() => setFontSize('h2')}>제목2</button>
                  </div>

               </div>
               <div className={styles.backgroundColorMenu}>
                  <label className={styles.font1}>글자 배경색</label>
                  <p className='border-r border-gray-400 mr-1'></p>
                  <button type='button' onClick={() => setFontBackgroundColor('span', 'red')}
                     className='mr-1 text-sm'>
                     <span className='bg-red-600 border-red-600 border text-sm rounded-sm pr-1 pl-1 hover:border-black'>T</span>

                  </button>
                  <button type='button' onClick={() => setFontBackgroundColor('span', 'yellow')} className='mr-1 text-sm '>
                     <span className='bg-yellow-300 pr-1 pl-1 rounded-sm border-yellow-300 border hover:border-black'>T</span>
                  </button>
                  <button type='button' onClick={() => setFontBackgroundColor('span', 'rgb(0, 91, 227)')} className='mr-1 text-sm'>
                     <span className='bg-blue-600 pr-1 pl-1 rounded-sm border-blue-600 border hover:border-black'>T</span>
                  </button>
               </div>
               {/* <button type='button' onClick={() => linkUrl('board')}>
                  <input type="text" />
               </button> */}

               <CldUploadWidget
                  uploadPreset="ml_default"
                  onSuccess={handleUpload}
               >
                  {({ open }) => (
                     <button type="button" onClick={() => open()}
                        className={styles.upload}>
                        이미지첨부
                     </button>
                  )}
               </CldUploadWidget>
            </div>
            <div className="m-5 mr-28 ml-28">
               <div>
                  <select
                     name="languages"
                     id="kategorie"
                     className={styles.categorie}
                     onChange={(e) => setCategorie(e.target.value)}
                  >
                     <option value="none"> 카테고리</option>
                     <option value="회복의 교회 청년부 소개">회복의 교회 청년부 소개</option>
                     <option value="목사님 칼럼">목사님 칼럼</option>
                     <option value="신앙 성장을 위한 참고자료">
                        신앙 성장을 위한 참고자료
                     </option>
                     <option value="청년부 활동 게시판">청년부 활동 게시판</option>
                  </select>
               </div>
               <div className={styles.one}>
                  <input
                     type="text"
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                     placeholder="제목"
                     className={styles.title}
                  />
               </div>
               <div>
                  {/* contentEditable 요소 */}
                  <div
                     id='board'
                     ref={editorRef}
                     contentEditable
                     className={styles.editor}
                     onInput={(e) => setDescription((e.target as HTMLDivElement).innerHTML || '')}
                  />
               </div>
            </div>
            <div className='border-t pt-3'>
               {/* <button type="submit" className={styles.submit}>
                  글 추가
               </button> */}
            </div>
         </form>
      </div>
   );
}
