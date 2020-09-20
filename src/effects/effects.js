import { TOP_SECTIONS_UPDATE, MENU_UPDATE, ITEMS_UPDATE, SECTION_ITEMS_UPDATE } from '../actions/actions';

const header = {
  method: 'GET', // *GET, POST, PUT, DELETE, etc.
  mode: 'cors', // no-cors, *cors, same-origin
  headers: {
      'Content-Type': 'application/json; charset=utf-8'
          // 'Content-Type': 'application/x-www-form-urlencoded',
  }
};

export const loadSections = (dispatch, sections) => {
  return new Promise((result, error) => {
      if (sections && sections.length) {
          result(sections);
          return;
      }

      fetch('http://localhost:3001/api/sections', header)
          .then((httpRes) => {
              httpRes.json().then(res => {
                  dispatch({
                      type: TOP_SECTIONS_UPDATE,
                      payload: res
                  });
                  result(res);
              })
          })
          .catch(err => {
              error();
              alert('server offline');
          });
  });
}


export const loadMenu = (dispatch, menus) => {
  return new Promise((result, error) => {
      if (menus && menus.length) {
          result(menus);
          return;
      }

      fetch('http://localhost:3001/api/menu', header)
          .then((httpRes) => {
              httpRes.json().then(res => {
                  dispatch({
                      type: MENU_UPDATE,
                      payload: res
                  });
                  result(res);
              });
          })
          .catch(err => {
              error();
              alert('server offline');
          })
  });
}

export const loadItems = (dispatch, items) => {
  return new Promise((result, error) => {
      if (items && items.length) {
          result(items);
          return;
      }
      fetch('http://localhost:3001/api/items', header)
          .then((httpRes) => {
              httpRes.json().then(res => {
                  dispatch({
                      type: ITEMS_UPDATE,
                      payload: res
                  });
                  result(res);
              })
          })
          .catch(err => {
              error();
              alert('server offline');
          });
  });
}