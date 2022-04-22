import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { ArrowProps } from 'react-multi-carousel/lib/types';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa'

import TestimonialSingle from '../TestimonialSingle/TestimonialSingle';

interface CustomLeftArrowProps extends ArrowProps {
  myOwnStuff: string;
}

interface CustomRightArrowProps extends ArrowProps {
  myOwnStuff: string;
}


const responsive = {
  desktop: {
    breakpoint: { max: 4000, min: 768 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 768, min: 480 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 480, min: 0 },
    items: 1
  }
};

export default function Testimonials() {
  const CustomRightArrow = ({ onClick }: CustomRightArrowProps) => {
    return (
      <button onClick={onClick} className="arrowRightCarousel p-3 rounded-full bg-white text-baseColor shadow-lg">
        <FaChevronRight />
      </button>
    );
  };

  const CustomLeftArrow = ({ onClick }: CustomLeftArrowProps) => {
    return (
      <button onClick={onClick} className="arrowLeftCarousel p-3 rounded-full bg-white text-baseColor shadow-lg">
        <FaChevronLeft />
      </button>
    );
  };

  return (
    <div className="py-8 bg-gradient-to-b from-secondaryColor to-baseColor">
      <div className="container mx-auto">
        <h2 className="text-white text-center xs:text-4xl md:text-5xl font-bold mb-5">
          Usuários do Sistema
        </h2>
        
        <div>
          <Carousel
            className="relative"
            centerMode={false}
            responsive={responsive}
            arrows
            autoPlaySpeed={3000}
            draggable
            focusOnSelect={false}
            infinite={true}
            additionalTransfrom={0}
            keyBoardControl
            minimumTouchDrag={80}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            partialVisible={false}
            itemClass="carouselItem"
            customRightArrow={<CustomRightArrow myOwnStuff="" />}
            customLeftArrow={<CustomLeftArrow myOwnStuff="" />}
          >
            <TestimonialSingle />
            <TestimonialSingle />
            <TestimonialSingle />
            <TestimonialSingle />
          </Carousel> 
        </div>
      </div>
    </div>
  )
}
