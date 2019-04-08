import React from 'react'

export default function List(props) {

  const { titles, categories, payload } = props
  console.log('props', payload, categories)
  const handleClick = (e) => console.log(e.target.name)

  if (titles.length === 0) return 'No items in the list'


  const createListTopics = Topic => (
    <button
      key={Topic}
      onClick={handleClick}
      >
       {Topic}
     </button>
  )

  return (
    <ul>
      { titles.map( createListTopics ) }
    </ul>
  );
}
