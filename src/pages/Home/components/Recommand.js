import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { RecommandWrapper, RecommandItem } from '../style'

class Recommand extends PureComponent {
  render() {
    const { list } = this.props
    let arr = list.toJS()
    
    return (
      <RecommandWrapper>
        {
          arr.map(item => {
            return (
              <RecommandItem imgUrl={item.imgUrl} key={item.id}></RecommandItem>
            )
          })
        }
      </RecommandWrapper>
    )
  }
}

const mapState = (state) => {
  return {
    list: state.getIn(['home', 'recommandList'])
  }
}

export default connect(mapState, null)(Recommand);