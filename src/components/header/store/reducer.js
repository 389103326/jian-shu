import { fromJS } from 'immutable'
import * as actionType from './actionType'

const defaultState = fromJS({
  focus: false,
  list: [],
  page: 1,
  totalPage: 1,
  mouseIn: false
});

export const reducer = (preState = defaultState, action) => {
  switch (action.type) {
    case (actionType.SEARCH_FOCUS):
      return preState.set('focus', true);
    case (actionType.SEARCH_BLUR):
      return preState.set('focus', false);
    case (actionType.CHANGE_LIST):
      return preState.merge({
        list: action.data,
        totalPage: action.totalPage
      });
    case (actionType.MOUSE_ENTER):
      return preState.set('mouseIn', true);
    case (actionType.MOUSE_LEAVE):
      return preState.set('mouseIn', false);
    case (actionType.PAGE_CHANGE):
      return preState.set('page', action.page);
    default:
      return preState
  }
}
