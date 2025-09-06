import React from "react";

const ProjectCard = ({ image, title }) => {
  return (
    <div className="group relative w-full h-[400px] lg:h-[500px] overflow-hidden rounded-2xl shadow-lg cursor-pointer">
      {/* Image */}
      <img
        className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
        src={image}
        alt={title}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-end justify-center">
        <h2 className="uppercase text-3xl md:text-5xl font-[font1] text-white mb-10 tracking-widest border-2 border-white px-6 py-2 rounded-full">
          {title}
        </h2>
      </div>
    </div>
  );
};

export default ProjectCard;
