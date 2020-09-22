import { TOP_SECTIONS_UPDATE, MENU_UPDATE, ITEMS_UPDATE, SECTION_ITEMS_UPDATE } from '../actions/actions';

const INITIAL_STATE = {
    sections: [],
    menu: [],
    items: [],
    sectionItems: [],
    selectedSection : null,
    menuResponse: null,
    sectionsResponse: null,
    itemsResponse: null,
    mainLoaded: false
};

export default (state = INITIAL_STATE, action) => {
    let loaded = state.loaded;
    switch (action.type) {
        case TOP_SECTIONS_UPDATE:
            var mergedSections = mergeForTopSections(action.payload, state.menuResponse);
            loaded = mergedSections && mergedSections.length > 0;
            return {...state, sections: mergedSections, sectionsResponse: action.payload, mainLoaded:loaded };

        case MENU_UPDATE:
            mergedSections = mergeForTopSections(state.sectionsResponse, action.payload);
            loaded = mergedSections && mergedSections.length > 0;
            return {...state, sections: mergedSections, menuResponse: action.payload, mainLoaded:loaded };

        case ITEMS_UPDATE:
            return {...state, items: action.payload };

        case SECTION_ITEMS_UPDATE:
            return {...state, sectionItems: action.payload, selectedSection:action.selectedSection }

        default:
            return {...state };
    }
}

function mergeForTopSections(sectionResponse, menuResponse) {
    if (menuResponse && sectionResponse &&
        menuResponse.options && sectionResponse.length) {
        var res = [];
        for (var i = 0; i < menuResponse.options.length; i++) {
            for (var j = 0; j < sectionResponse.length; j++) {
                if (menuResponse.options[i]._ref === sectionResponse[j]._id)
                    res.push({...sectionResponse[j], ...menuResponse.options[i] });
            }
        }
        return res;
    }
    return [];
}