import React, { useContext } from 'react';
import { SettingsContext } from '../../context/settings';
import { Accordion, Card, Button, Form } from 'react-bootstrap';

function SettingsEditor() {
  const context = useContext(SettingsContext);

  return (
    <Accordion style={{ marginTop: '10px', color: '#222831' }}>
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            <strong style={{ color: '#16697a' }}>Settings</strong>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <Form>
              <Form.Group controlId="perPage">
                <Form.Label>Tasks per page</Form.Label>
                <Form.Control type="number" placeholder={context.perScreen} onChange={(e) => context.setPerScreen(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="showCompleted">
                <Form.Label>Show completed tasks</Form.Label>
                <Form.Control type="checkbox" value={context.displayCompleted} onChange={() => context.setDisplayCompleted(!context.displayCompleted)} />
              </Form.Group>
              <Form.Group controlId="sort">
                <Form.Label>Sort by</Form.Label>
                <Form.Control onChange={(e) => context.setSort(e.target.value)} as="select">
                  <option value='difficulty'>Difficulty</option>
                  <option value='date'>Date</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default SettingsEditor;