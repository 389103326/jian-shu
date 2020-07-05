import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import List from './components/Article'
import Recommand from './components/Recommand'
import Topic from './components/Topic'
import Writer from './components/Writer'
import { actionCreater } from './store'
import {
  HomeWrapper,
  HomeLeft,
  HomeRight,
  BackTop
} from './style'

class Home extends PureComponent {
  render() {
    return (
      <HomeWrapper>
        <HomeLeft>
          <img alt='540' className='banner-img' src='https://upload.jianshu.io/admin_banners/web_images/4982/17e50a79da05aa512c0e1ace7176a8c9400fd891.png?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540'></img>
          <Topic />
          <List />
        </HomeLeft>
        <HomeRight>
          <Recommand />
          <Writer />
          {
            this.props.showScroll ? <BackTop onClick={this.handleScrollTop}>回到顶部</BackTop> : null
          }
        </HomeRight>
      </HomeWrapper>
    )
  }

  componentDidMount() {
    this.props.getHomeData();
    this.bindEvents();
  }

  componentWillUnmount() {
    this.unbindEvents();
  }

  handleScrollTop() {
    window.scrollTo(0, 0);
  }

  bindEvents() {
    window.addEventListener('scroll', this.props.changeScrollShow)
  }

  unbindEvents() {
    window.removeEventListener('scroll', this.props.changeScrollShow);
  }
}

const mapState = (state) => ({
  showScroll: state.getIn(['home', 'showScroll'])
})

const mapDispatch = (dispatch) => {
  return {
    getHomeData() {
      const action = actionCreater.getHomeInfoAction();
      dispatch(action);
    },
    changeScrollShow() {
      if (document.documentElement.scrollTop > 400) {
        const action = actionCreater.toggleScrollShow(true);
        dispatch(action)
      }else {
        const action = actionCreater.toggleScrollShow(false);
        dispatch(action)
      }
    }
  }
}

export default connect(mapState, mapDispatch)(Home);