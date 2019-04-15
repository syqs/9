import React from 'react'
import { connect } from 'react-redux'
import List from '../../components/List'
import updateList from '../Actions'
import View from '../../components/View'

const mapStateToProps = state => (
  {
    ...state,
    list: state.list.data,
    config: {},
  }
)

const Game = props => {
  console.log('le props', props)
  const { list, payload } = props

  const makeGroups = list => {

    let listCat = {}
    list.map( i => {
      const category = i.category
      listCat[category] = listCat[category] || []
      listCat[category].push(i)
    })
    return listCat
  }

  const flatGroups = makeGroups(list)

  const createListTopics = topic => <li key={topic}> {topic} </li>

  return (
    <div>
      <ul>
        <List
          titles={Object.keys(flatGroups)||[]}
          categories={flatGroups}
          payload={list} />
      </ul>
      <View topics={flatGroups}/>
    </div>
  );

}


export default connect(mapStateToProps)(Game)
