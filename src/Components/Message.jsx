import React from 'react'

function Message({messages}) {
  return (
    <div>
    {messages.map((msg, index) => (
     <div key={index} className="bg-black/30 p-6 rounded-lg shadow-xl mb-6 border border-cyan-400/20 backdrop-blur-sm">
       <div className="grid grid-cols-2 gap-4">
         <div className="bg-cyan-950/50 p-4 rounded-lg border border-cyan-400/30 backdrop-blur-sm">
           <div className="font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
             Spoken Message:
           </div>
           <div className="text-cyan-100">{msg.sourceText}</div>
         </div>
         
         <div className="bg-blue-950/50 p-4 rounded-lg border border-blue-400/30 backdrop-blur-sm">
           <div className="font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
             Translated Message:
           </div>
           <div className="text-blue-100">{msg.translatedText}</div>
         </div>
       </div>
     </div>
   ))}
 </div>
  )
}

export default Message