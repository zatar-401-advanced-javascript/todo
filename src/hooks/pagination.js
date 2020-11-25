import { useState, useContext } from 'react';
import { Pagination } from 'react-bootstrap';
import { SettingsContext } from '../context/settings';
// import useForm from './form'

function usePagination(list) {
  // const [x,setList] = useForm()
  const siteContext = useContext(SettingsContext);
  const [activePage, setActivePage] = useState(1)
  // let filteredList = []

  // const showCompleted = () => {
  //   if(siteContext.displayCompleted === true){
  //     console.log('test')
  //     // filteredList = [...list];
  //   }else{
  //     list.forEach((item) => {
  //       if(item.complete === false){
  //         filteredList.push(item)
  //       }
  //     })
  //     setList(filteredList)
  //   }
  // }

  const sort = () => {
    list.sort(function (a, b) {
      return a.difficulty - b.difficulty;
    });
  }

  const showList = () => {
    if (list.length === 0) {
      return [];
    }
    let condition = (activePage * siteContext.perScreen) - 1;
    let begin = (condition - siteContext.perScreen) + 1;
      if(condition>=list.length){
        condition = list.length-1;
      }
    let showItem = []
    for (let i = begin; i <= condition; i++) {
      if (i === begin) {
        showItem = [];
      }
      showItem.push(list[i])
    }
    return showItem;
  }

  const pageNumbers = () => {
    let items = [];
    for (let number = 1; number <= Math.ceil(list.length/siteContext.perScreen); number++) {
      items.push(
        <Pagination.Item onClick={() => handleChange(number)} key={number} active={number === activePage}>
          {number}
        </Pagination.Item>,
      );
    }
    return (
        <Pagination size="sm">{items}</Pagination>
    );
  }

  const handleChange = (number) => {
    setActivePage(number);
  }

  return {showList,pageNumbers};
}

export default usePagination;