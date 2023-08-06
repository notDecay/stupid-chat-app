/**
 * @type {FunctionalComponent<IMessageAnchorProps, string>} 
 */
function makeAnchorLink({ link }) {
  return /*html*/`
    <a class="" target="_blank" href="${link}">
      <span>${link}</span>
    </a>
  `
}

/**
 * @type {FunctionalComponent<string, string>} 
 */
function makeTextBold(messageContent) {
  return /*html*/`
    <b>
      <span>${messageContent}</span>
    </b>
  `
}

/**
 * @type {FunctionalComponent<string, string>} 
 */
function makeTextItalic(messageContent) {
  return /*html*/`
    <i>
      <span>${messageContent}</span>
    </i>
  `
}

export { makeAnchorLink, makeTextBold, makeTextItalic }