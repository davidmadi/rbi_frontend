export const TOP_SECTIONS_UPDATE = 'TOP_MENU_UPDATE';
export const MENU_UPDATE = 'MENU_UPDATE';
export const ITEMS_UPDATE = 'ITEMS_UPDATE';
export const SECTION_ITEMS_UPDATE = 'SECTION_ITEMS_UPDATE';

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

export const firstLoad = (dispatch) =>{
    return new Promise((resolve, reject) =>{
        loadSections(dispatch).then(() => {
            loadMenu(dispatch).then(()=>{
                resolve();
            }).catch(()=>{
                reject();
            });
        });
    });
}

export const selectSection = (dispatch, sectionId, sections, items) => {
    //dispatch(
    //  {type:SECTION_SELECT,
    //  section:sectionId});
    loadSections(dispatch, sections).then((resSections) => {
        loadItems(dispatch, items)
            .then(resItems => {
                var sectionItems = filterItemsForSection(sectionId, resSections, resItems);
                dispatch({
                    type: SECTION_ITEMS_UPDATE,
                    payload: sectionItems
                });
            })
    });
}

export const filterItemsForSection = (sectionId, sections, items) => {
    var sectionSelected = sections.find(i => i._id === sectionId);
    if (sectionSelected) {
        var sectionItems = [];
        sectionSelected.options.forEach(o => {
            var sectionItem = items.find(i => i._id === o._ref);
            if (sectionItem)
                sectionItems.push(sectionItem);
        });
        return sectionItems;
    }
    return [];
}