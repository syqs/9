export function updateList(payload){
  return {
    type:'UPDATE_LIST',
    payload
  }
}

export function selectedTopic(payload){
  return {
    type:'SELECTED_TOPIC',
    payload
  }
}

export function userQuit(payload){
  console.log('sadf',payload)
  return {
    type:'USER_QUIT',
    payload
  }
}
