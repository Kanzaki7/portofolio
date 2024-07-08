import { useState, useEffect } from 'react'
import '../styles/homeinfo.css'
import './message.css'

const Message = ({ currentStage}) => {

  return (
    <div className="text-color">
        {currentStage === 0 ?
          <div className="messageBorder">
            <div className="message">
                <div className="messageTitle">
                    Drag the mouse to explore the planet
                </div>
            </div>
          </div> :
          currentStage === 1 ?
            <div className="messageBorder">
              <div className="message">
                  <div className="messageTitle">
                      <span>Press</span><img src="/enter.png" alt="enter" className="enter-icon" /><span>to view the arcade game</span>
                  </div>
              </div>
           </div>
         : currentStage === 2 ?
             <div className="messageBorder">
               <div className="message">
                   <div className="messageTitle">
                   <span>Press</span><img src="/enter.png" alt="enter" className="enter-icon" /><span>to view the ship</span>
                   </div>
               </div>
             </div>
         : currentStage === 3 ?
              <div className="messageBorder">
                <div className="message">
                    <div className="messageTitle">
                    <span>Press</span><img src="/enter.png" alt="enter" className="enter-icon" /><span>to view the chocolate frog</span>
                    </div>
                </div>
            </div>
       : currentStage === 4 ?
           <div className="messageBorder">
               <div className="message">
                   <div className="messageTitle">
                   <span>Press</span><img src="/enter.png" alt="enter" className="enter-icon" /><span>to view the satellite dish</span>
                   </div> 
               </div>
           </div>
       : currentStage === 5 ?
           <div className="messageBorder">
               <div className="message">
                   <div className="messageTitle">
                   <span>Press</span><img src="/enter.png" alt="enter" className="enter-icon" /><span>to view the astronaut</span>
                   </div>
               </div>
            </div>
       : currentStage === 6 ?
          <div className="messageBorder">
              <div className="message">
                  <div className="messageTitle">
                  <span>Press</span><img src="/enter.png" alt="enter" className="enter-icon" /><span>to view the torii gate</span>
                  </div>
              </div>
         </div>
        :  null
        }
    </div>
  )
}

export default Message