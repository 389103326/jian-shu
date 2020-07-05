import React, { PureComponent, Fragment } from 'react'
import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { actionCreater } from './store'
import {
  HeaderWrapper,
  Logo,
  Nav,
  NavItem,
  SearchWrapper,
  NavSearch,
  Addition,
  Button,
  SearchInfo,
  SearchInfoTitle,
  SearchInfoSwitch,
  SearchInfoList,
  SearchInfoItem
} from './style.js'

class Header extends PureComponent {

  render() {
    const { focus, list, handleFocus, handleBlur } = this.props
    return (
      <Fragment>
        <HeaderWrapper>
          <Link to='/'>
            <Logo />
          </Link>
          <Nav>
            <NavItem className='left active'>首页</NavItem>
            <NavItem className='left'>下载</NavItem>

            <SearchWrapper>
              <CSSTransition
                in={focus}
                timeout={300}
                classNames="slide"
              >
                <NavSearch
                  className={focus ? 'focus' : ''}
                  onFocus={() => handleFocus(list)}
                  onBlur={handleBlur}
                ></NavSearch>
              </CSSTransition>
              <span className={focus ? 'focus iconfont zoom' : 'iconfont zoom'}>&#xe63f;</span>
              {this.getSearchInfo()}
            </SearchWrapper>

            <Addition>
              <Button className='writting'>
                <span className="iconfont">&#xe600;</span>
                写文章
              </Button>
              <Button className='reg'>注册</Button>
              <NavItem className='right'>登陆</NavItem>
              <NavItem className='right'>
                <span className="iconfont">&#xe65a;</span>
              </NavItem>
            </Addition>
          </Nav>
        </HeaderWrapper>
      </Fragment >
    )
  }

  getSearchInfo() {
    const { focus, list, page, totalPage, mouseIn, handleMouseEnter, handleMouseLeave, handleChangePage } = this.props
    const _list = list.toJS();
    const pageList = []

    if (_list.length > 0) {
      for (let i = (page - 1) * 10; i < page * 10; i++) {
        _list[i] && pageList.push(<SearchInfoItem key={_list[i]}>{_list[i]}</SearchInfoItem>)
      }
    }
    if (focus || mouseIn) {
      return (
        <SearchInfo onMouseEnter={handleMouseEnter} onMouseLeave={() => handleMouseLeave()}>
          <SearchInfoTitle>
            热门搜索
                  <SearchInfoSwitch onClick={() => handleChangePage(page, totalPage, this.spinIcon)}>
                    <span ref={(icon)=>{this.spinIcon=icon}} className='iconfont spin'>&#xe8e7;</span>
                    换一批
                  </SearchInfoSwitch>
          </SearchInfoTitle>
          <SearchInfoList>
            {
              pageList
            }
          </SearchInfoList>
        </SearchInfo>
      )
    } else {
      return null
    }
  }
}

const mapStatetoProps = (state) => {
  return {
    focus: state.get('header').get('focus'),
    list: state.get('header').get('list'),
    page: state.get('header').get('page'),
    totalPage: state.get('header').get('totalPage'),
    mouseIn: state.get('header').get('mouseIn')
  }
}

const mapDispatchtoProps = (dispatch) => {
  return {
    handleFocus(list) {
      console.log('hanldeFouces')
      // console.log(actionCreater.getList())
      list.size === 0 && dispatch(actionCreater.getList());
      const action = actionCreater.getSearchFocusAction();
      dispatch(action);
    },
    handleBlur() {
      console.log('handleBlur')
      const action = actionCreater.getSearchBlurAction();
      dispatch(action);
    },
    handleMouseEnter() {
      console.log('handleMouseEnter')
      const action = actionCreater.getMouseEnterAction();
      dispatch(action);
    },
    handleMouseLeave() {
      console.log('handleMouseLeave')
      const action = actionCreater.getMouseLeaveAction();
      dispatch(action);
    },
    handleChangePage(page, totalPage, spinIcon) {
      let originAngle = spinIcon.style.transform.replace(/[^0-9]/ig, '');
      originAngle = originAngle ? parseInt(originAngle) : 0
      spinIcon.style.transform = `rotate(${originAngle+360}deg)`
      page += 1
      const action = actionCreater.getPageChangeAction(page > totalPage ? 1 : page);
      dispatch(action);
    }
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Header);