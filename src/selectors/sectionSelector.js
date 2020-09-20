import { SECTION_ITEMS_UPDATE } from '../actions/actions';

export const filterItemsForSection = (dispatch, sectionId, sections, items) => {
  
  var sectionSelected = sections.find(i => i._id === sectionId);
  if (sectionSelected) {
      var sectionItems = [];
      sectionSelected.options.forEach(o => {
          var sectionItem = items.find(i => i._id === o._ref);
          if (sectionItem)
              sectionItems.push(sectionItem);
      });
      dispatch({
        type: SECTION_ITEMS_UPDATE,
        payload: sectionItems
      });
  }

}