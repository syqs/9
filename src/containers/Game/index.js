import React from 'react'
import { connect } from 'react-redux'
import List from '../../components/List'
import updateList from '../Actions'

const mapStateToProps = state => (
  {
    list: state.list,
    config: {}
  }
)

const Game = props => {

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

  const createListTopics = Topic => <li key={Topic}> {Topic} </li>

  return (
    <ul>
      <List
        titles={Object.keys(flatGroups)||[]}
        categories={flatGroups}
        payload={list} />
    </ul>
  );

}


export default connect(mapStateToProps)(Game)
