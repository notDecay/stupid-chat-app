/**
 * Umbrella JS  http://umbrellajs.com/
 * -----------
 * Small, lightweight jQuery alternative
 * @author Francisco Presencia Fandos https://francisco.io/
 * @inspiration http://youmightnotneedjquery.com/
 * documentation you can find here https://umbrellajs.com/documentation
 * I added it just because I'm too lazy to go to that ^
 */

/**Find nodes from the HTML with a CSS selector
 * ```js
 * u('ul#demo li')
 * u(document.getElementById('demo'))
 * u(document.getElementsByClassName('demo'))
 * u([ document.getElementById('demo') ])
 * u( u('ul li') )
 * u('<a>')
 * u('li', context)
 * ```
 * @typedef {keyof HTMLElementTagNameMap} ElementTagName
 * @typedef {u | string | Element | Element[]} UmbrellaSelector
 * @param {UmbrellaSelector} parameter The first parameter can be:
 * - A text CSS selector
 * - A single HTML Node. This is specially useful in events where you can just pass this
 * - A NodeList or other similar objects that can be converted to an array
 * - An array of nodes (actually it can be an array of anything you 
 * want as in `["a", "b"]`, however this is not officially supported and might change at any moment)
 * - Another Umbrella instance
 * - An HTML fragment as a string
 * - Nothing
 * @param {*} context The second parameter is only for the CSS selector, 
 * which indicates a portion of the DOM where the selector is applied. For example, 
 * with `u('li', u('ul').first())` it will find all of the `li` from the first `ul`.
 * @note You should use` u('#demo')` instead of `u(document.getElementById('demo'))`, 
 * internally it's optimized to do this in a fast way. That was only an example of what's possible.
 * @returns An instance of Umbrella JS so you can chain it to any of the other methods.
 */
const u = function(parameter = null, context = null) {
  // Make it an instance of u() to avoid needing 'new' as in 'new u()' and just
  // use 'u().bla()'.
  // @reference http://stackoverflow.com/q/24019863
  // @reference http://stackoverflow.com/q/8875878
  if (!(this instanceof u)) {
    return new u(parameter, context)
  }
  // No need to further processing it if it's already an instance
  if (parameter instanceof u) return parameter
  // Parse it as a CSS selector if it's a string
  if (typeof parameter === 'string') {
    parameter = this.select(parameter, context)
  }
  // If we're referring a specific node as in on('click', function(){ u(this) })
  // or the select() function returned a single node such as in '#id'
  if (parameter && parameter.nodeName) {
    parameter = [parameter]
  }
  // Convert to an array, since there are many 'array-like' stuff in js-land
  this.nodes = this.slice(parameter)
}

// Map u(...).length to u(...).nodes.length
u.prototype = {
  /**Check how many elements are matched
   * @readonly
   */
  get length() {
    return this.nodes.length
  },
  get scrollHeight() {
    return this.nodes[0].scrollHeight
  },
  set placeholder(text) {
    if (this.isInputOrTextareaElement(this.nodes[0])) {
      this.nodes[0].placeholder = text
      return
    }
    console.warn('".placeholder" setter only work on input or textarea element');
  },
  set disabled(isDisabled) {
    if (this.isInputOrTextareaElement(this.nodes[0]) ||
      this.nodes[0] instanceof HTMLButtonElement
    ) {
      this.nodes[0].disabled = isDisabled
      return
    }
    console.warn('".disabled" setter only work on input or textarea element');
  },
  /**@type {Element[]} */
  nodes: [],
  /**Add html class(es) to all of the matched elements.
   * ```js
   * .addClass('name1')
   * .addClass('name1 name2 nameN')
   * .addClass('name1,name2,nameN')
   * .addClass('name1', 'name2', 'nameN')
   * .addClass(['name1', 'name2', 'nameN'])
   * .addClass(['name1', 'name2'], ['name3'], ['nameN'])
   * .addClass(function(node, i){ return 'name1'; })
   * .addClass(function(){ return 'name1'; }, function(){ return 'name2'; })
   * ```
   * @typedef {string | string[] | ((...args?: [node, index]) => string)} UmbrellaAddClassSelector
   * @param {UmbrellaAddClassSelector[]} name
   * `name1`, `name2`, `nameN`: the class name (or variable containing it) 
   * to be added to all of the matched elements. 
   * It accepts many different types of parameters (see above).
   * @returns {u} the same instance of Umbrella JS
   */
  addClass: function(...name) {
    return this.eacharg(arguments, function(el, name) {
      el.classList.add(name)
    })
  },
  // [INTERNAL USE ONLY]
  // Add text in the specified position. It is used by other functions
  adjacent: function(html, data, callback) {
    if (typeof data === 'number') {
      if (data === 0) {
        data = []
      } 
      else data = new Array(data).join().split(',').map(Number.call, Number)
    }
    // Loop through all the nodes. It cannot reuse the eacharg() since the data
    // we want to do it once even if there's no "data" and we accept a selector
    return this.each(function(node, j) {
      const fragment = document.createDocumentFragment()
      // Allow for data to be falsy and still loop once
      u(data || {}).map(function(el, i) {
        // Allow for callbacks that accept some data
        const part = typeof html === 'function' ? html.call(this, el, i, node, j) : html
        if (typeof part === 'string') {
          return this.generate(part)
        }
        return u(part)
      }).each(function(n) {
        this.isInPage(n) ?
          fragment.appendChild(u(n).clone().first()) :
          fragment.appendChild(n)
      })
      callback.call(this, node, fragment)
    })
  },
  /**Add some html as a sibling after each of the matched elements.
   * ```js
   * .after(html)
   * 
   * .after('<div>')
   * .after(u('<div>'))
   * .after(u('<div>').first()) // Same as document.createElement('div')
   * .after(u('<div></div><div></div>'))
   * .after(function(){})
   * .after(function(el){}, elements)
   * .after(function(el){}, 10)
   * ```
   * @param {string} html
   * Any of these elements:
   * - `string` containing the html that is going to be inserted
   * - `instance of Umbrella`
   * - `HTML node`
   * - `array` containing HTML nodes
   * 
   * A callback that returns any of the previous. It gets passed these parameters:
   * - `el`: the current element from the elements parameter, {} if none is specified and i if elements is number
   * - `i`: the index of the current element
   * @param {*} data optional, it can be any of the following:
   * - An array of elements that will be passed to the callback. 
   * The callback is executed once per element, and all of them are added consecutively.
   * - A CSS selector, so the function will be executed once per matched element.
   * - A number, in which case the function will be executed that number of times
   * @returns {u} the same instance of Umbrella JS
   */
  after: function(html, data) {
    return this.adjacent(html, data, function(node, fragment) {
      node.parentNode.insertBefore(fragment, node.nextSibling)
    })
  },
  /**Add some html as a child at the end of each of the matched elements
   * ```js
   * .append(html)
   *
   * .append('<div>')
   * .append(u('<div>'))
   * .append(u('<div>').first()) // Same as document.createElement('div')
   * .append(u('<div></div><div></div>'))
   * .append(function(){})
   * .append(function(el){}, elements)
   * .append(function(el){}, 10)
   * ```
   * @param {string} html
   * Any of these elements:
   * - `string` containing the html that is going to be inserted
   * - `instance of Umbrella`
   * - `HTML node`
   * - `array` containing HTML nodes
   * 
   * A callback that returns any of the previous. It gets passed these parameters:
   * - `el`: the current element from the elements parameter, {} if none is specified and i if elements is number
   * - `i`: the index of the current element
   * @param {*} data optional, it can be any of the following:
   * - An array of elements that will be passed to the callback. 
   * The callback is executed once per element, and all of them are added consecutively.
   * - A CSS selector, so the function will be executed once per matched element.
   * - A number, in which case the function will be executed that number of times
   * @returns {u} the same instance of Umbrella JS
   * @see https://umbrellajs.com/documentation#append
   */
  append: function(html, data) {
    return this.adjacent(html, data, function(node, fragment) {
      node.appendChild(fragment)
    })
  },
  // [INTERNAL USE ONLY]
  // Normalize the arguments to an array of strings
  // Allow for several class names like "a b, c" and several parameters
  args: function(args, node, i) {
    if (typeof args === 'function') {
      args = args(node, i)
    }
    // First flatten it all to a string http://stackoverflow.com/q/22920305
    // If we try to slice a string bad things happen: ['n', 'a', 'm', 'e']
    if (typeof args !== 'string') {
      args = this.slice(args).map(this.str(node, i))
    }
    // Then convert that string to an array of not-null strings
    return args.toString().split(/[\s,]+/).filter(function(e) {
      return e.length
    })
  },
  /**Extract structured data from the DOM.
   * ```js
   * .array()
   * .array(callback)
   * ```
   * @template {Array} T
   * @param {(node) => any} callback 
   * `callback = function(node, i){ return node.innerHTML }`: a callback to be 
   * called on each node. The returned value is the one set on the final version. 
   * If an array is returned then these elements are added to the set. 
   * However, if nothing or null is returned it removes them.
   * @returns {T} A simple javascript array consisting on the elements returned by the callback
   */
  array: function(callback) {
    callback = callback
    var self = this
    return /**@type {T}*/(this.nodes.reduce(function(list, node, i) {
      var val
      if (callback) {
        val = callback.call(self, node, i)
        if (!val) val = false
        if (typeof val === 'string') val = u(val)
        if (val instanceof u) val = val.nodes
      } else {
        val = node.innerHTML
      }
      return list.concat(val !== false ? val : [])
    }, []))
  },
  /**Handle attributes for the matched elements
   * ```js
   * // GET
   * .attr('name');
   *
   * // SET
   * .attr('name', 'value');
   * .attr('name', function(node, i){ return 'value'; });
   * .attr({ name1: 'value', name2: 'value2' });
   * ```
   * @param {any} name **GET** 
   * `name`: the attribute that we want to get from the first matched element
   * @param {any} value **SET**  
   * `name`: the attribute that we want to set for all of the matched elements.
   * 
   * `value`: what we want to set the attribute to. If it's not defined, then we get the name
   * @param {any} data 
   * @returns 
   * **GET** `string`: the value of the attribute
   * 
   * **SET** `u`: returns the same instance of Umbrella JS
   * @note
   * You must understand that `.attr()` will only retrieve the attributes, 
   * not the properties like `checked`, To understand it better, 
   * check [jQuery's attr() vs prop()](http://api.jquery.com/prop/).
   * 
   * Each property is different so you should consult each case. For example, 
   * if you wanted to get the property checked you could do:
   * ```js
   * u('.terms-os-service').is(':checked');
   * ```
   * @see https://umbrellajs.com/documentation#attr
   */
  attr: function(name, value, data = null) {
    data = data ? 'data-' : ''
    // This will handle those elements that can accept a pair with these footprints:
    // .attr('a'), .attr('a', 'b'), .attr({ a: 'b' })
    return this.pairs(name, value, function(node, name) {
      return node.getAttribute(data + name)
    }, function(node, name, value) {
      if (value) {
        node.setAttribute(data + name, value)
      }
      else {
        node.removeAttribute(data + name)
      }
    })
  },
  /**Add some html before each of the matched elements.
   * ```js
   * .before(html)
   * 
   * .before('<div>')
   * .before(u('<div>'))
   * .before(u('<div>').first()) // Same as document.createElement('div')
   * .before(u('<div></div><div></div>'))
   * .before(function(){})
   * .before(function(el){}, elements)
   * .append(function(el){}, 10)
   * ```
   * * @param {string} html
   * Any of these elements:
   * - `string` containing the html that is going to be inserted
   * - `instance of Umbrella`
   * - `HTML node`
   * - `array` containing HTML nodes
   * 
   * A callback that returns any of the previous. It gets passed these parameters:
   * - `el`: the current element from the elements parameter, {} if none is specified and i if elements is number
   * - `i`: the index of the current element
   * @param {*} data optional, it can be any of the following:
   * - An array of elements that will be passed to the callback. 
   * The callback is executed once per element, and all of them are added consecutively.
   * - A CSS selector, so the function will be executed once per matched element.
   * - A number, in which case the function will be executed that number of times
   * @returns {u} the same instance of Umbrella JS
   */
  before: function(html, data) {
    return this.adjacent(html, data, function(node, fragment) {
      node.parentNode.insertBefore(fragment, node)
    })
  },
  blur: function() {
    if (this.isInputOrTextareaElement(this.nodes[0])) {
      this.nodes[0].blur()
    }
  },
  /**Get the direct children of all of the nodes with an optional filter
   * ```js
   * .children(filter);
   * ```
   * @param {*} selector filter: a string containing a selector that 
   * nodes must pass or a function that return a boolean. See .filter() for a better explanation
   * @returns {u} an instance of Umbrella JS with the new children as nodes
   */
  children: function(selector) {
    return this.map(function(node) {
      return this.slice(node.children)
    }).filter(selector)
  },
  /**Create a deep copy of the set of matched elements. 
   * Includes matched element node and **all of its events** as well as 
   * its children and **all of their events** by **default**.
   * ```js
   * u('.elementToClone').clone()
   * ```
   * 
   * The following extensions are enabled by default:
   * - `events` clone the events of all of the nodes. To disable it globally, 
   * add `u.prototype.mirror.events = false;` to your code.
   * - `select` select input node values are copied to all cloned nodes. 
   * To disable globally, add `u.prototype.mirror.select = false;` to your code.
   * - `textarea` textarea input node values are copied to all cloned nodes. 
   * To disable globally, add `u.prototype.mirror.textarea = false;` to your code.
   * @return {u} the same instance of Umbrella JS
   */
  clone: function() {
    return this.map(function(node, i) {
      var clone = node.cloneNode(true)
      var dest = this.getAll(clone)
      this.getAll(node).each(function(src, i) {
        for (var key in this.mirror) {
          if (this.mirror[key]) {
            this.mirror[key](src, dest.nodes[i])
          }
        }
      })
      return clone
    })
  },
  /**
   * Return an array of DOM nodes of a source node and its children.
   * @param  {Object} context DOM node.
   * @return {u}          Array containing queried DOM nodes.
   */
  getAll: function getAll(context) {
    return u([context].concat(u('*', context).nodes))
  },
  // Store all of the operations to perform when cloning elements
  mirror: {
    /**
     * Copy all JavaScript events of source node to destination node.
     * @param  {Object} src         DOM node
     * @param  {Object} dest        DOM node
     */
    events: function(src, dest) {
      if (!src._e) return
      for (var type in src._e) {
        src._e[type].forEach(function(ref) {
          u(dest).on(/**@type {keyof HTMLElementEventMap}*/(type), ref.callback)
        })
      }
    },
    /**
     * Copy select input value to its clone.
     * @param  {Object} src  DOM node
     * @param  {Object} dest DOM node
     */
    select: function(src, dest) {
      if (u(src).is('select')) {
        dest.value = src.value
      }
    },
    /**
     * Copy textarea input value to its clone
     * @param  {Object} src  DOM node
     * @param  {Object} dest DOM node
     */
    textarea: function(src, dest) {
      if (u(src).is('textarea')) {
        dest.value = src.value
      }
    }
  },

  // Find the first ancestor that matches the selector for each node
  closest: function(selector) {
    return this.map(function(node) {
      // Keep going up and up on the tree. First element is also checked
      do {
        if (u(node).is(selector)) {
          return node
        }
      } while ((node = node.parentNode) && node !== document)
    })
  },
  /**Handle `data-*` attributes for the matched elements
   * ```js
   * // GET
   * .data('name');
   * 
   * // SET
   * .data('name', 'value');
   * .data({ name1: 'value', name2: 'value2' });
   * ```
   * @param {*} name **get**
   * - `name`: the `data-*` attribute that we want to get from the first matched element
   * @param {*} value **set**
   * - `name`: the `data-*` attribute that we want to set for all of the matched elements
   * - `value`: what we want to set the attribute to. If it's not defined, then we get the name
   * @returns {string | u} 
   * - **get**: `string`: the value of the `data-*` attribute
   * - **set**: the same instance of Umbrella JS
   * @see https://umbrellajs.com/documentation#attr
   */
  data: function(name, value) {
    return this.attr(name, value, true)
  },
  // Loops through every node from the current call
  each: function(callback) {
    // By doing callback.call we allow "this" to be the context for
    // the callback (see http://stackoverflow.com/q/4065353 precisely)
    this.nodes.forEach(callback.bind(this))
    return this
  },
  // [INTERNAL USE ONLY]
  // Loop through the combination of every node and every argument passed
  eacharg: function(args, callback) {
    return this.each(function(node, i) {
      this.args(args, node, i).forEach(function(arg) {
        // Perform the callback for this node
        // By doing callback.call we allow "this" to be the context for
        // the callback (see http://stackoverflow.com/q/4065353 precisely)
        callback.call(this, node, arg)
      }, this)
    })
  },
  // Remove all children of the matched nodes from the DOM.
  empty: function() {
    return this.each(function(node) {
      while (node.firstChild) {
        node.removeChild(node.firstChild)
      }
    })
  },
  // .filter(selector)
  // Delete all of the nodes that don't pass the selector
  filter: function(selector) {
    // The default function if it's a CSS selector
    // Cannot change name to 'selector' since it'd mess with it inside this fn
    var callback = function(node) {
      // Make it compatible with some other browsers
      node.matches = node.matches || node.msMatchesSelector || node.webkitMatchesSelector
      // Check if it's the same element (or any element if no selector was passed)
      return node.matches(selector || '*')
    }
    // filter() receives a function as in .filter(e => u(e).children().length)
    if (typeof selector === 'function') callback = selector
    // filter() receives an instance of Umbrella as in .filter(u('a'))
    if (selector instanceof u) {
      callback = function(node) {
        return (selector.nodes).indexOf(node) !== -1
      }
    }
    // Just a native filtering function for ultra-speed
    return u(this.nodes.filter(callback))
  },
  // Find all the nodes children of the current ones matched by a selector
  find: function(selector) {
    return this.map(function(node) {
      return u(selector || '*', node)
    })
  },
  // Get the first of the nodes
  first: function() {
    return this.nodes[0]
  },
  /**[INTERNAL USE ONLY]
   * Generate a fragment of HTML. This irons out the inconsistences
   * @param {string} html 
   * @returns 
   */
  generate: function(html) {
    // Table elements need to be child of <table> for some f***ed up reason
    if (/^\s*<tr[> ]/.test(html)) {
      return u(document.createElement('table')).html(html).children().children().nodes
    } 
    if (/^\s*<t(h|d)[> ]/.test(html)) {
      return u(document.createElement('table')).html(html).children().children().children().nodes
    } 
    if (/^\s*</.test(html)) {
      return u(document.createElement('div')).html(html).children().nodes
    } 

    return document.createTextNode(html)
  },
  // Change the default event for the callback. Simple decorator to preventDefault
  handle: function() {
    var args = this.slice(arguments).map(function(arg) {
      if (typeof arg === 'function') {
        return function(e) {
          e.preventDefault()
          arg.apply(this, arguments)
        }
      }
      return arg
    }, this)
    return this.on.apply(this, args)
  },
  // Find out whether the matched elements have a class or not
  hasClass: function() {
    // Check if any of them has all of the classes
    return this.is('.' + this.args(arguments).join('.'))
  },
  /**Retrieve or set the html of the elements:
   * ```js
   * // GET
   * .html();
   * // SET
   * .html(html);
   * 
   * ```
   * @template {string | null} T
   * @param {T} text 
   * - **GET**: should pass no parameter so it retrieves the html.
   * - **SET**: `html`: the new value that you want to set. To remove it, pass an empty string: `""`
   * @returns {u | string}
   * - **GET**: `string`: the html of the first node
   * - **SET**: `u`: returns the same instance of Umbrella JS
   * @see https://umbrellajs.com/documentation#html
   */
  html: function(text = null) {
    // Needs to check undefined as it might be ""
    if (!text) return this.first().innerHTML || ''
    // If we're attempting to set some text
    // Loop through all the nodes
    return this.each(function(node) {
      // Set the inner html to the node
      node.innerHTML = text
    })
  },
  // Check whether any of the nodes matches the selector
  is: function(selector) {
    return this.filter(selector).length > 0
  },
  /**
   * Internal use only. 
   * This function checks to see if an element is in the page's body. 
   * As contains is inclusive and determining if the body contains itself isn't the 
   * intention of isInPage this case explicitly returns false.
   * @param  {[Object]}  node DOM node
   * @return {boolean}        The Node.contains() method returns a Boolean value indicating whether a node is a descendant of a given node or not.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/contains
   */
  isInPage: function isInPage(node) {
    return (node === document.body) ? false : document.body.contains(node)
  },
  // Get the last of the nodes
  last: function() {
    return this.nodes[this.length - 1] || false
  },
  // Merge all of the nodes that the callback returns
  map: function(callback) {
    return callback ? u(this.array(callback)).unique() : this
  },
  // Delete all of the nodes that equals the filter
  not: function(filter) {
    return this.filter(function(node) {
      return !u(node).is(filter || true)
    })
  },
  // Removes the callback to the event listener for each node
  off: function(events, cb, cb2) {
    var cb_filter_off = (cb == null && cb2 == null)
    var sel = null
    var cb_to_be_removed = cb
    if (typeof cb === 'string') {
      sel = cb
      cb_to_be_removed = cb2
    }
    return this.eacharg(events, function(node, event) {
      u(node._e ? node._e[event] : []).each(function(ref) {
        if (cb_filter_off || (ref.orig_callback === cb_to_be_removed && ref.selector === sel)) {
          node.removeEventListener(event, ref.callback)
        }
      })
    })
  },
  /**
   * 
   * @template {keyof HTMLElementEventMap} TKey
   * @param {TKey} events
   * @param {(args0: HTMLElementEventMap[TKey]) => any} cb
   */
  on: function(events, cb, cb2) {
    function overWriteCurrent(e, value) {
      try {
        Object.defineProperty(e, 'currentTarget', {
          value: value,
          configurable: true
        })
      } catch (err) {}
    }
    var selector = null
    var orig_callback = cb
    if (typeof cb === 'string') {
      selector = cb
      orig_callback = cb2
      cb = function(e) {
        var args = arguments
        u(/**@type {any}*/(e.currentTarget))
          .find(selector)
          .each(function(target) {
            // The event is triggered either in the correct node, or a child
            // of the node that we are interested in
            // Note: .contains() will also check itself (besides children)
            if (!target.contains(e.target)) return
            // If e.g. a child of a link was clicked, but we are listening
            // to the link, this will make the currentTarget the link itself,
            // so it's the "delegated" element instead of the root target. It
            // makes u('.render a').on('click') and u('.render').on('click', 'a')
            // to have the same currentTarget (the 'a')
            var curr = e.currentTarget
            overWriteCurrent(e, target)
            cb2.apply(target, args)
            // Need to undo it afterwards, in case this event is reused in another
            // callback since otherwise u(e.currentTarget) above would break
            overWriteCurrent(e, curr)
          })
      }
    }
    var callback = function(e) {
      return cb.apply(this, [e].concat(e.detail || []))
    }
    return this.eacharg(events, function(node, event) {
      node.addEventListener(event, callback)
      // Store it so we can dereference it with `.off()` later on
      node._e = node._e || {}
      node._e[event] = node._e[event] || []
      node._e[event].push({
        callback: callback,
        orig_callback: orig_callback,
        selector: selector
      })
    })
  },
  // [INTERNAL USE ONLY]
  // Take the arguments and a couple of callback to handle the getter/setter pairs
  // such as: .css('a'), .css('a', 'b'), .css({ a: 'b' })
  pairs: function(name, value, get, set) {
    // Convert it into a plain object if it is not
    if (typeof value !== 'undefined') {
      var nm = name
      name = {}
      name[nm] = value
    }
    if (typeof name === 'object') {
      // Set the value of each one, for each of the { prop: value } pairs
      return this.each(function(node, i) {
        for (var key in name) {
          if (typeof name[key] === 'function') {
            set(node, key, name[key](node, i))
          } else {
            set(node, key, name[key])
          }
        }
      })
    }
    // Return the style of the first one
    return this.length ? get(this.first(), name) : ''
  },
  // [INTERNAL USE ONLY]
  // Parametize an object: { a: 'b', c: 'd' } => 'a=b&c=d'
  param: function(obj) {
    return Object.keys(obj).map(function(key) {
      return this.uri(key) + '=' + this.uri(obj[key])
    }.bind(this)).join('&')
  },
  // Travel the matched elements one node up
  parent: function(selector) {
    return this.map(function(node) {
      return node.parentNode
    }).filter(selector)
  },
  // Add nodes at the beginning of each node
  prepend: function(html, data) {
    return this.adjacent(html, data, function(node, fragment) {
      node.insertBefore(fragment, node.firstChild)
    })
  },
  // Delete the matched nodes from the DOM
  remove: function() {
    // Loop through all the nodes
    return this.each(function(node) {
      // Perform the removal only if the node has a parent
      if (node.parentNode) {
        node.parentNode.removeChild(node)
      }
    })
  },
  // Removes a class from all of the matched nodes
  removeClass: function() {
    // Loop the combination of each node with each argument
    return this.eacharg(arguments, function(el, name) {
      // Remove the class using the native method
      el.classList.remove(name)
    })
  },
  // Replace the matched elements with the passed argument.
  replace: function(html, data) {
    var nodes = []
    this.adjacent(html, data, function(node, fragment) {
      nodes = nodes.concat(this.slice(fragment.children))
      node.parentNode.replaceChild(fragment, node)
    })
    return u(nodes)
  },
  focus: function() {
    if (this.isInputOrTextareaElement(this.nodes[0])) {
      this.nodes[0].focus()
    }
  },
  // Scroll to the first matched element
  scroll: function() {
    this.first().scrollIntoView({
      behavior: 'smooth'
    })
    return this
  },
  // [INTERNAL USE ONLY]
  // Select the adecuate part from the context
  select: function(parameter, context) {
    // Allow for spaces before or after
    parameter = parameter.replace(/^\s*/, '').replace(/\s*$/, '')
    if (/^</.test(parameter)) {
      return u().generate(parameter)
    }
    const _this = (context || document).querySelectorAll(parameter)
    if (_this.length == 0) {
      console.warn(parameter, '- does not exist on this document')
    }

    return _this
  },
  // Convert forms into a string able to be submitted
  // Original source: http://stackoverflow.com/q/11661187
  serialize: function() {
    var self = this
    // Store the class in a variable for manipulation
    return this.slice(this.first().elements).reduce(function(query, el) {
      // We only want to match enabled elements with names, but not files
      if (!el.name || el.disabled || el.type === 'file') return query
      // Ignore the checkboxes that are not checked
      if (/(checkbox|radio)/.test(el.type) && !el.checked) return query
      // Handle multiple selects
      if (el.type === 'select-multiple') {
        u(el.options).each(function(opt) {
          if (opt.selected) {
            query += '&' + self.uri(el.name) + '=' + self.uri(opt.value)
          }
        })
        return query
      }
      // Add the element to the object
      return query + '&' + self.uri(el.name) + '=' + self.uri(el.value)
    }, '').slice(1)
  },
  // Travel the matched elements at the same level
  siblings: function(selector) {
    return this.parent().children(selector).not(this)
  },
  // Find the size of the first matched element
  size: function() {
    return this.first().getBoundingClientRect()
  },
  // [INTERNAL USE ONLY]
  // Force it to be an array AND also it clones them
  // http://toddmotto.com/a-comprehensive-dive-into-nodelists-arrays-converting-nodelists-and-understanding-the-dom/
  slice: function(pseudo) {
    // Check that it's not a valid object
    if (!pseudo ||
      pseudo.length === 0 ||
      typeof pseudo === 'string' ||
      pseudo.toString() === '[object Function]') return []
    // Accept also a u() object (that has .nodes)
    return pseudo.length ? [].slice.call(pseudo.nodes || pseudo) : [pseudo]
  },
  // [INTERNAL USE ONLY]
  // Create a string from different things
  str: function(node, i) {
    return function(arg) {
      // Call the function with the corresponding nodes
      if (typeof arg === 'function') {
        return arg.call(this, node, i)
      }
      // From an array or other 'weird' things
      return arg.toString()
    }
  },
  // Set or retrieve the text content from the matched node(s)
  text: function(text) {
    // Needs to check undefined as it might be ""
    if (text === undefined) {
      const element = this.first()
      return this.isInputOrTextareaElement(element) ? element.value : element.textContent || ''
    }
    // If we're attempting to set some text
    // Loop through all the nodes
    return this.each(function(node) {
      // Set the text content to the node
      if (this.isInputOrTextareaElement(node)) {
        return node.value = text
      }
      node.textContent = text
    })
  },
  // Activate/deactivate classes in the elements
  toggleClass: function(classes, addOrRemove) {
    /* jshint -W018 */
    // Check if addOrRemove was passed as a boolean
    if (!!addOrRemove === addOrRemove) {
      return this[addOrRemove ? 'addClass' : 'removeClass'](classes)
    }
    /* jshint +W018 */
    // Loop through all the nodes and classes combinations
    return this.eacharg(classes, function(el, name) {
      el.classList.toggle(name)
    })
  },
  // Call an event manually on all the nodes
  trigger: function(events) {
    var data = this.slice(arguments).slice(1)
    return this.eacharg(events, function(node, event) {
      var ev
      // Allow the event to bubble up and to be cancelable (as default)
      var opts = {
        bubbles: true,
        cancelable: true,
        detail: data
      }
      try {
        // Accept different types of event names or an event itself
        ev = new window.CustomEvent(event, opts)
      } catch (e) {
        ev = document.createEvent('CustomEvent')
        ev.initCustomEvent(event, true, true, data)
      }
      node.dispatchEvent(ev)
    })
  },
  // [INTERNAL USE ONLY]
  // Removed duplicated nodes, used for some specific methods
  unique: function() {
    return u(this.nodes.reduce(function(clean, node) {
      var istruthy = node !== null && node !== undefined && node !== false
      return (istruthy && clean.indexOf(node) === -1) ? clean.concat(node) : clean
    }, []))
  },
  // [INTERNAL USE ONLY]
  // Encode the different strings https://gist.github.com/brettz9/7147458
  uri: function(str) {
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+')
  },
  wrap: function(selector) {
    function findDeepestNode(node) {
      while (node.firstElementChild) {
        node = node.firstElementChild
      }
      return u(node)
    }
    // 1) Construct dom node e.g. u('<a>'),
    // 2) clone the currently matched node
    // 3) append cloned dom node to constructed node based on selector
    return this.map(function(node) {
      return u(selector).each(function(n) {
        findDeepestNode(n)
          .append(node.cloneNode(true))
        node
          .parentNode
          .replaceChild(n, node)
      })
    })
  },
  /**
   * @param {Element} thisElement 
   * @returns {thisElement is HTMLInputElement | HTMLTextAreaElement}
   */
  isInputOrTextareaElement: (thisElement) => 
    thisElement instanceof HTMLInputElement || thisElement instanceof HTMLTextAreaElement
}