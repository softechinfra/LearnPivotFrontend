import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";

const feedbackData = [
    {
      rating: 5,
      quote:
        "As a student, I believe interaction with educators is key in learning. Real innovations and a positive learning experience are the heart of successful education. No fake promises.",
      image: "/images/cryptocurrency-home/user1.jpg",
      name: "Emily Johnson",
      role: "Student",
    },
    {
      rating: 5,
      quote:
        "As a parent, I believe interaction with educators is key in my child's education. Real innovations and a positive learning experience are the heart of successful education. No fake promises.",
      image: "/images/cryptocurrency-home/user2.jpg",
      name: "Oliver Smith",
      role: "Parent",
    },
    {
      rating: 5,
      quote:
        "As a student, I believe interaction with educators is key in learning. Real innovations and a positive learning experience are the heart of successful education. No fake promises.",
      image: "/images/cryptocurrency-home/user3.jpg",
      name: "Sophia Brown",
      role: "Student",
    },
    {
      rating: 5,
      quote:
        "As a parent, I believe interaction with educators is key in my child's education. Real innovations and a positive learning experience are the heart of successful education. No fake promises.",
      image: "/images/cryptocurrency-home/user1.jpg",
      name: "William Taylor",
      role: "Parent",
    },
    {
      rating: 5,
      quote:
        "As a student, I believe interaction with educators is key in learning. Real innovations and a positive learning experience are the heart of successful education. No fake promises.",
      image: "/images/cryptocurrency-home/user2.jpg",
      name: "Ella Wilson",
      role: "Student",
    },
    {
      rating: 5,
      quote:
        "As a parent, I believe interaction with educators is key in my child's education. Real innovations and a positive learning experience are the heart of successful education. No fake promises.",
      image: "/images/cryptocurrency-home/user3.jpg",
      name: "Jack Brown",
      role: "Parent",
    },
  ];
  
  

const FeedBackCom = () => {
  return (
    <>
      <div className="unique-feedback-area pt-100">
        <div className="container">
          <div className="section-title with-linear-gradient-text">
            <span className="sub-title">CREATING FEEDBACK</span>
            <h2>These People Have Already Invested In Our Cryptocurrency</h2>
          </div>

          <Swiper
            spaceBetween={25}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 6500,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1200: {
                slidesPerView: 2,
              },
            }}
            modules={[Autoplay, Pagination]}
            className="unique-feedback-slides"
          >
            {feedbackData.map((feedback, index) => (
              <SwiperSlide key={index}>
                <div className="unique-single-feedback">
                  <ul className="rating">
                    {[...Array(feedback.rating)].map((_, index) => (
                      <li key={index}>
                        <i className="bx bxs-star"></i>
                      </li>
                    ))}
                  </ul>
                  <p>{feedback.quote}</p>
                  <div className="client-info">
                    <Image
                      src={feedback.image}
                      alt="image"
                      width={150}
                      height={150}
                    />
                    <h3>{feedback.name}</h3>
                    <span>{feedback.role}</span>
                  </div>
                  <div className="quote">
                    <Image
                      src="/images/cryptocurrency-home/quote.png"
                      alt="image"
                      width={118}
                      height={86}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default FeedBackCom;
