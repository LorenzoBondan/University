import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Slide1 from 'assets/images/slide1.png';
import Slide2 from 'assets/images/slide2.png';
import Slide3 from 'assets/images/slide3.png';
import Slide4 from 'assets/images/slide4.png';
import './styles.css';

const Banner = () => {

    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 1
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
    };

    return(
        <div className="banner-container" id="banner">
            <div className="banner-box wow zoomIn">

                <Carousel responsive={responsive} infinite={true} className="banner-slider" autoPlay={true} autoPlaySpeed={2500}>
                    <div className="item">
                        <img src={Slide1} alt="" />
                    </div>
                    <div className="item">
                        <img src={Slide2} alt="" />
                    </div>
                    <div className="item">
                        <img src={Slide3} alt="" />
                    </div>
                    <div className="item">
                        <img src={Slide4} alt="" />
                    </div>
                </Carousel>
            </div>
        </div>
    );
}

export default Banner;