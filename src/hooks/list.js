import { useContext } from 'react';
import { AuthContext } from '../context/auth'

function useList(handler, todoAPI, setList, list) {
  const contextType = useContext(AuthContext);
  
  const toggleComplete = id => {
    if (contextType.user.capabilities.includes('update')) {

      let item = list.filter(i => i._id === id)[0] || {};
      let url = `${todoAPI}/${id}`;

      if (item._id) {
        item.complete = !item.complete
        handler(url, 'put', item)
          .then(savedItem => {
            setList(list.map(listItem => listItem._id === item._id ? savedItem : listItem));
          })
      }
    }
  };

  const deleteTask = id => {
    let url = `${todoAPI}/${id}`;
    handler(url, 'delete', '')
      .then(() => {
        loader()
      })
  }

  const loader = () => {
    handler(todoAPI, 'get', '')
      .then(data => {
        setList(data.results)
      })
  }

  return [loader, toggleComplete, deleteTask]
}

export default useList;