import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import { ListItem, ListInfo, LoadMore } from '../style'
import { actionCreater } from '../store'
import { Link } from 'react-router-dom'

class Article extends PureComponent {
  render() {
    const { list, page, getMoreList } = this.props
    let arr = list.toJS();
    console.log(page);

    return (
      <Fragment>
        {
          arr.map((item, index) => {
            return (
              <Link to='./detail' key={item.id + index}>
                <ListItem>
                  <img alt='list' className='pic' src={item.imgUrl}></img>
                  <ListInfo>
                    <h3 className='title'>{item.title}</h3>
                    {
                      item.content.map(el => (<p key={el}>{el}</p>))
                    }
                  </ListInfo>
                </ListItem>
              </Link>
            )
          })
        }
        <LoadMore onClick={() => getMoreList(page)}>更多文字</LoadMore>
      </Fragment>
    )
  }
}

const mapState = (state) => ({
  list: state.getIn(['home', 'articleList']),
  page: state.getIn(['home', 'articleListPage'])
})

const mapDispatch = (dispatch) => ({
  getMoreList(page) {
    const action = actionCreater.getMoreListAction(++page);
    dispatch(action);
  }
})

export default connect(mapState, mapDispatch)(Article);