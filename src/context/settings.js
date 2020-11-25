import React, { useState } from 'react';

export const SettingsContext = React.createContext();

function SettingsProvider(props) {
  const [displayCompleted, setDisplayCompleted] = useState(false);
  const [perScreen, setPerScreen] = useState(3);
  const [sort, setSort] = useState('difficulty');
  const state = {
    displayCompleted,
    perScreen,
    sort,
    setDisplayCompleted,
    setPerScreen,
    setSort
  };

  return (
    <SettingsContext.Provider value={state}>
      {props.children}
    </SettingsContext.Provider>
  );
}

export default SettingsProvider;