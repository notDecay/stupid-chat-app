import {
  makeTextBold,
  makeTextItalic
} from "../../components/page/chat/msgMarkdown.js"

export default class {
  parse(text) {
    text = text
    .replace(/\*\*(.*)\*\*/gim, (content) => {
      console.log(content);
      return makeTextBold(content)
    })
    .replace(/\*(.*)\*|_(.*)_/gim, (content) => makeTextItalic(content))
    .replace(/^```(?:js|javascript|)\n([\s\S]*?)```$/gm, /*html*/`<pre>$1</pre>`)
    .replace(/^`(.*)`$/g, /*html*/`<pre>$1</pre>`)
    .replace(/^\>(.+)/gm, /*html*/'<blockquote>$1</blockquote>')
    // headings
    .replace(/^([\#]{6}) (.+)/gm, /*html*/`<h6>$2</h6>`)
    .replace(/^([\#]{5}) (.+)/gm, /*html*/`<h5>$2</h5>`)
    .replace(/^([\#]{4}) (.+)/gm, /*html*/`<h4>$2</h4>`)
    .replace(/^([\#]{3}) (.+)/gm, /*html*/`<h3>$2</h3>`)
    .replace(/^([\#]{2}) (.+)/gm, /*html*/`<h2>$2</h2>`)
    .replace(/^([\#]{1}) (.+)/gm, /*html*/`<h1>$2</h1>`)
    //ul
    .replace(/^\s*\n\*/gm, '<ul>\n*')
    .replace(/^(\*.+)\s*\n([^\*])/gm, '$1\n</ul>\n\n$2')
    .replace(/^\*(.+)/gm, '<li>$1</li>')
    //ol
    .replace(/^\s*\n\d\./gm, '<ol>\n1.')
    .replace(/^(\d\..+)\s*\n([^\d\.])/gm, '$1\n</ol>\n\n$2')
    .replace(/^\d\.(.+)/gm, '<li>$1</li>')

    return text
  }
}