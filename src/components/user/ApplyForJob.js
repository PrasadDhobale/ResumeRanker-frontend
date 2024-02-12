import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button, Spinner, Alert, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ApplyForJob = () => {
  const [jobDetails, setJobDetails] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedResume, setSelectedResume] = useState(null);

  const jobId = window.location.pathname.split('/').pop();
  // Fetch user's resumes
  const userString = localStorage.getItem('user');

  useEffect(() => {
    const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';

    // Fetch job details
    axios.get(`${baseURL}/recruiter/job/${jobId}/`)
      .then(response => {
        setJobDetails(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
    
    if (userString) {
      const userId = JSON.parse(userString)?.id;
      axios.get(`${baseURL}/user/resume/${userId}/`)
        .then(response => {
          setResumes(response.data);
        })
        .catch(err => {
          console.error('Error fetching resumes:', err.message);
        });
    }
  }, [jobId, userString]);

  const navigate = useNavigate();
  const handleApply = async () => {
    if (selectedResume) {
      const userId = JSON.parse(localStorage.getItem('user')).id;
      console.log(selectedResume)
      const resumeId = selectedResume;

      console.log("User ID : "+userId)
      console.log("Resume ID : "+resumeId)
      console.log("Job ID : "+jobId)


      // try {
      //   const response = await axios.post('http://localhost:8000/application/', {
      //     userId,
      //     resumeId,
      //   });

      //   console.log('Application submitted successfully:', response.data);
      //   // Handle success or redirect to a thank you page
      // } catch (err) {
      //   console.error('Error submitting application:', err.message);
      //   // Handle errors
      // }
    } else {
      // Show an error message or handle the case where no resume is selected
    }
  };

  const getLocalTime = (utcTime) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    const localTime = new Date(utcTime).toLocaleString('en-US', options);
    return localTime;
  };

  const handleResumeSelection = (resumeId) => {
    setSelectedResume(resumeId);
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger">Error: {error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2>{jobDetails.title}</h2>
      <Table striped bordered hover>
        <tbody>
          <tr>
            <td>Description</td>
            <td>{jobDetails.description}</td>
          </tr>
          <tr>
            <td>Skills</td>
            <td>{jobDetails.skills}</td>
          </tr>
          <tr>
            <td>Experience</td>
            <td>{jobDetails.experience} Year</td>
          </tr>
          <tr>
            <td>Openings</td>
            <td>{jobDetails.no_of_openings}</td>
          </tr>
          <tr>
            <td>Deadline</td>
            <td>{getLocalTime(jobDetails.deadline)}</td>
          </tr>
          {/* Add more details as needed */}
        </tbody>
      </Table>

      {
        userString ? 
          resumes.length > 0 ?       
          <>
          <Form className='m-3'>
            {resumes.map(resume => (
              <Form.Check
                key={resume.resume_id}
                type="radio"
                label={`Resume: ${resume.title}`}
                name="resumeSelection"
                id={resume.resume_id}
                onChange={() => handleResumeSelection(resume.resume_id)}
              />
            ))}
          </Form>
          {
          selectedResume ? <Button variant="primary" onClick={handleApply}>Apply</Button> : <p className='text-danger fw-bold fs-2'>Please Select Resume</p>
          }
          </>
          :
          <Button variant="primary" onClick={() => {navigate('/user/upload-resume')}}>Upload Resume</Button>
        :
        <Button variant="primary" onClick={() => {navigate('/user-login')}}>Login</Button>
      }      
    </Container>
  );
};

export default ApplyForJob;
