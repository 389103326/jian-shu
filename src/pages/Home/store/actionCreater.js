import { CHANGE_HOME_DATA, GET_MORE_LIST, TOGGLE_SRCOLL_TOP } from './actionType'
import axios from 'axios'
const { fromJS } = require('immutable')

const getHomeInfo = (data) => ({
  type: CHANGE_HOME_DATA,
  topicList: data.topicList,
  articleList: data.articleList,
  recommandList: data.recommandList
});

const getMoreList = (data, page) => ({
  type: GET_MORE_LIST,
  data: fromJS(data),
  page
})

export const getHomeInfoAction = () => (
  (dispatch) => {
    axios.get('/api/Home.json').then(res => {
      if (res.status === 200 && res.data.code === 1) {
        const result = res.data.data
        dispatch(getHomeInfo(result));
      }
    });
  }
);

export const getMoreListAction = (page) => (
  (dispatch) => {
    axios.get('/api/MoreList.json?page='+page).then(res => {
      if (res.status === 200 && res.data.code === 1) {
        const result = res.data.data
        dispatch(getMoreList(result, page));
      }
    })
  }
)

export const toggleScrollShow = (show) => ({
  type: TOGGLE_SRCOLL_TOP,
  data: show
})

