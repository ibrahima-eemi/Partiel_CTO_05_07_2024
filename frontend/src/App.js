import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

function App() {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({
    name: '',
    age: '',
    contact: '',
    category: '',
    level: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/members/')
      .then(response => {
        setMembers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the members!', error);
      });
  }, []);

  const addMember = (e) => {
    e.preventDefault();
    if (isSubmitting) {
      console.log('Submit button is disabled to prevent duplicate submissions');
      return;
    }
    setIsSubmitting(true);
    console.log('Submitting new member:', newMember);

    axios.post('http://127.0.0.1:8000/members/', newMember)
      .then(response => {
        setMembers([...members, response.data]);
        setNewMember({ name: '', age: '', contact: '', category: '', level: '' });
        setIsSubmitting(false);
      })
      .catch(error => {
        console.error('There was an error adding the member!', error);
        setIsSubmitting(false);
      });
  };

  return (
    <Container>
      <h1 className="mt-4">Members</h1>
      <Form onSubmit={addMember} className="mb-4">
        <Row>
          <Col>
            <Form.Group controlId="formName">
              <Form.Control
                type="text"
                placeholder="Name"
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formAge">
              <Form.Control
                type="number"
                placeholder="Age"
                value={newMember.age}
                onChange={(e) => setNewMember({ ...newMember, age: e.target.value })}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formContact">
              <Form.Control
                type="text"
                placeholder="Contact"
                value={newMember.contact}
                onChange={(e) => setNewMember({ ...newMember, contact: e.target.value })}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formCategory">
              <Form.Control
                type="text"
                placeholder="Category"
                value={newMember.category}
                onChange={(e) => setNewMember({ ...newMember, category: e.target.value })}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formLevel">
              <Form.Control
                type="text"
                placeholder="Level"
                value={newMember.level}
                onChange={(e) => setNewMember({ ...newMember, level: e.target.value })}
              />
            </Form.Group>
          </Col>
          <Col>
            <Button variant="primary" type="submit" disabled={isSubmitting}>Add Member</Button>
          </Col>
        </Row>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Contact</th>
            <th>Category</th>
            <th>Level</th>
          </tr>
        </thead>
        <tbody>
          {members.map(member => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.age}</td>
              <td>{member.contact}</td>
              <td>{member.category}</td>
              <td>{member.level}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default App;
