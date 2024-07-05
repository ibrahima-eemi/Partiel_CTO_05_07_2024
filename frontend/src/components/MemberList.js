import React from 'react';
import { Table } from 'react-bootstrap';

function MemberList({ members }) {
  return (
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
        {members.map((member, index) => (
          <tr key={index}>
            <td>{member.name}</td>
            <td>{member.age}</td>
            <td>{member.contact}</td>
            <td>{member.category}</td>
            <td>{member.level}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default MemberList;
