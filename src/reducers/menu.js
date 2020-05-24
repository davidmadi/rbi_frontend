import { TOP_SECTIONS_UPDATE, MENU_UPDATE, ITEMS_UPDATE,SECTION_SELECT,SECTION_ITEMS_UPDATE } from '../actions/menu';

const INITIAL_STATE = {
  sections:[],
  menu:[],
  items:[],
  sectionItems:[],
  menuResponse:null,
  sectionsResponse:null,
  itemsResponse:null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

      case TOP_SECTIONS_UPDATE:
        var mergedSections = mergeForTopSections(action.payload, state.menuResponse);
        return { ...state, sections:mergedSections,sectionsResponse:action.payload };

      case MENU_UPDATE:
        var mergedSections = mergeForTopSections(state.sectionsResponse, action.payload);
        return { ...state, sections:mergedSections, menuResponse: action.payload };

      case ITEMS_UPDATE:
        return { ...state, items: action.payload };

      case SECTION_ITEMS_UPDATE:
        return { ...state, sectionItems:action.payload}

      default: return { ...state };
  }
}

function mergeForTopSections(sectionResponse, menuResponse){
  if(menuResponse && sectionResponse &&
    menuResponse.options && sectionResponse.length){
    var res = [];
    for(var i = 0; i < menuResponse.options.length; i++){
      var section = sectionResponse.find(s => s._id == menuResponse.options[i]._ref);
      if(section)
        res.push({...section, ...menuResponse.options[i]});
    }
    return res;
  }
  return [];
}

