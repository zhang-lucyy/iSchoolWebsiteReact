import Accordion from 'react-bootstrap/Accordion';
import getData from '../util/GetData'
import { useEffect, useState } from 'react';
import './Degrees.css'; 

const Degrees = () => {
    const [degrees, setDegrees] = useState();
    const [loaded, setLoaded] = useState(false);

    // get the degrees data
    useEffect( () => {
        getData('degrees/')
            .then((json)=> {
                console.log('degrees get: ', json);
                setDegrees(json);
                setLoaded(true);
            })
    }, [])

    // render without the data
    if (!loaded) return (
        <h1>Loading degree data...</h1>
    )
    
    return (
        <>
            {/* Section title */}
            <h2 id="degrees">Degrees</h2>
            <br/>
            {/* Display each undergraduate degree */}
            <h4>Undergraduate Degrees</h4>
            <Accordion>
                {degrees.undergraduate.map((degree, index) => (
                    <Accordion.Item eventKey={index.toString()} className = "degreeTitle">
                        <Accordion.Header>{degree.title}</Accordion.Header>
                        <Accordion.Body>
                            <p>{degree.description}</p>
                            <strong>Concentrations</strong>
                            {degree.concentrations.map((concentration) =>
                            <p>{concentration}</p>)}
                        </Accordion.Body>
                    </Accordion.Item>            
                ))}
            </Accordion>

            <br/>

            {/* Display each graduate degree */}
            <h4>Graduate Degrees</h4>
            <Accordion className="graduateDegrees">
                {degrees.graduate.map((degree, index) => (
                    <Accordion.Item eventKey={index.toString()} className = "degreeTitle">
                        {/* Displays the degree title if available or the graduate certificates in an accordion */}
                        <Accordion.Header>{degree.title || "Graduate Advanced Certificates"}</Accordion.Header>
                        <Accordion.Body>
                            {degree.description && <p>{degree.description}</p>}
                            {degree.concentrations && (
                            <>
                                <strong>Concentrations</strong>
                                {degree.concentrations.map((concentration) => (
                                <p>{concentration}</p>
                                ))}
                            </>
                        )}
                        {/* if there are available certificates */}
                        {degree.availableCertificates && (
                            <>
                                <strong>Available Certificates</strong>
                                {degree.availableCertificates.map((certificate) => (
                                <p>{certificate}</p>
                                ))}
                            </>
                        )}
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </>
    )
}

export default Degrees;