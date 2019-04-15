export function updateList(payload){
  return {
    type:'UPDATE_LIST',
    payload
  }
}

export function selectedTopic(payload){
  console.log('sadf',payload)
  return {
    type:'SELECTED_TOPIC',
    payload
  }
}
