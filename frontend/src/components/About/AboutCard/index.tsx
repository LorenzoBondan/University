
import './styles.css';

type Props = {
    text: string;
    description: string;
    imgUrl: string;
}

const AboutCard = ({text, description, imgUrl} : Props) => {
    return(
        <div className='about-card-container base-card'>
            <div className='about-card-img-container'>
                <img src={imgUrl} alt="" />
            </div>
            <div className='about-card-text-container'>
                <p>{text}</p>
                <span>{description}</span>
            </div>
        </div>
    );
}

export default AboutCard;