
export default function (
  state = [{"category":"Entertainment: Video Games","type":"boolean","difficulty":"hard","question":"In &quot;Metal Gear Solid 2&quot;, you will see through the eyes of Psycho Mantis if you go first person during his boss fight.","correct_answer":"True","incorrect_answers":["False"]},{"category":"Science & Nature","type":"boolean","difficulty":"hard","question":"Scientists can grow teeth from urine.","correct_answer":"True","incorrect_answers":["False"]},{"category":"Science: Mathematics","type":"boolean","difficulty":"hard","question":"If you could fold a piece of paper in half 50 times, its&#039; thickness will be 3\/4th the distance from the Earth to the Sun.","correct_answer":"True","incorrect_answers":["False"]},{"category":"General Knowledge","type":"boolean","difficulty":"hard","question":"Pluto is a planet.","correct_answer":"False","incorrect_answers":["True"]},{"category":"Entertainment: Video Games","type":"boolean","difficulty":"hard","question":"All of these maps were in &quot;Tom Clancy&#039;s Rainbow Six Siege&quot; on its initial release: House, Clubhouse, Border, Consulate.","correct_answer":"False","incorrect_answers":["True"]},{"category":"Celebrities","type":"boolean","difficulty":"hard","question":"Lady Gaga&#039;s real name is Stefani Joanne Angelina Germanotta.","correct_answer":"True","incorrect_answers":["False"]},{"category":"Entertainment: Film","type":"boolean","difficulty":"hard","question":"The weapon Clint Eastwood uses in &quot;Dirty Harry&quot; was a .44 Automag.","correct_answer":"False","incorrect_answers":["True"]},{"category":"Entertainment: Music","type":"boolean","difficulty":"hard","question":"Pete Townshend&#039;s solo album, &quot;White City: A Novel&quot;, is set in the metropolitan area of Chicago.","correct_answer":"False","incorrect_answers":["True"]},{"category":"General Knowledge","type":"boolean","difficulty":"hard","question":"Spoon theory is a theory, utilizing &quot;Spoons&quot; as a metaphor for energy they can use in a day.","correct_answer":"True","incorrect_answers":["False"]},{"category":"Entertainment: Music","type":"boolean","difficulty":"hard","question":"The song Scatman&#039;s World was released after Scatman (Ski-Ba-Bop-Ba-Dop-Bop).","correct_answer":"True","incorrect_answers":["False"]}],
  action
) {
  const { type, payload } = action

  switch (type) {
    case 'UPDATE_LIST':
      return [ ...payload ]
      break;
    default:
    return  [ ...state ]
  }
  return  [ ...state ]
}
