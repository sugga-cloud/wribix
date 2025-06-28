import React, { useCallback, useRef } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

const Testimonial = () => {
  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <section className="pb-20 pt-20 dark:bg-dark lg:pb-[120px] lg:pt-[120px]">
      <div className="container mx-auto relative">
        <Swiper slidesPerView={1} ref={sliderRef}>
          <SwiperSlide>
            <SingleTestimonial
              image="https://via.placeholder.com/300x300.png?text=My+Branding+Hub"
              reviewImg="https://via.placeholder.com/80x20?text=Review"
              reviewAlt="review"
              details="They built an incredible online presence for our brand. Our engagement skyrocketed within a few months!"
              name="My Branding Hub"
              position="Creative Studio"
            />
          </SwiperSlide>
          <SwiperSlide>
            <SingleTestimonial
              image="https://via.placeholder.com/300x300.png?text=Zonkey+Classes"
              reviewImg="https://via.placeholder.com/80x20?text=Review"
              reviewAlt="review"
              details="Their development support for our EdTech platform has been game-changing. Smooth, scalable, and fast."
              name="Zonkey Classes"
              position="Online Learning"
            />
          </SwiperSlide>
          <SwiperSlide>
            <SingleTestimonial
              image="https://via.placeholder.com/300x300.png?text=The+Shade+Store"
              reviewImg="https://via.placeholder.com/80x20?text=Review"
              reviewAlt="review"
              details="From branding to custom development, they helped us launch a polished online store we’re proud of."
              name="The Shade Store"
              position="Interior Retailer"
            />
          </SwiperSlide>

          {/* Navigation Arrows */}
          <div className="absolute left-0 right-0 bottom-0 z-10 flex items-center justify-center gap-5">
            <div className="prev-arrow cursor-pointer" onClick={handlePrev}>
              <ArrowButton direction="left" />
            </div>
            <div className="next-arrow cursor-pointer" onClick={handleNext}>
              <ArrowButton direction="right" />
            </div>
          </div>
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonial;

// Single testimonial card
const SingleTestimonial = ({ image, reviewImg, reviewAlt, details, name, position }) => {
  return (
    <div className="relative flex justify-center">
      <div className="relative w-full pb-16 md:w-11/12 lg:w-10/12 xl:w-8/12">
        <div className="w-full items-center md:flex">
          <div className="relative mb-12 w-full max-w-[310px] md:mb-0 md:mr-12 md:max-w-[250px] lg:mr-14 lg:max-w-[280px] 2xl:mr-16">
            <img src={image} alt={name} className="w-full rounded-lg" />
          </div>
          <div className="w-full">
            <div>
              <div className="mb-7">
                <img src={reviewImg} alt={reviewAlt} />
              </div>
              <p className="mb-11 text-base font-normal italic leading-[1.81] text-body-color dark:text-dark-6 sm:text-[22px]">
                {details}
              </p>
              <h4 className="mb-2 text-[22px] font-semibold leading-[27px] text-dark dark:text-white">
                {name}
              </h4>
              <p className="text-base text-body-color dark:text-dark-6">
                {position}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Arrow Button Component
const ArrowButton = ({ direction }) => {
  const isLeft = direction === "left";
  return (
    <button className="flex h-[60px] w-[60px] items-center justify-center rounded-full border border-stroke bg-white text-dark transition-all hover:border-transparent hover:drop-shadow-md dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:hover:drop-shadow-none">
      <svg
        width="20"
        height="21"
        viewBox="0 0 20 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-current"
      >
        {isLeft ? (
          <path d="M17.5 9.5H4.15625L9.46875 4.09375C9.75 3.8125 9.75 3.375 9.46875 3.09375C9.1875 2.8125 8.75 2.8125 8.46875 3.09375L2 9.65625C1.71875 9.9375 1.71875 10.375 2 10.6562L8.46875 17.2188C8.59375 17.3438 8.78125 17.4375 8.96875 17.4375C9.15625 17.4375 9.3125 17.375 9.46875 17.25C9.75 16.9687 9.75 16.5313 9.46875 16.25L4.1875 10.9062H17.5C17.875 10.9062 18.1875 10.5937 18.1875 10.2187C18.1875 9.8125 17.875 9.5 17.5 9.5Z" />
        ) : (
          <path d="M18 9.6875L11.5312 3.125C11.25 2.84375 10.8125 2.84375 10.5312 3.125C10.25 3.40625 10.25 3.84375 10.5312 4.125L15.7812 9.46875H2.5C2.125 9.46875 1.8125 9.78125 1.8125 10.1562C1.8125 10.5312 2.125 10.875 2.5 10.875H15.8437L10.5312 16.2813C10.25 16.5625 10.25 17 10.5312 17.2813C10.6562 17.4063 10.8437 17.4688 11.0312 17.4688C11.2187 17.4688 11.4062 17.4062 11.5312 17.25L18 10.6875C18.2812 10.4062 18.2812 9.96875 18 9.6875Z" />
        )}
      </svg>
    </button>
  );
};
