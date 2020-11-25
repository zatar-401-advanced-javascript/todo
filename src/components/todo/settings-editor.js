import React, { useContext } from 'react';
import { SettingsContext } from '../../context/settings';
import { Container, Row } from 'react-bootstrap';

function SettingsEditor() {
  const context = useContext(SettingsContext);

  return (
    <>
    <Container>
      <h2>Site Settings</h2>
      <Row>
      <label>
        <span>Items per Page </span>
        <input type="number"
          placeholder={context.perScreen}
          onChange={(e) => context.setPerScreen(e.target.value)}
        />
      </label>
      </Row>
      <Row>
      <label>
        <span>Hide Completed Tasks </span>
        <input type="checkbox"
          value={context.displayCompleted}
          onChange={(e) => context.setDisplayCompleted(!context.displayCompleted)}
        />
      </label>
      </Row>
      <Row>
      <label>
        <span>Sort by </span>
        <select onChange={(e) => context.setSort(e.target.value)}>
          <option value='difficulty'>Difficulty</option>
          <option value='date'>Date</option>
        </select>
      </label>
      </Row>
    </Container>
    </>
  );
}

export default SettingsEditor;