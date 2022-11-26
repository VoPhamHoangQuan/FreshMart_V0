import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import style from "./carouselStyle.module.scss";

function CarouselComponent(prop) {
    return (
        <div className={style.homeUser_carousel}>
            <Carousel
                autoPlay={true}
                infiniteLoop={true}
                interval={4000}
                stopOnHover={true}
                emulateTouch={true}
                showThumbs={prop.showThumbs}
                renderArrowPrev={(clickHandler, hasPrev, labelPrev) =>
                    hasPrev && (
                        <button
                            className={style.carouselPrevBtn}
                            onClick={clickHandler}
                        >
                            <i className="fa-solid fa-chevron-left"></i>
                        </button>
                    )
                }
                renderArrowNext={(clickHandler, hasNext, labelNext) =>
                    hasNext && (
                        <button
                            className={style.carouselNextBtn}
                            onClick={clickHandler}
                        >
                            <i className="fa-solid fa-chevron-right"></i>
                        </button>
                    )
                }
            >
                {prop.carouselItem.map((item, index) => {
                    return (
                        <a
                            key={index}
                            className={style.carouselLink}
                            href={item.link}
                        >
                            <img
                                className={style.carouselImg}
                                src={item.img}
                                alt="test carousel"
                            />
                        </a>
                    );
                })}
            </Carousel>
        </div>
    );
}

export default CarouselComponent;
