'use client';

import React, { useEffect } from 'react';

function autolink(id: string) {
   const container = document.getElementById(id);
   if (container) {
      //treewalker를 통해 텍스트 노드만 감지하기(이미지,a태그 등 html태그는 무시하기)
      const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null);

      let node;
      while ((node = walker.nextNode())) {
         const text = node.nodeValue || '';

         const regURL = /(http|https|ftp|telnet|news|irc):\/\/([-/.a-zA-Z0-9_~#%$?&=:200-377()]+)/gi;
         const regEmail = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/gi;

         if (regURL.test(text) || regEmail.test(text)) {
            const replacedText = text
               .replace(
                  regURL,
                  `<a class='hover:text-blue-600 underline text-gray-600' href='$1://$2' target='_blank'>$1://$2</a>`
               )
               .replace(
                  regEmail,
                  `<a class='go-to-link' href='mailto:$1'>$1</a>`
               );

            const span = document.createElement('span');
            span.innerHTML = replacedText;
            if (node.parentNode) {
               node.parentNode.replaceChild(span, node)
            }
         }
      }
   }
}

export default function AutoLink({ id, content }: { id: string; content: string }) {
   useEffect(() => {
      autolink(id);
   }, [id]);

   return (
      <div>
         <div id={id} dangerouslySetInnerHTML={{ __html: content }} />
      </div>
   );
}
