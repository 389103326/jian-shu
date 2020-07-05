import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { 
  TopicWrapper,
  TopicItem
 } from '../style'

class Topic extends PureComponent {
  render() {
    const { topicList } = this.props
    const arr = topicList.toJS()

    return (
      <TopicWrapper>
        {
          arr.map(item => {
            return (
              <TopicItem key={item.id}>
                <img className='topic-pic' alt='hot' src={item.imgUrl}></img>
                {item.title}
              </TopicItem>
            )
          })
        }
        {/* <TopicItem>
          <img className='topic-pic' alt='hot' src='https://upload-images.jianshu.io/upload_images/16705569-271408f0a0b3efc9.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240/format/webp'></img>
          社会热点
        </TopicItem> */}
      </TopicWrapper>
    )
  }
}

const mapState = (state) => {
  return {
    topicList: state.getIn(['home', 'topicList'])
  }
}


export default connect(mapState, null)(Topic);