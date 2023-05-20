
import AboutCard from './AboutCard';
import Trophy from 'assets/images/trophy.png';
import Speak from 'assets/images/speak.png';
import Degree from 'assets/images/degree.png';
import Tecno from 'assets/images/tecno.png';
import './styles.css';

const About = () => {
    return(
        <div className="about-container">
            <div className='row row-center'>
                <div className="col-sm-6 col-lg-4 col-xl-2 players-column">
                    <AboutCard text="The best private University of the south of the Country" description="We had the best performace at MEC's test" imgUrl={Trophy}/>
                </div>
                <div className="col-sm-6 col-lg-4 col-xl-2 players-column">
                    <AboutCard text="Opened subscribes to language courses" description='The classes start at May 15' imgUrl={Speak}/>
                </div>
                <div className="col-sm-6 col-lg-4 col-xl-2 players-column">
                    <AboutCard text="Master's and PhD. See tips for applying" description='Check out the step-by-step guide to create your CV' imgUrl={Degree}/>
                </div>
                <div className="col-sm-6 col-lg-4 col-xl-2 players-column">
                    <AboutCard text="TechnoSpring" description='Discover our technology park at the university' imgUrl={Tecno}/>
                </div>
            </div>
        </div>
    );
}

export default About;