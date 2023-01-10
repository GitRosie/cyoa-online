const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  //showTextNode(0)
}



function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId < 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  //showTextNode(nextTextNodeId)
}
