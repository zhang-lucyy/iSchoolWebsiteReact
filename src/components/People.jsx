import {useState, useEffect} from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';

import './People.css'
import getData from '../util/GetData'

const People = () => {
    // for displaying faculty and staff
    const [people, setPeople] = useState();
    const [loaded, setLoaded] = useState(false);

    // for displaying each faculty/staff's info
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // displays the faculty/staff modal when clicked on
    const handleShowModal = async (username, type) => {
        // retrieve details
        const data = await getData(`people/${type}/username=${username}`);
        setSelectedPerson(data);
        setShowModal(true);
    }

    // closes the modal when exit is pressed
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedPerson(null);
    }

    // go get data
    useEffect( () => {
        getData('people/')
            .then((json)=> {
                console.log('people get: ', json);
                setPeople(json);
                setLoaded(true);
            })
    }, [])

    // render without the people data
    if (!loaded) return (
        <h1>Loading People Data...</h1>
    )

    return (
        <>
            <h1 id="people">{people.title}</h1>
            <h4>{people.subTitle}</h4>

            {/* Displays faculty default */}
            <Tabs defaultActiveKey="faculty">
                <Tab eventKey="faculty" title="Faculty">
                    <div className="facultyList">
                        {people.faculty.map((p) =>
                            <div className="individual" onClick={() => handleShowModal(p.username, 'faculty')}>
                                <img alt="person" src={p.imagePath}/>
                                <h4>{p.name}</h4>
                            </div>
                        )}
                    </div>

                </Tab>
            
                {/* Displays staff when tab is clicked on*/}
                <Tab eventKey="staff" title="Staff">
                    <div className="staffList">
                        {people.staff.map((p) =>
                            <div className="individual" onClick={() => handleShowModal(p.username, 'staff')}>
                                <img alt="person" src={p.imagePath}/>
                                <h4>{p.name}</h4>
                            </div>
                        )}
                    </div>
                </Tab>
            </Tabs>

            {/* Displays each faculty/staff's info in a modal when clicked on */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedPerson ? selectedPerson.name : 'Loading...'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Conditional check to wait for details to load */}
                    {selectedPerson ? (
                     <>
                        {/* Not everyone has everything listed so only display what they have */}
                        {selectedPerson.tagling && <p>{selectedPerson.tagline}</p>}
                        {selectedPerson.title && <p>{selectedPerson.title}</p>}
                        {selectedPerson.interestArea && <p>Interests: {selectedPerson.interestArea}</p>}
                        {selectedPerson.email && <p>Email: {selectedPerson.email}</p>}
                        {selectedPerson.phone && <p>Phone: {selectedPerson.phone}</p>}
                        {selectedPerson.office && <p>Office: {selectedPerson.office}</p>}
                        {selectedPerson.twitter && <p>Twitter: {selectedPerson.twitter}</p>}
                        {selectedPerson.facebook && <p>Facebook: {selectedPerson.facebook}</p>}
                     </>
                    ): (
                        <p>Loading details...</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default People