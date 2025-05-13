import {useState, useEffect} from 'react'
import getData from '../util/GetData'
import Table from 'react-bootstrap/Table';
import './Employment.css';
import { Tabs, Tab } from 'react-bootstrap';

const Employment = () => {
    const [employment, setEmployment] = useState();
    const[loaded, setLoaded] = useState(false);

    // get employment data
    useEffect( () => {
        getData('employment/')
            .then((json)=> {
                console.log('employment get: ', json);
                setEmployment(json);
                setLoaded(true);
            })
    }, [])

    // render without the data
    if (!loaded) return (
        <h1>Loading employment data...</h1>
    )

    return (
        <>
            {/* Introduction text */}
            <h2 id="employment">{employment.introduction.title}</h2>
            {employment.introduction.content.map((intro) => (
                <div className="employment">
                    <h4>{intro.title}</h4>
                    <p>{intro.description}</p>
                </div>
            ))}
            
            {/* Displays Statistics */}
            <div className="degree-stats">
                <h4>Degree Statistics</h4>
                <div className="stats">
                    {employment.degreeStatistics.statistics.map((stat) => (
                        <div className="stat-box">
                            <h3 className="stat-value">{stat.value}</h3>
                            <p>{stat.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* List employers */}
            <div className="employers-careers">
                <div className="employers">
                    <h4>Employers</h4>
                    <div className="employerNames">
                        {employment.employers.employerNames.map((name) => (
                            <p>{name}</p>
                        ))}
                    </div>
                </div>

                {/* List careers */}
                <div className="careers">
                    <h4>Careers</h4>
                    <div className="careerNames">
                        {employment.careers.careerNames.map((name) => (
                            <p>{name}</p>
                        ))}
                    </div>
                </div>
            </div>

            {/* Display coop table when the tab is clicked on*/}
            <Tabs defaultActiveKey="coop">
                <Tab eventKey="coop" title="Co-op">
                    <div className="coop-table">
                        <Table striped bordered hover aize="sm">
                            <thead>
                                <tr>
                                    <th>Employer</th>
                                    <th>Degree</th>
                                    <th>City</th>
                                    <th>Term</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employment.coopTable.coopInformation.map((coop) => (
                                <tr>
                                    <td>{coop.employer}</td>
                                    <td>{coop.degree}</td>
                                    <td>{coop.city}</td>
                                    <td>{coop.term}</td>
                                </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Tab>

            {/* Display employment table when tab is clicked on*/}
            <Tab eventKey="careers" title="Professional Employment">
                <div className="employment-table">
                    <Table striped bordered hover aize="sm">
                        <thead>
                            <tr>
                                <th>Employer</th>
                                <th>Degree</th>
                                <th>City</th>
                                <th>Title</th>
                                <th>Start Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employment.employmentTable.professionalEmploymentInformation.map((employ) => (
                            <tr>
                                <td>{employ.employer}</td>
                                <td>{employ.degree}</td>
                                <td>{employ.city}</td>
                                <td>{employ.title}</td>
                                <td>{employ.startDate}</td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                </Tab>
            </Tabs>
        </>
    )
}

export default Employment;