import { fromJS } from 'immutable'
import { CHANGE_HOME_DATA, GET_MORE_LIST, TOGGLE_SRCOLL_TOP } from './actionType'

const defaultState = fromJS({
  topicList: [],
  articleList: [],
  recommandList: [],
  articleListPage: 1,
  showScroll: false
});

const changeHomeData = (state, action) => {
  return state.merge({
    topicList: fromJS(action.topicList),
    articleList: fromJS(action.articleList),
    recommandList: fromJS(action.recommandList)
  });
}

const getHomeList = (state, action) => {
  return state.merge({
    articleList: state.get('articleList').concat(action.data),
    articleListPage: action.page
  });
}

export const reducer = (preState = defaultState, action) => {
  switch (action.type) {
    case CHANGE_HOME_DATA:
      return changeHomeData(preState, action);
    case GET_MORE_LIST:
      return getHomeList(preState, action);
    case TOGGLE_SRCOLL_TOP:
      return preState.set('showScroll', action.data);
    default:
      return preState;
  }
}
