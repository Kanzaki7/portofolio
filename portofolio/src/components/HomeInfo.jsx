import { useState, useEffect } from 'react'
import axios from 'axios'
import emailjs from '@emailjs/browser'
import './futureCard.css'

const HomeInfo = ({currentStage, handleKeyUp, setMailSent, mailSent}) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })

    // const sendMail = async (e) => {
    //     e.preventDefault()
    //     const data = new FormData();
    //     data.append('name', formData.name);
    //     data.append('email', formData.email);
    //     data.append('subject', formData.subject);
    //     data.append('message', formData.message);
        
    //     try {
    //         const response = await axios.post("http://127.0.0.1:8000/api/sendmail", data, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         });
    //         console.log(response.data);
    //         if (response.data.status === 'success') {
    //             setMailSent("sent");
    //             setTimeout(() => {
    //                 setMailSent("");
    //             }, 5000);
    //         } else {
    //             setMailSent("error");
    //         }
    //     } catch (error) {
    //         console.error('There was an error!', error);
    //     }
    // }
    console.log(import.meta.env.VITE_APP_EMAILJS_SERVICE_ID);
    console.log(import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID);
    console.log(import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY);
    const sendMail = async (e) => {
        e.preventDefault()
        emailjs.send(
            import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
            {
                'from_name': formData.name,
                'to_name': 'Emrah',
                'from_email': formData.email,
                'email': formData.email,
                'to_email': 'emrahoztek@gmail.com',
                'subject': formData.subject,
                'message': formData.message,
            },
            import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
        ).then(() => {
            setMailSent("sent");
            setTimeout(() => {
                setMailSent("");
            }, 5000);
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
            })
        }).catch((error) => {
            console.error('There was an error!', error);
            setMailSent("error");
            setTimeout(() => {
                setMailSent("");
            }, 5000);
        })
    }

    

    const change = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({ ...formData, [name]: type == 'file' ? files[0] : value });
    };


    const [page, setPage] = useState(false);

    useEffect(() => {
        const effectLetters = () => {
            const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

            let interval = null;
    
            const title = document.querySelector(".card_title");
    
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
        }, 400);
    
        return () => {
          clearInterval(interval);
          clearTimeout(timeout);
        };
      }, []);
  return (
    <div className="card-border">
        {currentStage == 5 ? 
            <div className="cardn">
                <div className="xMark">
                    <img src="/cross-mark.png" alt="cross-mark" className="cross-mark" onClick={handleKeyUp} />
                </div>
                <div className="card_title" data-value="Hey, I'm Emrah">
                    Hello, I'm Emrah
                </div>
                <div className="card_content">
                    <div className='card_pages'>
                        <div className={page == true ? 'about' : 'aboutTrue'} onClick={()=>setPage(false)}>About me</div>
                        <div className={page == false ? 'about' : 'aboutTrue'} onClick={()=>setPage(true)}>My Skills</div>
                        <div><a href="https://www.linkedin.com/in/emrah-oztek-83475b2a9" target='blank'><img width={45} height={45} src="/linkedin.png" alt="" /></a></div>
                    </div>
                    <br />
                    {page == false ?    
                        <div className="alarm">
                            <div>
                                I'm a full-stack web developer based in Belgium who embarked on this exciting career path just 10 months ago. My journey into tech began with the comprehensive web development program at MolenGeek, where I rapidly acquired a wide range of programming skills.
                            </div>
                            <br />
                            <div>
                                Before diving into the world of coding, I worked as an administrative assistant, which honed my organizational abilities and attention to detail. My decision to change careers stems from a passion for continuous learning and a desire to create impactful digital solutions.
                            </div>
                            <br />
                            <div>
                                My academic background in sociology and anthropology has instilled in me a unique perspective on user behavior and cultural influences in technology. This insight, combined with my appreciation for visual arts, particularly cinema, informs my approach to crafting intuitive and aesthetically pleasing user interfaces. This multifaceted background allows me to bring a holistic approach to web development, considering both the technical and human aspects of digital products.
                            </div>
                            <br />
                            <div>
                                My commitment to self-learning and adaptability enables me to stay current with the latest web technologies and best practices. I'm excited to leverage my diverse skill set and fresh perspective to contribute innovative solutions in the ever-evolving field of web development.
                            </div>
                        </div>
                        : 
                        <div className="skillsIcons">
                            <div className='skillsIcon'>
                                <img src="/html.svg" alt="" />
                            </div>
                            <div className='skillsIcon'>
                                <img src="/css.svg" alt="" />
                            </div>
                            <div className='skillsIcon'>
                                <img src="/sass.svg" alt="" />
                            </div>
                            <div className='skillsIcon'>
                                <img src="/javascript.svg" alt="" />
                            </div>
                            <div className='skillsIcon'>
                                <img src="/react.svg" alt="" />
                            </div>
                            <div className='skillsIcon'>
                                <img src="/vite.png" alt="" />
                            </div>
                            <div className='skillsIcon'>
                                <img src="/redux.svg" alt="" />
                            </div>
                            <div className='skillsIcon'>
                                <img src="/nextjs.svg" alt="" />
                            </div>
                            <div className='skillsIcon'>
                                <img src="/nodejs.svg" alt="" />
                            </div>
                            <div className='skillsIcon'>
                                <img src="/monochrome_light.png" alt="" />
                            </div>
                            <div className='skillsIcon'>
                                <img src="/git.svg" alt="" />
                            </div>
                            <div className='skillsIcon'>
                                <img src="/python.png" alt="" />
                            </div>
                            <div className='skillsIcon'>
                                <img src="/django-icon.png" alt="" />
                            </div>
                            <div className='skillsIcon'>
                                <img src="/mysql.svg" alt="" />
                            </div>
                            <div className='skillsIcon'>
                                <img src="/figma.png" alt="" />
                            </div>
                            <div className='skillsIcon'>
                                <img src="/three.png" alt="" />
                            </div>
                        </div>
                    }
                </div>
            </div>
        : currentStage == 1 ? 
            <div className="cardn">
                <div className="xMark">
                    <img src="/cross-mark.png" alt="cross-mark" className="cross-mark" onClick={handleKeyUp} />
                </div>
                <div className='card_window'>
                    <video src="/video/memoria_video.mp4" autoPlay loop muted></video>
                </div>
                <div className="card_title" data-value="Memoria de Los Muertos">
                    Memoria de Los Muertos
                </div>
                <div className="card_content">
                    <div className="alarm">
                        This web-based memory game draws inspiration from Mexico's Día de 
                        los Muertos celebration. Developed using JavaScript DOM manipulation,
                        the project showcases the application of dynamic HTML control 
                        techniques. Players match pairs of cards featuring intricate sugar 
                        skull designs, a key symbol of this cultural tradition. The game's 
                        visual elements reflect the distinctive iconography associated with 
                        the Day of the Dead, highlighting the holiday's unique aesthetic. 
                        By combining web development skills with cultural themes, this 
                        project demonstrates the potential to create interactive experiences
                        that engage with diverse traditions.
                    </div>
                    <br />
                    <div className="card_icon">
                        <a href="https://memorydelosmuertos.netlify.app" target="_blank"><img src="/share.png" alt="enter" className="enter-icon" /></a>
                        <a href="https://github.com/Kanzaki7/Memory_emrah_oztek" target="_blank"><img src="/github-sign.png" alt="enter" className="enter-icon" /></a>
                    </div>
                </div>
            </div>
        : currentStage == 2 ? 
            <div className="cardn">
                <div className="xMark">
                    <img src="/cross-mark.png" alt="cross-mark" className="cross-mark" onClick={handleKeyUp} />
                </div>
                <div className='card_window'>
                    <video src="/video/onecrew.mp4" autoPlay loop muted></video>
                </div>
                <div className="card_title" data-value="One Crew">
                    One Crew
                </div>
                <div className="card_content">
                    <div className="alarm">
                        <div>
                            This web application, developed using Next.js, marks the culmination of my front-end studies and showcases my ability to independently learn and apply new technologies. The project integrates a One Piece API to create an interactive experience where users can recruit characters from the vast One Piece universe for custom missions.
                        </div>
                        <br />
                        <div>
                            Key features of the project include:
                        </div>
                        <div>
                            1. Next.js Framework: Demonstrates proficiency in a modern React-based framework, self-taught without formal instruction.
                        </div>
                        <div>
                            2. API Integration: Utilizes a One Piece API to fetch and display character data dynamically.
                        </div>
                        <div>
                            3. Interactive User Interface: Allows users to browse, select, and assemble crews from the diverse cast of One Piece characters.
                        </div>
                        <div>
                            4. Mission Creation: Enables users to create custom missions and assign their recruited characters to these adventures.
                        </div>
                    </div>
                    <br />
                    <div className="card_icon">
                        <a href="https://projet-next-emrah-oztek.vercel.app/" target="_blank"><img src="/share.png" alt="enter" className="enter-icon" /></a>
                        <a href="https://github.com/Kanzaki7/projet_next_emrah_oztek" target="_blank"><img src="/github-sign.png" alt="enter" className="enter-icon" /></a>
                    </div>
                </div>
            </div>
        : currentStage == 3 ? 
            <div className="cardn">
                <div className="xMark">
                    <img src="/cross-mark.png" alt="cross-mark" className="cross-mark" onClick={handleKeyUp} />
                </div>
                <div className='card_windowTrolley'>
                    <video src="/video/trolley.mp4" autoPlay loop muted></video>
                </div>
                <div className="card_title" data-value="Sweet Trolley">
                    Sweet Trolley
                </div>
                <div className="card_content">
                    <div className="alarm">
                        <div>
                            This e-commerce application brings the magical merchandise of the Harry Potter universe to life. Developed using React with Vite for optimal performance and Redux for state management, the project showcases my proficiency in modern front-end technologies and state handling.
                        </div>
                        <br />
                        <div>
                            Key features of the project include:
                        </div>
                        <div>
                            1. Custom API: Utilizes a self-created JSON file as an API, demonstrating skills in data structuring and management.
                        </div>
                        <div>
                            2. React and Vite: Leverages the speed and efficiency of Vite alongside React's component-based architecture.
                        </div>
                        <div>
                            3. Redux Integration: Implements Redux for robust state management across the application.
                        </div>
                        <div>
                            4. Shopping Cart Functionality: Allows users to add items to their cart, simulating a real e-commerce experience.
                        </div>
                    </div>
                    <br />
                    <div className="card_icon">
                        <a href="https://projet-redux-emrah-oztek.vercel.app" target="_blank"><img src="/share.png" alt="enter" className="enter-icon" /></a>
                        <a href="https://github.com/Kanzaki7/projet_redux_emrah_oztek" target="_blank"><img src="/github-sign.png" alt="enter" className="enter-icon" /></a>
                    </div>
                </div>
            </div>
        : currentStage == 4 ? 
            <div className="cardn">
                <div className="xMark">
                    <img src="/cross-mark.png" alt="cross-mark" className="cross-mark" onClick={handleKeyUp} />
                </div>
                <div className="card_title" data-value="Get in touch">
                    Get in touch
                </div>
                <div className="card_content">
                    <form onSubmit={sendMail} className='contactForm'>
                        <div className='divInput'>
                            <input className='contactInput' placeholder='Name' type="text" name="name" value={formData.name} onChange={(e)=>change(e)} required />
                        </div>
                        <div className='divInput'>
                            <input className='contactInput' placeholder='Email' type="email" name="email" value={formData.email} onChange={(e)=>change(e)} required />
                        </div>
                        <div className='divInput'>
                            <input className='contactInput' placeholder='Subject' type="text" name="subject" value={formData.subject} onChange={(e)=>change(e)} required />
                        </div>
                        <div className='divInput'>
                            <textarea className='contactText' placeholder='Write your thoughts here...' name="message" id="message" value={formData.message} onChange={(e)=>change(e)} required></textarea>
                        </div>
                        <div className='divButton'>
                            <button className="buttonCreer">
                                Send<span className="button-borderCreer"></span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        : currentStage == 6 ? 
            <div className="cardn">
                <div className="xMark">
                    <img src="/cross-mark.png" alt="cross-mark" className="cross-mark" onClick={handleKeyUp} />
                </div>
                <div className='card_windowChifoumi'>
                    <video src="/video/chifoumi.mp4" autoPlay loop muted></video>
                </div>
                <div className="card_title" data-value="Rock-Paper-Scissors">
                    Rock-Paper-Scissors
                </div>
                <div className="card_content">
                    <div className="alarm">
                        <div>
                        This web application presents a digital rendition of the classic hand game, rock-paper-scissors. Developed as my inaugural project using React with Vite, it marks a significant milestone in my journey as a front-end developer.
                        The game's implementation reflects not only modern web technologies but also pays homage to its rich history. Originating in China and later refined in Japan, rock-paper-scissors evolved into its current standardized form before gaining global popularity in the early 20th century. 
                        </div>
                        <br />
                        <div>
                            Key features of the project include:
                        </div>
                        <div>
                            1. React and Vite Integration: Demonstrates my initial foray into using React with Vite's rapid build tool.
                        </div>
                        <div>
                            2. Interactive Gameplay: Allows users to play against a computer opponent, showcasing basic game logic implementation.
                        </div>
                        <div>
                            3. State Management: Utilizes React's state handling to keep track of scores and game progression.
                        </div>
                    </div>
                    <br />
                    <div className="card_icon">
                        <a href="https://rock-paper-scissors-six-mu.vercel.app" target="_blank"><img src="/share.png" alt="enter" className="enter-icon" /></a>
                        <a href="https://github.com/Kanzaki7/rock-paper-scissors" target="_blank"><img src="/github-sign.png" alt="enter" className="enter-icon" /></a>
                    </div>
                </div>
            </div>
        : null
        }
    </div>
  )
}

export default HomeInfo
