import { useState, useEffect } from 'react'
import '../styles/homeinfo.css'

const HomeInfo = () => {

    useEffect(() => {
        const effectLetters = () => {
            const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

            let interval = null;
    
            const title = document.querySelector(".title");
    
            let iteration = 0;
            
            clearInterval(interval);
            
            interval = setInterval(() => {
                title.innerText = title.innerText
                .split("")
                .map((letter, index) => {
                    if(index < iteration) {
                    return title.dataset.value[index];
                    }
                
                    return letters[Math.floor(Math.random() * 26)]
                })
                .join("");
                
                if(iteration >= title.dataset.value.length){ 
                clearInterval(interval);
                }
                
                iteration += 1 / 3;
            }, 20);
        };
    
        const interval = setInterval(effectLetters, 100);
    
        const timeout = setTimeout(() => {
          clearInterval(interval);
          console.log('Interval Cleared');
        }, 300);
    
        return () => {
          clearInterval(interval);
          clearTimeout(timeout);
        };
      }, []);
  return (
    <div className="card">
        <div className="top-section">
        <iframe src="https://www.youtube.com/embed/hPr-Yc92qaY?autoplay=1&loop=1&playlist=hPr-Yc92qaY" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            {/* <div className="icons"></div> */}
        </div>
        <div className="bottom-section">
            <span className="title" data-value="UNIVERSE OF UI">UNIVERSE OF UI</span>
            <div className="row row1">
            <div className="item">
                <span className="big-text">2626</span>
                <span className="regular-text">UI elements</span>
            </div>
            <div className="item">
                <span className="big-text">100%</span>
                <span className="regular-text">Free for use</span>
            </div>
            <div className="item">
                <span className="big-text">38,631</span>
                <span className="regular-text">Contributers</span>
            </div>
            </div>
        </div>
        </div>
  )
}

export default HomeInfo
