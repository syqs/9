let userAnswers = []
const addUserAnswer = (obj) => userAnswers.push(obj)

export default function (
  state = {
    userAnswers
  },
  action
) {
  const { type, payload } = action

  switch (type) {
    case 'USER_ANSWER':
      addUserAnswer(payload)
      return {
        userAnswers: [ ...userAnswers]
      }
      break;

    default:
      return state
  }
  return state
}
