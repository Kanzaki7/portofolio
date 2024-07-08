import { useState, useEffect } from 'react'
import '../styles/homeinfo.css'
import './message.css'

const AlertMail = ({ currentStage , setMailSent, mailSent}) => {

  return (
    <div className="text-color">
        {mailSent == "sent" ?
        <div className={mailSent !== "" ? "emailBorderOn" : "emailBorderOff"}>
              <div className="messageMail">
                  <div className="alertMail">
                    The message has been sent successfully!
                  </div>
              </div>
         </div>  
      : mailSent == "error" ?
          <div className={mailSent !== "" ? "emailBorderOn" : "emailBorderOff"}>
              <div className="messageMail">
                  <div className="alertMail">
                    I didn't receive your message. Please try again later.
                  </div>
              </div>
         </div>
        :  null
        }
    </div>
  )
}

export default AlertMail