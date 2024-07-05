import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function MemberForm({ addMember }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [contact, setContact] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addMember({ name, age, contact, category, level });
    setName('');
    setAge('');
    setContact('');
    setCategory('');
    setLevel('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formAge">
        <Form.Label>Age</Form.Label>
        <Form.Control type="number" placeholder="Enter age" value={age} onChange={(e) => setAge(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formContact">
        <Form.Label>Contact</Form.Label>
        <Form.Control type="text" placeholder="Enter contact" value={contact} onChange={(e) => setContact(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formCategory">
        <Form.Label>Category</Form.Label>
        <Form.Control type="text" placeholder="Enter category" value={category} onChange={(e) => setCategory(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formLevel">
        <Form.Label>Level</Form.Label>
        <Form.Control type="text" placeholder="Enter level" value={level} onChange={(e) => setLevel(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Add Member
      </Button>
    </Form>
  );
}

export default MemberForm;
