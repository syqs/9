import React from 'react'
import { selectedTopic } from '../../containers/Actions'
import { connect } from 'react-redux'

import { generateActionButton } from '../../tools'

const List = props => {

  const { titles, categories, payload, dispatch } = props

  const handleClick = topic => console.log(topic)

  if (titles.length === 0) return 'No items in the list'

  const createListTopics = topic => (
    <li key={topic}>
      { generateActionButton({ name: topic, action: {type:'SUM', payload: topic}, dispatch}) }
   </li>
  )

  return (
    <ul>
      { titles.map( createListTopics ) }
    </ul>
  )
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(List)
