import React from 'react'
import './maintitle.css'

const MainTitle = ({enter, setEnter}) => {
  return (
    <section className='w-full h-screen relative bg-black'>
        <div className="animated-title">
            <div className="text-top">
                <div>
                <span>Welcome</span>
                <span>to my world !</span>
                </div>
            </div>
            <br />
            <br />
            <div className="text-bottom">
                <button className="buttonEnter" onClick={() => setEnter(true)}>
                    Enter to explore<span className="button-borderEnter"></span>
                    <img width={40} height={40} src="/rocket.png" alt="" />
                </button>
            </div>
        </div>
    </section>
  )
}

export default MainTitle
