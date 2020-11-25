import React, { useEffect } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import { Container, Row, Col } from 'react-bootstrap';
import useForm from '../../hooks/form';
import useList from '../../hooks/list';
import useAjax from '../../hooks/api';
import SettingsEditor from './settings-editor'
import Auth from '../auth/auth'


function ToDo() {
  const [list, setList, handleInputChange, handleSubmit] = useForm();
  const [handler, todoAPI] = useAjax();
  const [loader, toggleComplete, deleteTask] = useList(handler, todoAPI, setList, list);


  useEffect(() => {
    loader()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.title = `To Do List: ${list.filter(item => !item.complete).length}`
  }, [list]);

  return (
    <>
      <Container fluid="lg">
        <Row className="title">
          <Col>
            <h2>
              There are {list.filter(item => !item.complete).length} Items To Complete
            </h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Container>
              <Row>
                <Col sm={4}>
                  <Auth capability="create">
                    <TodoForm handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
                  </Auth>
                  <SettingsEditor />
                </Col>
                <Auth capability="create">
                  <Col sm={2}>
                  </Col>
                </Auth>
                <Col sm={6}>
                  <TodoList
                    list={list}
                    handleComplete={toggleComplete}
                    handleDelete={deleteTask}
                  />
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>

      </Container>
    </>
  );

}

export default ToDo;
