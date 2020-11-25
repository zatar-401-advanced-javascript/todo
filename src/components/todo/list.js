import React from 'react';
import { ListGroup, CloseButton, Container, Row, Col } from 'react-bootstrap';
import usePagination from '../../hooks/pagination'



function TodoList(props) {
  const {showList,pageNumbers} = usePagination(props.list);
  let list = showList();

  return (
    <ListGroup>
      {list.map(item => (
        <Container key={item._id}>
          <Row>
            <Col sm={6}>
              <ListGroup.Item style={{ padding: '5px', marginTop: '15px' }} variant='dark' >Assigned to: <strong>{item.assignee}</strong> | Difficulty: <strong>{item.difficulty}</strong> </ListGroup.Item>
            </Col>
            <Col sm={5}></Col>
            <CloseButton onClick={() => props.handleDelete(item._id)} />
          </Row>
          <Row>
            <Col sm={12}>
              <ListGroup.Item onClick={() => props.handleComplete(item._id)} variant={item.complete ? "success" : "danger"}>{item.text}</ListGroup.Item>
            </Col>
          </Row>
        </Container>
      ))}
      {pageNumbers()}
    </ListGroup>
  );
}

export default TodoList;