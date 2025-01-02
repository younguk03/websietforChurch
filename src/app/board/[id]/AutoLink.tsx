'use client';

import React, { useEffect } from 'react';
function autolink(id: string) {
   const container = document.getElementById(id);
   if (container) {
      let doc = container.innerHTML;
      const regURL = /(http|https|ftp|telnet|news|irc):\/\/([-/.a-zA-Z0-9_~#%$?&=:200-377()]+)/gi;
      const regEmail = /([xA1-xFEa-z0-9_-]+@[xA1-xFEa-z0-9-]+\.[a-z0-9-]+)/gi;
      doc = doc.replace(regURL, "<a  class='hover:text-blue-600 underline text-gray-600'  href='$1://$2' target='_blank'>$1://$2</a>")
         .replace(regEmail, "<a class='go-to-link' href='mailto:$1'>$1</a>");
      
      container.innerHTML = doc;
   }
}

export default function AutoLink({ id, content }: { id: string, content: string }) {
   useEffect(() => {
      autolink(id);
   }, [id]);

   return (
      <div>
      <div id={id} dangerouslySetInnerHTML={{ __html: content }} />
      </div>
   );
}
