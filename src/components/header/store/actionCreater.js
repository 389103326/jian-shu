import { SEARCH_FOCUS, SEARCH_BLUR, CHANGE_LIST, MOUSE_ENTER, MOUSE_LEAVE, PAGE_CHANGE } from './actionType'
import axios from 'axios'
const { fromJS } = require('immutable')

const changeList = (data) => ({
  type: CHANGE_LIST,
  data: fromJS(data),
  totalPage: Math.ceil(data.length/10)
})

export const getSearchFocusAction = () => ({
  type: SEARCH_FOCUS
})

export const getSearchBlurAction = () => ({
  type: SEARCH_BLUR
})

export const getMouseEnterAction = () => ({
  type: MOUSE_ENTER
})

export const getMouseLeaveAction = () => ({
  type: MOUSE_LEAVE
})

export const getPageChangeAction = (page) => ({
  type: PAGE_CHANGE,
  page
})

export const getList = () => {
  return (dispatch) => {
    axios.get('./api/HeaderList.json')
    .then(res => {
      if (res.status === 200 && res.data.code === 1) {
        const data = res.data.data
        dispatch(changeList(data))
      }
    })
  }
}