import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { generateActionButton } from '../../tools'

const View = props => {

  const { dispatch } = props

  if (props.list.selectedTopic === '') return null
  const selectedTopic = props.topics[ props.list.selectedTopic ]

  const createListTopics = topic => (
    <li>
      { generateActionButton({ name: topic, action: {type:'SUM', payload: topic}, dispatch}) }
   </li>
  )

  return (
    <div style={{ display:'flex', width:300,
      height:300, position:'absolute',
      top:40, right:300 }}>
      <div style={{flex:1}} >
      {
        selectedTopic
          .map( topic => _.unescape( topic.question ) )
          .map( question => question.replace(/&#039;/gi, "'") ) // lodash unescape aparently does not escape '
      }
      </div>
      <div style={{flex:1}} >
        { generateActionButton(
           { name: 'True',
             action: {
               type:'USER_ANSWER',
               payload: {answered: true, question: selectedTopic}},
             dispatch
           }
          )
        }
        { generateActionButton(
           { name: 'False',
             action: {
               type:'USER_ANSWER',
               payload: {answered: false, question: selectedTopic}},
             dispatch
           }
          )
        }

      </div>
    </div>
  )
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(View)
