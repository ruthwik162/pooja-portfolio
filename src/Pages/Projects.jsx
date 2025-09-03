import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import ProjectCard from '../Component/ProjectCard'


const Projects = () => {

    const projects = [{
        image1: 'https://k72.ca/uploads/caseStudies/PJC/Thumbnails/PJC_SiteK72_Thumbnail_1280x960-1280x960.jpg',
        image2: 'https://k72.ca/uploads/caseStudies/WIDESCAPE/WS---K72.ca---Thumbnail-1280x960.jpg'
    }, {
        image1: 'https://k72.ca/uploads/caseStudies/OKA/OKA_thumbnail-1280x960.jpg',
        image2: 'https://k72.ca/uploads/caseStudies/Opto/thumbnailimage_opto-1280x960.jpg'
    }, {
        image1: 'https://k72.ca/uploads/caseStudies/LAMAJEURE_-_Son_sur_mesure/chalaxeur-thumbnail_img-1280x960.jpg',
        image2: 'https://k72.ca/uploads/caseStudies/SHELTON/thumbnailimage_shelton-1280x960.jpg'
    }]


    gsap.registerPlugin(ScrollTrigger)

    useGSAP(function () {
        const tl = gsap.timeline();

        gsap.from('.hero', {
            height: '100px',
            stagger: {
                amount: 0.4
            },
            scrollTrigger: {
                trigger: '.lol',
                start: 'top 100%',
                end: 'top -150%',
                scrub: true
            }
        })

        tl.from('.text', {
            y: -250,           // start below the div
            duration: 1,
            stagger: 0.2,     // delay between each text
            ease: "power3.out"
        })
    })

    return (
        <div>
            <div className='lg:p-4 p-2 selection:bg-[#D3FD50] bg-white'>
                <div className='bg-white mt-[30vh] overflow-hidden'>
                    <div className='text-[9vw] text font-[font2] uppercase text-black'>
                        Projects
                    </div>
                </div>
                <div className='-lg:mt-20 lol'>
                    {projects.map(function (elem, idx) {
                        return <div key={idx} className='hero w-full lg:h-[450px] mb-4 flex lg:flex-row grid-cols-2 flex-col lg:gap-4 gap-2'>
                            <ProjectCard image1={elem.image1} image2={elem.image2} />
                        </div>
                    })}

                </div>
            </div>


            <div className='bg-white  h-[30vh] md:h-[50vh]'>
                <div className='flex flex-col items-start justify-center pl-[30%] pt-[10vh] overflow-hidden'>
                    <div className='bg-white leading-[10vw] md:leading-[7vw] overflow-hidden'>
                        <div className='text-[9vw] md:text-[7vw] text font-[font2] uppercase text-black'>
                            Thanks
                        </div>
                    </div>
                    <div className='bg-white leading-[10vw] md:leading-[7vw] overflow-hidden'>
                        <div className='md:text-[7vw] text-[9vw] text font-[font2] uppercase text-black'>
                            For Your
                        </div>
                    </div>
                    <div className='bg-white leading-[11vw] md:leading-[7vw] overflow-hidden'>
                        <div className='text-[13vw] md:text-[8vw] text font-[font2] uppercase text-black'>
                            Patience
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Projects