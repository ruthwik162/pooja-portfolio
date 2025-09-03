import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useRef } from 'react'
import Image from '../Component/Image'

const Agence = () => {
  gsap.registerPlugin(ScrollTrigger)

  const imageDivRef = useRef(null)
  const rotatingTextRef = useRef(null)
  const svgPathRef = useRef(null)
  const svgPcPathRef = useRef(null)

  useGSAP(function () {
    gsap.registerPlugin(ScrollTrigger);

    // Pin the image
    gsap.to(imageDivRef.current, {
      scrollTrigger: {
        trigger: imageDivRef.current,
        start: 'top 18%',
        end: 'top -90%',
        pin: true,
        pinSpacing: true,
        pinReparent: true,
        pinType: 'transform',
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });

    // Animate rotating text
    gsap.to(rotatingTextRef.current, {
      rotation: -360,
      duration: 15,
      repeat: -1,
      ease: "linear",
      transformOrigin: "50% 50%",
    });


    // Animate SVG path (Trim Path effect)
    if (svgPcPathRef.current) {
      const length = svgPcPathRef.current.getTotalLength();
      gsap.set(svgPcPathRef.current, {
        strokeDasharray: length,
        strokeDashoffset: -length,
      });
      gsap.to(svgPcPathRef.current, {
        strokeDashoffset: 0,
        duration: 3,
        ease: "power2.inOut",
        scrub: 1,
      });
    }
    // Animate SVG path (Trim Path effect)
    if (svgPathRef.current) {
      const length = svgPathRef.current.getTotalLength();
      gsap.set(svgPathRef.current, {
        strokeDasharray: length,
        strokeDashoffset: -length,
      });
      gsap.to(svgPathRef.current, {
        strokeDashoffset: 0,
        duration: 3,
        ease: "power2.inOut",
        scrub: 1,
      });
    }

    // Paragraph animations (About / Education / B.Tech / Skills)
    gsap.utils.toArray(' .education-text, .btech-text, .skills-text').forEach(paragraph => {
      // Split text into words
      const words = paragraph.textContent.split(' ');
      paragraph.innerHTML = words.map(word =>
        `<span class="word inline-block opacity-0">${word}</span>`
      ).join(' ');

      const wordElements = paragraph.querySelectorAll('.word');

      gsap.to(wordElements, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: paragraph,
          start: "top 85%",
          end: "top 50%",
          scrub: true,
          toggleActions: "play none none reverse",
        }
      });
    });

    // Title animations
    gsap.utils.toArray('.text').forEach(title => {
      gsap.fromTo(title,
        { y: 150, opacity: 1 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: title,
            start: "top 90%",
            end: "top 60%",
            scrub: true,
          }
        }
      );
    });

    gsap.from('.maintext', {
      y: -200,
      duration: 2,
      stagger: 0.2,
      ease: "power3.out"
    })
  });


  return (
    <div className='parent bg-white'>
      <div id='page1' className='py-1 relative '>

        {/* Trim Path SVG */}
        <div className='absolute  md:-top-22 md:right-[27vw] md:w-[59vw] w-[10vw] -top-26 right-[75vw] '>

          <svg className='md:block hidden' width="1328" height="405" viewBox="0 0 1328 405" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path ref={svgPcPathRef} d="M1327.5 316.987C1140.57 316.987 207.667 319.672 207.667 316.987C207.667 275.956 230.142 234.899 265.657 234.289C314.095 233.458 334.561 275.956 334.561 316.987C334.561 348.867 313.93 402 253.796 402C172.874 402 171.524 324.215 169.312 316.987C167.416 310.792 162.57 235.694 86.953 234.632C22.6574 233.728 3 292.015 3 316.987C3 319.736 25.8479 316.987 86.953 316.987C128.529 316.987 144.221 316.987 144.221 316.987C144.221 316.987 144.221 40.5928 144.221 0" stroke="black" strokeWidth="5" />
          </svg>
          <svg className='block md:hidden' width="331" height="297" viewBox="0 0 331 297" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path ref={svgPathRef} d="M330.5 232.035C193.5 232.035 153 234 153 232.035C153 202 169.471 171.946 195.5 171.5C231 170.891 246 202 246 232.035C246 255.371 230.879 294.264 186.808 294.264C127.5 294.264 126.51 237.326 124.889 232.035C123.5 227.5 119.948 172.528 64.5288 171.75C17.4069 171.089 3 213.755 3 232.035C3 234.047 19.7452 232.035 64.5288 232.035C95 232.035 106.5 232.035 106.5 232.035C106.5 232.035 106.5 29.714 106.5 0" stroke="black" strokeWidth="5" />
          </svg>
        </div>


        {/* Rotating Circular Text Overlay */}
        <div
          ref={rotatingTextRef}
          className="absolute flex md:top-33 top-45 right-[43vw] md:right-[26.5vw] origin-center  items-center justify-center pointer-events-none"
        >
          <svg className="w-[250px] h-[250px]" viewBox="0 0 200 200">
            <defs>
              <path id="circlePath" d="M100,100 m-65,0 a65,65 0 1,1 130,0 a65,65 0 1,1 -130,0" />
            </defs>
            <text
              fill="black"
              fontSize="15"
              fontFamily="font2, sans-serif"
              letterSpacing="1"
            >
              <textPath href="#circlePath" startOffset="0%">
                —Pooja Chaudhary Meda •—Developer •—Designer
              </textPath>
            </text>

          </svg>
        </div>

        {/* Image */}
        <div ref={imageDivRef} className='absolute overflow-hidden lg:h-[45vw] h-[95vw] lg:rounded-3xl rounded-xl lg:w-[25vw] w-[75vw] lg:top-30 -top-60 md:left-[10vw] right-[3vw]' >
          <Image className="w-full h-full object-cover" />
        </div>

        {/* About & Education Sections */}
        <div className='relative font-[font2]'>
          <div className='lg:mt-[25vh] px-2 mt-[42vh] overflow-hidden'>
            <div className='leading-[2vw] overflow-hidden'>
              <div className='lg:mt-[5vh] mt-[30vh]'>
                <h1 className='md:text-[10vw] text-[15vw] maintext text-start md:text-center uppercase md:leading-[7vw] leading-[9vw]'>About</h1>
              </div>
            </div>
            <div className='leading-[10vw] overflow-hidden'>
              <div className='leading-[2vw] overflow-hidden'>
                <div className='lg:mt-[2vh] mt-[2vw]'>
                  <h1 className='md:text-[10vw] text-[12vw] maintext text-start md:text-start relative md:left-[33vw] uppercase md:leading-[7vw] leading-[9vw]'>Me</h1>
                </div>
              </div>
            </div>
          </div>
          <div className='md:pl-[40%] md:-mt-[4vw] -mt-7 p-3 overflow-hidden'>
            <p className='lg:text-[2.1vw] text-[5vw] leading-[1] about-text'>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I'm&nbsp; <span className='text-red-600 font-[font2] md:text-[3.5vw]'>Pooja</span>, &nbsp;&nbsp;and I am currently in the final year of my B.Tech in Computer Science and Engineering at Malla Reddy University. Over the course of my studies, I have had the opportunity to work on several projects that span a wide range of technologies, including Python, Java, MERN stack development, Data Analytics, and IoT. These experiences have helped me build a strong foundation in programming and problem-solving, and have fueled my passion for technology and innovation.
            </p>
          </div>
          <div className='leading-[2vw] overflow-hidden'>
            <div className='lg:mt-[5vh] mt-[6vh]'>
              <h1 className='md:text-[8vw] text-[15vw] text text-start md:text-end uppercase md:leading-[7vw] leading-[10vw]'>Education</h1>
            </div>
          </div>
          <div className='leading-[2vw] overflow-hidden'>
            <div className='lg:-mt-[1vh] mt-[4vh]'>
              <h1 className='md:text-[4vw] text-[7vw] text text-start md:text-end uppercase md:leading-[7vw] leading-[9vw]'>10th & Inter</h1>
            </div>
          </div>
          <div className='lg:pl-[40%]  p-3 overflow-hidden'>
            <p className='lg:text-3xl text-md leading-[1.1] education-text'>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; I completed my schooling at KGP School in Kothagudem, where I consistently focused on academics and extracurricular activities. I am proud to mention that I secured a perfect GPA of 10 in my 10th board examinations. Following that, I pursued my intermediate studies in the MPC stream at Narayana Junior College, Telangana, where I scored an impressive 95% in the Intermediate Public Exams. These early educational achievements laid a solid foundation for my journey in higher education.
            </p>
          </div>
          <div className='leading-[2vw] overflow-hidden'>
            <div className='lg:-mt-[1vh] mt-[4vh]'>
              <h1 className='md:text-[4vw] text-[7vw] text text-start md:text-end uppercase md:leading-[7vw] leading-[9vw]'>Bachelors</h1>
            </div>
          </div>
          <div className='lg:pl-[40%] p-3 mt-4  overflow-hidden'>
            <p className='lg:text-3xl text-md leading-[1.1] btech-text'>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Currently, I am in my 4-1 semester at Malla Reddy University, pursuing my B.Tech in Computer Science and Engineering. Throughout my undergraduate studies, I have been actively involved in hands-on projects and technical learning, which have enhanced my understanding of both theoretical concepts and real-world applications. I am constantly seeking opportunities to improve my skills, explore new technologies, and contribute meaningfully to projects in the field of computer science.
            </p>
          </div>
          
          {/* Skills Section */}
          <div className='leading-[2vw] overflow-hidden'>
            <div className='lg:mt-[5vh] mt-[6vh]'>
              <h1 className='md:text-[8vw] text-[15vw] text text-start md:text-end uppercase md:leading-[7vw] leading-[10vw]'>Skills</h1>
            </div>
          </div>
          <div className='lg:pr-[45%] p-3 overflow-hidden'>
            <p className='lg:text-3xl text-md leading-[1.1] skills-text'>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I have developed expertise in various technologies including Python, Java, JavaScript, React, Node.js, MongoDB, and Express.js. My experience spans both front-end and back-end development, with a focus on creating responsive and user-friendly web applications. I'm also skilled in data analysis, IoT development, and problem-solving, with a strong foundation in algorithms and data structures.
            </p>
          </div>
        </div>
      </div>
      <div id='page2' className=" h-[30vh]"></div>

    </div>
  )
}

export default Agence