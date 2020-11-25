import React from 'react';
import { Badge, CloseButton, Container, Row, Col, Modal } from 'react-bootstrap';
import usePagination from '../../hooks/pagination'



function TodoList(props) {
  const { showList, pageNumbers } = usePagination(props.list);
  let list = showList();

  return (
    <>
      {list.map(item => (
        <Modal.Dialog key={item._id}>
          <Modal.Header>
            <Modal.Title><Badge onClick={() => props.handleComplete(item._id)} variant={item.complete ? "success" : "danger"}>{item.complete ? "Completed" : "Pending"}</Badge></Modal.Title>
            <CloseButton onClick={() => props.handleDelete(item._id)} />
          </Modal.Header>

          <Modal.Body>
          <strong>Task: </strong>{item.text}
          </Modal.Body>

          <Modal.Footer style={{paddingBottom:'0'}}>
          <Modal.Body style={{paddingBottom:'12px', paddingLeft:'0'}}>
           <strong>Assigned to: </strong>{item.assignee}
          </Modal.Body>
          <strong>Difficulty: </strong>{item.difficulty}
          </Modal.Footer>
        </Modal.Dialog>
      ))}


      <Container style={{ marginTop: '20px' }}>
        <Row>
          <Col>
            {pageNumbers()}
          </Col>
        </Row>
      </Container>

    </>
  );
}

export default TodoList;