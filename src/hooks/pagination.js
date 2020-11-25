import { useState, useContext } from 'react';
import { Pagination } from 'react-bootstrap';
import { SettingsContext } from '../context/settings';
import { If } from 'react-if';


function usePagination(list) {
  const siteContext = useContext(SettingsContext);
  const [activePage, setActivePage] = useState(1)
  let filteredList = []

  const showCompleted = () => {
    if (siteContext.displayCompleted === true) {
      console.log('test')
      filteredList = [...list];
    } else {
      list.forEach((item) => {
        if (item.complete === false) {
          filteredList.push(item)
        }
      })
    }
  }

  const sort = () => {
    filteredList.sort(function (a, b) {
      return b.difficulty - a.difficulty;
    });
  }

  const showList = () => {
    if (list.length === 0) {
      return [];
    }

    showCompleted()
    if (siteContext.sort === 'difficulty') {
      sort()
    }

    let condition = (activePage * siteContext.perScreen) - 1;
    let begin = (condition - siteContext.perScreen) + 1;

    if (condition >= filteredList.length) {
      condition = filteredList.length - 1;
    }

    let showItem = []
    for (let i = begin; i <= condition; i++) {
      if (i === begin) {
        showItem = [];
      }
      showItem.push(filteredList[i])
    }
    return showItem;
  }

  const pageNumbers = () => {
    let items = [];
    let max = Math.ceil(filteredList.length / siteContext.perScreen)
    for (let number = 1; number <= max; number++) {
      items.push(
        <Pagination.Item onClick={() => handleChange(number)} key={number} active={number === activePage}>
          {number}
        </Pagination.Item>
      );
    }
    return (
      <Pagination size="sm">
        <If condition={activePage > 1}>
          <Pagination.Item  onClick={() => handleChange(activePage - 1)}>
            Previous
        </Pagination.Item>
        </If>
        {items}
        <If condition={activePage < max}>
          <Pagination.Item onClick={() => handleChange(activePage + 1)}>
            Next
        </Pagination.Item>
        </If>
      </Pagination>
    );
  }

  const handleChange = (number) => {
    setActivePage(number);
  }

  return { showList, pageNumbers };
}

export default usePagination;