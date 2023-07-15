import { Course } from 'types';
import './styles.css';

type Props = {
    course: Course;
}

const CourseCard = ({course} : Props) => {
    return(
        <div className='course-card-container base-card'>
            <div className='course-card-top-container'>
                <img src={course.imgUrl} alt="" />
            </div>
            <div className='course-card-bottom-container'>
                <h4>{course.name}</h4>
            </div>
        </div>
    );
}

export default CourseCard;