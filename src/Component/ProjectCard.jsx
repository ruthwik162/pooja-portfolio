import React from "react";

const ProjectCard = ({ image, title, description, stacks, url, getStackIcon }) => {
  return (
    <div className="group relative w-full h-[400px] lg:h-[500px] overflow-hidden rounded-2xl shadow-lg cursor-pointer">
      {/* Image */}
      <img
        className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
        src={image}
        alt={title}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-between p-6">
        
        {/* Tech Stack Icons at top */}
        <div className="flex flex-wrap gap-3 justify-end">
          {stacks.map((stack, index) => (
            <div 
              key={index} 
              className="bg-white/20 backdrop-blur-sm rounded-full p-2 transform translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {getStackIcon(stack.name)}
            </div>
          ))}
        </div>

        {/* Content at bottom */}
        <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          {/* Title */}
          <h2 className="uppercase text-3xl md:text-4xl font-bold text-white mb-3 tracking-widest">
            {title}
          </h2>
          
          {/* Description */}
          <p className="text-white/90 text-sm md:text-base mb-4 line-clamp-3">
            {description}
          </p>
          
          {/* Tech tags and link */}
          <div className="flex items-center gap-4">
            <div className="flex gap-2 flex-wrap">
              {stacks.slice(0, 3).map((stack, index) => (
                <span key={index} className="text-xs text-white/80 bg-white/10 px-3 py-1 rounded-full">
                  {stack.name}
                </span>
              ))}
            </div>
            
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-auto bg-white text-black rounded-full p-3 transform translate-y-[10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out hover:bg-gray-200 hover:scale-110"
              style={{ transitionDelay: `${stacks.length * 100}ms` }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;