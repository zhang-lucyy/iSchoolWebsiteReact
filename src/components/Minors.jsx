import Accordion from 'react-bootstrap/Accordion';
import getData from '../util/GetData'
import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './Minors.css'

const Minors = () => {
    // for displaying each minor
    const [minors, setMinors] = useState();
    const [loaded, setLoaded] = useState(false);

    // for displaying course info when clicked
    const [courseDetails, setCourseDetails] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // displays the course modal when clicked on
    const handleShowModal = async (courseID) => {
        setShowModal(true);
        // retrieve course data
        const data = await getData(`course/courseID=${courseID}`);
        setCourseDetails(data);
    };

    // closes the course modal when exit is pressed
    const handleCloseModal = () => {
        setShowModal(false);
        setCourseDetails(null);
    }

    // get the minors data
    useEffect( () => {
        getData('minors/')
            .then((json)=> {
                console.log('minors get: ', json);
                setMinors(json);
                setLoaded(true);
            })
    }, [])

    // render without the data
    if (!loaded) return (
        <h1>Loading minors data...</h1>
    )

    return (
        <>
            <h2 id="minors">Minors</h2>
            <br/>
            {/* Display each minor */}
            <Accordion className="minors">
                {minors.UgMinors.map((minor, index) => (
                    <Accordion.Item eventKey={index.toString()}>
                        <Accordion.Header>{minor.title}</Accordion.Header>
                        <Accordion.Body>
                            <p>{minor.description}</p>
                            <strong>Courses</strong>
                            <br></br>
                            <div className="course-list">
                                {minor.courses.map((course) => (
                                    <Button className="course" onClick={() => handleShowModal(course)}>{course}</Button>
                                ))}
                            </div>
                            <p>{minor.note}</p>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>

            {/* Displays each individual course and details as a modal*/}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{courseDetails ? courseDetails.courseID : 'Loading...'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Conditional check to wait for course details to load */}
                    {courseDetails ? (
                     <>
                        <h3>{courseDetails.title}</h3>
                        <p>{courseDetails.description}</p>
                     </>
                    ): (
                        <p>Loading course details...</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Minors;