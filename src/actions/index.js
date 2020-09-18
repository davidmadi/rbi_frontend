import {loadSections, loadMenu, loadItems} from '../effects/effects';

export const TOP_SECTIONS_UPDATE = 'TOP_MENU_UPDATE';
export const MENU_UPDATE = 'MENU_UPDATE';
export const ITEMS_UPDATE = 'ITEMS_UPDATE';
export const SECTION_ITEMS_UPDATE = 'SECTION_ITEMS_UPDATE';

export const loadAll = (dispatch, sections, menus, items) =>{
    return new Promise((resolve, reject) =>{
        loadSections(dispatch, sections).then(() => {
            loadMenu(dispatch, menus).then(()=>{
                loadItems(dispatch, items).then(()=>{
                    resolve();
                }).catch(()=>{
                    reject();
                });
            }).catch(()=>{
                reject();
            });
        }).catch(()=>{
            reject();
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