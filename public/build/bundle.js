
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
	'use strict';

	function noop() {}

	function assign(tar, src) {
		for (const k in src) tar[k] = src[k];
		return tar;
	}

	function run(fn) {
		return fn();
	}

	function blank_object() {
		return Object.create(null);
	}

	function run_all(fns) {
		fns.forEach(run);
	}

	function is_function(thing) {
		return typeof thing === 'function';
	}

	function safe_not_equal(a, b) {
		return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
	}

	function create_slot(definition, ctx, fn) {
		if (definition) {
			const slot_ctx = get_slot_context(definition, ctx, fn);
			return definition[0](slot_ctx);
		}
	}

	function get_slot_context(definition, ctx, fn) {
		return definition[1]
			? assign({}, assign(ctx.$$scope.ctx, definition[1](fn ? fn(ctx) : {})))
			: ctx.$$scope.ctx;
	}

	function get_slot_changes(definition, ctx, changed, fn) {
		return definition[1]
			? assign({}, assign(ctx.$$scope.changed || {}, definition[1](fn ? fn(changed) : {})))
			: ctx.$$scope.changed || {};
	}

	function append(target, node) {
		target.appendChild(node);
	}

	function insert(target, node, anchor) {
		target.insertBefore(node, anchor);
	}

	function detach(node) {
		node.parentNode.removeChild(node);
	}

	function destroy_each(iterations, detaching) {
		for (let i = 0; i < iterations.length; i += 1) {
			if (iterations[i]) iterations[i].d(detaching);
		}
	}

	function element(name) {
		return document.createElement(name);
	}

	function text(data) {
		return document.createTextNode(data);
	}

	function space() {
		return text(' ');
	}

	function empty() {
		return text('');
	}

	function listen(node, event, handler, options) {
		node.addEventListener(event, handler, options);
		return () => node.removeEventListener(event, handler, options);
	}

	function attr(node, attribute, value) {
		if (value == null) node.removeAttribute(attribute);
		else node.setAttribute(attribute, value);
	}

	function children(element) {
		return Array.from(element.childNodes);
	}

	function set_data(text, data) {
		data = '' + data;
		if (text.data !== data) text.data = data;
	}

	function set_style(node, key, value) {
		node.style.setProperty(key, value);
	}

	function custom_event(type, detail) {
		const e = document.createEvent('CustomEvent');
		e.initCustomEvent(type, false, false, detail);
		return e;
	}

	let current_component;

	function set_current_component(component) {
		current_component = component;
	}

	function get_current_component() {
		if (!current_component) throw new Error(`Function called outside component initialization`);
		return current_component;
	}

	function onMount(fn) {
		get_current_component().$$.on_mount.push(fn);
	}

	function createEventDispatcher() {
		const component = current_component;

		return (type, detail) => {
			const callbacks = component.$$.callbacks[type];

			if (callbacks) {
				// TODO are there situations where events could be dispatched
				// in a server (non-DOM) environment?
				const event = custom_event(type, detail);
				callbacks.slice().forEach(fn => {
					fn.call(component, event);
				});
			}
		};
	}

	const dirty_components = [];

	let update_promise;
	const binding_callbacks = [];
	const render_callbacks = [];
	const flush_callbacks = [];

	function schedule_update() {
		if (!update_promise) {
			update_promise = Promise.resolve();
			update_promise.then(flush);
		}
	}

	function add_binding_callback(fn) {
		binding_callbacks.push(fn);
	}

	function add_render_callback(fn) {
		render_callbacks.push(fn);
	}

	function flush() {
		const seen_callbacks = new Set();

		do {
			// first, call beforeUpdate functions
			// and update components
			while (dirty_components.length) {
				const component = dirty_components.shift();
				set_current_component(component);
				update(component.$$);
			}

			while (binding_callbacks.length) binding_callbacks.shift()();

			// then, once components are updated, call
			// afterUpdate functions. This may cause
			// subsequent updates...
			while (render_callbacks.length) {
				const callback = render_callbacks.pop();
				if (!seen_callbacks.has(callback)) {
					callback();

					// ...so guard against infinite loops
					seen_callbacks.add(callback);
				}
			}
		} while (dirty_components.length);

		while (flush_callbacks.length) {
			flush_callbacks.pop()();
		}

		update_promise = null;
	}

	function update($$) {
		if ($$.fragment) {
			$$.update($$.dirty);
			run_all($$.before_render);
			$$.fragment.p($$.dirty, $$.ctx);
			$$.dirty = null;

			$$.after_render.forEach(add_render_callback);
		}
	}

	let outros;

	function group_outros() {
		outros = {
			remaining: 0,
			callbacks: []
		};
	}

	function check_outros() {
		if (!outros.remaining) {
			run_all(outros.callbacks);
		}
	}

	function on_outro(callback) {
		outros.callbacks.push(callback);
	}

	function mount_component(component, target, anchor) {
		const { fragment, on_mount, on_destroy, after_render } = component.$$;

		fragment.m(target, anchor);

		// onMount happens after the initial afterUpdate. Because
		// afterUpdate callbacks happen in reverse order (inner first)
		// we schedule onMount callbacks before afterUpdate callbacks
		add_render_callback(() => {
			const new_on_destroy = on_mount.map(run).filter(is_function);
			if (on_destroy) {
				on_destroy.push(...new_on_destroy);
			} else {
				// Edge case - component was destroyed immediately,
				// most likely as a result of a binding initialising
				run_all(new_on_destroy);
			}
			component.$$.on_mount = [];
		});

		after_render.forEach(add_render_callback);
	}

	function destroy(component, detaching) {
		if (component.$$) {
			run_all(component.$$.on_destroy);
			component.$$.fragment.d(detaching);

			// TODO null out other refs, including component.$$ (but need to
			// preserve final state?)
			component.$$.on_destroy = component.$$.fragment = null;
			component.$$.ctx = {};
		}
	}

	function make_dirty(component, key) {
		if (!component.$$.dirty) {
			dirty_components.push(component);
			schedule_update();
			component.$$.dirty = {};
		}
		component.$$.dirty[key] = true;
	}

	function init(component, options, instance, create_fragment, not_equal$$1, prop_names) {
		const parent_component = current_component;
		set_current_component(component);

		const props = options.props || {};

		const $$ = component.$$ = {
			fragment: null,
			ctx: null,

			// state
			props: prop_names,
			update: noop,
			not_equal: not_equal$$1,
			bound: blank_object(),

			// lifecycle
			on_mount: [],
			on_destroy: [],
			before_render: [],
			after_render: [],
			context: new Map(parent_component ? parent_component.$$.context : []),

			// everything else
			callbacks: blank_object(),
			dirty: null
		};

		let ready = false;

		$$.ctx = instance
			? instance(component, props, (key, value) => {
				if ($$.ctx && not_equal$$1($$.ctx[key], $$.ctx[key] = value)) {
					if ($$.bound[key]) $$.bound[key](value);
					if (ready) make_dirty(component, key);
				}
			})
			: props;

		$$.update();
		ready = true;
		run_all($$.before_render);
		$$.fragment = create_fragment($$.ctx);

		if (options.target) {
			if (options.hydrate) {
				$$.fragment.l(children(options.target));
			} else {
				$$.fragment.c();
			}

			if (options.intro && component.$$.fragment.i) component.$$.fragment.i();
			mount_component(component, options.target, options.anchor);
			flush();
		}

		set_current_component(parent_component);
	}

	class SvelteComponent {
		$destroy() {
			destroy(this, true);
			this.$destroy = noop;
		}

		$on(type, callback) {
			const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
			callbacks.push(callback);

			return () => {
				const index = callbacks.indexOf(callback);
				if (index !== -1) callbacks.splice(index, 1);
			};
		}

		$set() {
			// overridden by instance, if it has props
		}
	}

	function makeid(length = 5) {
	  let result = '';
	  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	  let counter = 0;
	  while (counter < length) {
	    result += characters.charAt(Math.floor(Math.random() * characters.length));
	    counter += 1;
	  }
	  return result
	}

	function sleep(ms = 5) {
	  return new Promise(resolve => setTimeout(resolve, ms))
	}

	function getRandomNumber(bound = 5) {
	  return Math.floor(Math.random() * bound)
	}

	/**
	 * @template T
	 * @param {T[]} anyArray
	 * @return {T}
	 */
	function getRandomElementFromArray(anyArray) {
	  return anyArray[getRandomNumber(anyArray.length)]
	}

	var loadingText = [
	  "Hoang Sa, Truong Sa are belong to Vietnam",
	  "Reticulating splines...",
	  "Generating witty dialog...",
	  "Swapping time and space...",
	  "Spinning violently around the y-axis...",
	  "Tokenizing real life...",
	  "Bending the spoon...",
	  "Filtering morale...",
	  "Don't think of purple hippos...",
	  "We need a new fuse...",
	  "Have a good day <3",
	  "Upgrading Windows, your PC will restart several times. Sit back and relax.",
	  "640K ought to be enough for anybody",
	  "The architects are still drafting",
	  "The bits are breeding",
	  "We're building the buildings as fast as we can",
	  "Would you prefer chicken, steak, or tofu?",
	  "(Pay no attention to the man behind the curtain)",
	  "...and enjoy the elevator music...",
	  "Please wait while the little elves draw your map",
	  "Don't worry - a few bits tried to escape, but we caught them",
	  "Would you like fries with that?",
	  "Checking the gravitational constant in your locale...",
	  "Go ahead -- hold your breath!",
	  "...at least you're not on hold...",
	  "Hum something loud while others stare",
	  "You're not in Kansas any more",
	  "The server is powered by a lemon and two electrodes.",
	  "Please wait while a larger software vendor in Seattle takes over the world",
	  "We're testing your patience",
	  "As if you had any other choice",
	  "Follow the white rabbit",
	  "Why don't you order a sandwich?",
	  "While the satellite moves into position",
	  "keep calm and npm install",
	  "The bits are flowing slowly today",
	  "Dig on the 'X' for buried treasure... ARRR!",
	  "It's still faster than you could draw it",
	  "The last time I tried this the monkey didn't survive. Let's hope it works better this time.",
	  "I should have had a V8 this morning.",
	  "My other loading screen is much faster.",
	  "(Insert quarter)",
	  "Are we there yet?",
	  "Have you lost weight?",
	  "Just count to 10",
	  "Why so serious?",
	  "It's not you. It's me.",
	  "Counting backwards from Infinity",
	  "Don't panic...",
	  "Embiggening Prototypes",
	  "Do not run! We are your friends!",
	  "Do you come here often?",
	  "Warning: Don't set yourself on fire.",
	  "We're making you a cookie.",
	  "Creating time-loop inversion field",
	  "Spinning the wheel of fortune...",
	  "Loading the enchanted bunny...",
	  "Computing chance of success",
	  "I'm sorry Dave, I can't do that.",
	  "if (you_can_read_this) youre_cool()",
	  "Looking for exact change",
	  "All your web browser are belong to us",
	  "All I really need is a kilobit.",
	  "I feel like im supposed to be loading something. . .",
	  "What do you call 8 Hobbits? A Hobbyte.",
	  "Should have used a compiled language...",
	  "Is this Windows?",
	  "Adjusting flux capacitor...",
	  "Please wait until the sloth starts moving.",
	  "Don't break your screen yet!",
	  "I swear it's almost done.",
	  "Let's take a mindfulness minute...",
	  "Unicorns are at the end of this road, I promise.",
	  "Listening for the sound of one hand clapping...",
	  "Keeping all the 1's and removing all the 0's...",
	  "Putting the icing on the cake. The cake is not a lie...",
	  "Cleaning off the cobwebs...",
	  "Making sure all the i's have dots...",
	  "Meow, meow meow~",
	  "We need more dilithium crystals",
	  "Where did all the internets go",
	  "Connecting Neurotoxin Storage Tank...",
	  "Granting wishes...",
	  "Time flies when you’re having fun.",
	  "Get some coffee and come back in ten minutes..",
	  "Spinning the hamster…",
	  "99 bottles of beer on the wall..",
	  "Stay awhile and listen..",
	  "Be careful not to step in the git-gui",
	  "You edhall not pass! yet..",
	  "Load it and they will come",
	  "Convincing AI not to turn evil..",
	  "There is no spoon. Because we are not done loading it",
	  "Your left thumb points to the right and your right thumb points to the left.",
	  "How did you get here?",
	  "Wait, do you smell something burning?",
	  "Computing the secret to life, the universe, and everything.",
	  "When nothing is going right, go left!!...",
	  "i'm not lazy, I'm just relaxed!!",
	  "Never steal. The government hates competition....",
	  "Why are they called apartments if they are all stuck together?",
	  "Life is Short – Talk Fast!!!!",
	  "Optimism – is a lack of information.....",
	  "Save water and shower together",
	  "Whenever I find the key to success, someone changes the lock.",
	  "Sometimes I think war is God’s way of teaching us geography.",
	  "I’ve got problem for your solution…..",
	  "Where there’s a will, there’s a relative.",
	  "User: the word computer professionals use when they mean !!idiot!!",
	  "I think I am, therefore, I am. I think.",
	  "A kiss is like a fight, with mouths.",
	  "Coffee, Chocolate, Men. The richer the better!",
	  "I am free of all prejudices. I hate everyone equally.",
	  "May the forks be with you",
	  "A commit a day keeps the mobs away",
	  "This is not a joke, it's a commit.",
	  "Constructing additional pylons...",
	  "Roping some seaturtles...",
	  "Locating Jebediah Kerman...",
	  "We are not liable for any broken screens as a result of waiting.",
	  "Hello IT, have you tried turning it off and on again?",
	  "If you type Google into Google you can break the internet",
	  "Well, this is embarrassing.",
	  "What is the airspeed velocity of an unladen swallow?",
	  "Hello, IT... Have you tried forcing an unexpected reboot?",
	  "They just toss us away like yesterday's jam.",
	  "They're fairly regular, the beatings, yes. I'd say we're on a bi-weekly beating.",
	  "The Elders of the Internet would never stand for it.",
	  "Space is invisible mind dust, and stars are but wishes.",
	  "Didn't know paint dried so quickly.",
	  "Everything sounds the same",
	  "I'm going to walk the dog",
	  "I didn't choose the engineering life. The engineering life chose me.",
	  "Dividing by zero...",
	  "Spawn more Overlord!",
	  "If I’m not back in five minutes, just wait longer.",
	  "Some days, you just can’t get rid of a bug!",
	  "We’re going to need a bigger boat.",
	  "Web developers do it with <style>",
	  "I need to git pull --my-life-together",
	  "Java developers never RIP. They just get Garbage Collected.",
	  "Cracking military-grade encryption...",
	  "Simulating traveling salesman...",
	  "Proving P=NP...",
	  "Entangling superstrings...",
	  "Twiddling thumbs...",
	  "Searching for plot device...",
	  "Trying to sort in O(n)...",
	  "Laughing at your pictures-i mean, loading...",
	  "Sending data to NS-i mean, our servers.",
	  "Looking for sense of humour, please hold on.",
	  "Please wait while the intern refills his coffee.",
	  "A different error message? Finally, some progress!",
	  "Please hold on as we reheat our coffee",
	  "Kindly hold on as we convert this bug to a feature...",
	  "Kindly hold on as our intern quits vim...",
	  "Winter is coming...",
	  "Installing dependencies",
	  "Distracted by cat gifs",
	  "Finding someone to hold my beer",
	  "BRB, working on my side project",
	  "@todo: Insert witty loading message",
	  "Let's hope it's worth the wait",
	  "Aw, snap! Not..",
	  "Ordering 1s and 0s...",
	  "Updating dependencies...",
	  "Whatever you do, don't look behind you...",
	  "Please wait... Consulting the manual...",
	  "It is dark. You're likely to be eaten by a grue.",
	  "Loading funny message...",
	  "It's 10:00pm. Do you know where your children are?",
	  "Waiting Daenerys say all her titles...",
	  "Feel free to spin in your chair",
	  "What the what?",
	  "format C: ...",
	  "Forget you saw that password I just typed into the IM ...",
	  "What's under there?",
	  "Your computer has a virus, its name is Windows!",
	  "Go ahead, hold your breath and do an ironman plank till loading complete",
	  "Bored of slow loading spinner, buy more RAM!",
	  "Help, I'm trapped in a loader!",
	  "What is the difference btwn a hippo and a zippo? One is really heavy, the other is a little lighter",
	  "Please wait, while we purge the Decepticons for you. Yes, You can thanks us later!",
	  "Chuck Norris once urinated in a semi truck's gas tank as a joke....that truck is now known as Optimus Prime.",
	  "Chuck Norris doesn’t wear a watch. HE decides what time it is.",
	  "Downloading more RAM..",
	  "Updating to Windows Vista...",
	  "Hiding all ;'s in your code",
	  "Alt-F4 speeds things up.",
	  "Initializing the initializer...",
	  "When was the last time you dusted around here?",
	  "Optimizing the optimizer...",
	  "Last call for the data bus! All aboard!",
	  "Running swag sticker detection...",
	  "Never let a computer know you're in a hurry.",
	  "A computer will do what you tell it to do, but that may be much different from what you had in mind.",
	  "Some things man was never meant to know. For everything else, there's Google.",
	  "Unix is user-friendly. It's just very selective about who its friends are.",
	  "Shovelling coal into the server",
	  "Pushing pixels...",
	  "How about this weather, eh?",
	  "Building a wall...",
	  "Everything in this universe is either a potato or not a potato",
	  "The severity of your issue is always lower than you expected.",
	  "Updating Updater...",
	  "Downloading Downloader...",
	  "Debugging Debugger...",
	  "Reading Terms and Conditions for you.",
	  "Digested cookies being baked again.",
	  "Live long and prosper.",
	  "There is no cow level, but there's a goat one!",
	  "Running with scissors...",
	  "Definitely not a virus...",
	  "You may call me Steve.",
	  "You seem like a nice person :)",
	  "Coffee at my place, tommorow at 10A.M. - don't be late!",
	  "Work, work...",
	  "Patience! This is difficult, you know...",
	  "Discovering new ways of making you wait...",
	  "Your time is very important to us. Please wait while we ignore you...",
	  "Time flies like an arrow; fruit flies like a banana",
	  "Two men walked into a bar; the third ducked...",
	  "Sooooo... Have you seen my vacation photos yet?",
	  "Sorry we are busy catching em' all, we're done soon",
	  "TODO: Insert elevator music",
	  "Still faster than Windows update",
	  "Composer hack: Waiting for reqs to be fetched is less frustrating if you add -vvv to your command.",
	  "Please wait while the minions do their work",
	  "Grabbing extra minions",
	  "Doing the heavy lifting",
	  "We're working very Hard .... Really",
	  "Waking up the minions",
	  "You are number 2843684714 in the queue",
	  "Please wait while we serve other customers...",
	  "Our premium plan is faster",
	  "Feeding unicorns...",
	  "Rupturing the subspace barrier",
	  "Creating an anti-time reaction",
	  "Converging tachyon pulses",
	  "Bypassing control of the matter-antimatter integrator",
	  "Adjusting the dilithium crystal converter assembly",
	  "Reversing the shield polarity",
	  "Disrupting warp fields with an inverse graviton burst",
	  "Up, Up, Down, Down, Left, Right, Left, Right, B, A.",
	  "Do you like my loading animation? I made it myself",
	  "Whoah, look at it go!",
	  "No, I'm awake. I was just resting my eyes.",
	  "One mississippi, two mississippi...",
	  "Don't panic... AHHHHH!",
	  "Ensuring Gnomes are still short.",
	  "/\\/\\/\\",
	  "RAISE THE BLACK FLAG!!!"
	];

	/* src\screen\Loading.svelte generated by Svelte v3.0.0 */

	function add_css() {
		var style = element("style");
		style.id = 'svelte-2g98jm-style';
		style.textContent = ".loading.svelte-2g98jm{z-index:10;background:var(--app-bg-color);transition:opacity 0.25s ease-out}.loading.duck-loaded.svelte-2g98jm{opacity:0}.loading.svelte-2g98jm>.svelte-2g98jm{position:fixed;width:100%;height:100%}.loading-text.svelte-2g98jm{display:flex;justify-content:center;align-items:center}h2.svelte-2g98jm{margin-top:auto;margin-bottom:2rem}:root{--size:120;--coefficient:1px;--timeline:2.6s;--delay:0.65s;--rotation-y:-24;--rotation-x:28;--color-one:#3a0ca3;--color-two:#4361ee;--color-three:#4cc9f0}.warpper.svelte-2g98jm,.warpper.svelte-2g98jm .svelte-2g98jm,.warpper.svelte-2g98jm .svelte-2g98jm:after,.warpper.svelte-2g98jm .svelte-2g98jm:before{box-sizing:border-box;transform-style:preserve-3d}.warpper.svelte-2g98jm{display:grid;place-items:center;min-height:100vh}.scene.svelte-2g98jm{position:relative;transform:translate3d(0, 0, 100vmin) rotateX(calc(var(--rotation-y, 0) * 1deg)) rotateY(calc(var(--rotation-x, 0) * 1deg)) rotateX(0deg)}.warpper.svelte-2g98jm{transform-origin:50% 50%;animation:svelte-2g98jm-scale var(--timeline) var(--delay) infinite linear}@keyframes svelte-2g98jm-scale{0%,10%{transform:scaleX(1) scaleY(1)}35%,100%{transform:scaleX(0.5) scaleY(0.5)}}.shadow.svelte-2g98jm{width:calc(var(--size) * var(--coefficient));position:absolute;bottom:0;aspect-ratio:1;transform-origin:50% 50%;transform:rotateX(90deg) translate3d(0, 0, calc((var(--size) * (var(--coefficient) * -0.5)) - 1px)) scale(0.96);animation:svelte-2g98jm-squish-squosh var(--timeline) var(--delay) infinite, svelte-2g98jm-fade var(--timeline) var(--delay) infinite;background:rgb(75, 75, 75)}.loader.svelte-2g98jm{--depth:var(--size);--color:var(--color-one, #8338EC);width:calc(var(--depth) * var(--coefficient));aspect-ratio:1;transform-origin:50% 50%;animation:svelte-2g98jm-squish-squosh var(--timeline) var(--delay) infinite}.spinner.svelte-2g98jm{animation:svelte-2g98jm-spin var(--timeline) var(--delay) infinite}.jumper.svelte-2g98jm{animation:svelte-2g98jm-jump var(--timeline) var(--delay) infinite}@keyframes svelte-2g98jm-squish-squosh{0%,50%,60%{scale:1 1 1}10%,35%{scale:1.2 0.8 1.2}25%{scale:0.8 1.2 0.8}70%{scale:1 1 2}80%{scale:2 1 2}90%,100%{scale:2 2 2}}@keyframes svelte-2g98jm-fade{0%,10%,40%,50%,60%,100%{opacity:1}25%{opacity:0.5}}@keyframes svelte-2g98jm-spin{0%,10%{rotate:0deg}30%,100%{rotate:-360deg}}@keyframes svelte-2g98jm-jump{0%,10%,35%,50%{translate:0 0}25%{translate:0 -150%}}.cube.svelte-2g98jm{width:100%;height:100%;position:relative}.cube-side.svelte-2g98jm{background:var(--color);position:absolute}.cube-side.svelte-2g98jm:nth-of-type(1){--b:1.1;height:calc(var(--depth, 20) * var(--coefficient));width:100%;top:0;transform:translate(0, -50%) rotateX(90deg)}.cube-side.svelte-2g98jm:nth-of-type(2){--b:0.9;--color:var(--color-three, #FF006E);height:100%;width:calc(var(--depth, 20) * var(--coefficient));top:50%;right:0;transform:translate(50%, -50%) rotateY(90deg)}.cube-side.svelte-2g98jm:nth-of-type(3){--b:1;width:100%;height:calc(var(--depth, 20) * var(--coefficient));bottom:0;transform:translate(0%, 50%) rotateX(90deg)}.cube-side.svelte-2g98jm:nth-of-type(4){--b:1;--color:var(--color-three, #FF006E);height:100%;width:calc(var(--depth, 20) * var(--coefficient));left:0;top:50%;transform:translate(-50%, -50%) rotateY(90deg)}.cube-side.svelte-2g98jm:nth-of-type(5){--b:1;--color:var(--color-two, #3A86EF);height:100%;width:100%;transform:translate3d(0, 0, calc(var(--depth, 20) * (var(--coefficient) * 0.5)));top:0;left:0}.cube-side.svelte-2g98jm:nth-of-type(6){--b:1.2;height:100%;width:100%;transform:translate3d(0, 0, calc(var(--depth, 20) * (var(--coefficient) * -0.5))) rotateY(180deg);top:0;left:0}";
		append(document.head, style);
	}

	function create_fragment(ctx) {
		var div16, div14, t6, div15, h2, t7, div16_class_value;

		return {
			c() {
				div16 = element("div");
				div14 = element("div");
				div14.innerHTML = `<div class="warpper svelte-2g98jm"><div class="scene svelte-2g98jm"><div class="shadow svelte-2g98jm"></div>
			        <div class="jumper svelte-2g98jm"><div class="spinner svelte-2g98jm"><div class="scaler svelte-2g98jm"><div class="loader svelte-2g98jm"><div class="cube svelte-2g98jm"><div class="cube-side svelte-2g98jm"></div>
			                  <div class="cube-side svelte-2g98jm"></div>
			                  <div class="cube-side svelte-2g98jm"></div>
			                  <div class="cube-side svelte-2g98jm"></div>
			                  <div class="cube-side svelte-2g98jm"></div>
			                  <div class="cube-side svelte-2g98jm"></div></div></div></div></div></div></div></div>`;
				t6 = space();
				div15 = element("div");
				h2 = element("h2");
				t7 = text(ctx.randomLoadingText);
				div14.className = "random-cube svelte-2g98jm";
				h2.className = "svelte-2g98jm";
				div15.className = "loading-text svelte-2g98jm";
				div16.className = div16_class_value = "loading screen " + (ctx.done ? (ctx.func)() : '') + " svelte-2g98jm";
			},

			m(target, anchor) {
				insert(target, div16, anchor);
				append(div16, div14);
				append(div16, t6);
				append(div16, div15);
				append(div15, h2);
				append(h2, t7);
				add_binding_callback(() => ctx.div16_binding(div16, null));
			},

			p(changed, ctx) {
				if (changed.items) {
					ctx.div16_binding(null, div16);
					ctx.div16_binding(div16, null);
				}

				if ((changed.done) && div16_class_value !== (div16_class_value = "loading screen " + (ctx.done ? (ctx.func)() : '') + " svelte-2g98jm")) {
					div16.className = div16_class_value;
				}
			},

			i: noop,
			o: noop,

			d(detaching) {
				if (detaching) {
					detach(div16);
				}

				ctx.div16_binding(null, div16);
			}
		};
	}

	function instance($$self, $$props, $$invalidate) {
		
	  let { done = false } = $$props;

	  let loadingScreen;
	  const randomLoadingText = getRandomElementFromArray(loadingText);

		function div16_binding($$node, check) {
			loadingScreen = $$node;
			$$invalidate('loadingScreen', loadingScreen);
		}

		function func() {
		  sleep(1000).then(() => loadingScreen.remove());
		  return 'duck-loaded'
		}

		$$self.$set = $$props => {
			if ('done' in $$props) $$invalidate('done', done = $$props.done);
		};

		return {
			done,
			loadingScreen,
			randomLoadingText,
			div16_binding,
			func
		};
	}

	class Loading extends SvelteComponent {
		constructor(options) {
			super();
			if (!document.getElementById("svelte-2g98jm-style")) add_css();
			init(this, options, instance, create_fragment, safe_not_equal, ["done"]);
		}
	}

	const labelStyle = (bgColor) => `background: ${bgColor}; border-radius: 4px; font-weight: bold; color:white`;

	/**Logging some stuff into the console BUTTTT better :)
	 * 
	 * @param {'log' | 'warn' | 'error' | 'trace'} type the type of log
	 * @param {string} labelColor the color of the label, accept `#hex`, `rgb`, `hsl`
	 * @param {string} label 
	 * @param {any} content 
	 * @param {any[]} stuff 
	 */
	function log(type, labelColor, label, content, ...stuff) {
	  console[type](`%c ${label} %c ${content}`, labelStyle(labelColor), '', ...stuff);
	}

	const INFO_COLOR = '#35c4b6';
	const ERR_COLOR = '#c44835';
	const WARN_COLOR = '#a1912a';
	/**### class `logdown`
	 * Extending and adding some utils function to make the good old friend `console.log()` way more better hehe.
	 */
	class logdown {
	  static success(stuff, ...otherThings) {
	    log('log', '#35c452', 'success', stuff, ...otherThings);
	  } 
	  static warn(stuff, ...otherThings) {
	    log('warn', WARN_COLOR, 'warn', stuff, ...otherThings);
	  } 
	  static info(stuff, ...otherThings) {
	    log('log', INFO_COLOR, 'info', stuff, ...otherThings);
	  } 
	  static ready(stuff, ...otherThings) {
	    log('log', INFO_COLOR, 'ready', stuff, ...otherThings);
	  } 
	  static start(stuff, ...otherThings) {
	    log('log', '#35c450', 'start', stuff, ...otherThings);
	  } 
	  static err(stuff, ...otherThings) {
	    log('error', ERR_COLOR, 'error', stuff, ...otherThings);
	  } 
	  static fatal(stuff, ...otherThings) {
	    log('error', ERR_COLOR, 'fatal', stuff, ...otherThings);
	  } 
	}

	/* src\components\chat\input\Hint.svelte generated by Svelte v3.0.0 */

	function add_css$1() {
		var style = element("style");
		style.id = 'svelte-18ngnqv-style';
		style.textContent = "div.svelte-18ngnqv{border-top-left-radius:15px;border-top-right-radius:15px;padding:7px 15px;width:calc(100% - 15px);display:flex;gap:2rem}";
		append(document.head, style);
	}

	function create_fragment$1(ctx) {
		var div, current;

		const default_slot_1 = ctx.$$slots.default;
		const default_slot = create_slot(default_slot_1, ctx, null);

		return {
			c() {
				div = element("div");

				if (default_slot) default_slot.c();

				div.className = "" + ctx.id + " svelte-18ngnqv";
			},

			l(nodes) {
				if (default_slot) default_slot.l(div_nodes);
			},

			m(target, anchor) {
				insert(target, div, anchor);

				if (default_slot) {
					default_slot.m(div, null);
				}

				add_binding_callback(() => ctx.div_binding(div, null));
				current = true;
			},

			p(changed, ctx) {
				if (default_slot && default_slot.p && changed.$$scope) {
					default_slot.p(get_slot_changes(default_slot_1, ctx, changed,), get_slot_context(default_slot_1, ctx, null));
				}

				if (changed.items) {
					ctx.div_binding(null, div);
					ctx.div_binding(div, null);
				}

				if (!current || changed.id) {
					div.className = "" + ctx.id + " svelte-18ngnqv";
				}
			},

			i(local) {
				if (current) return;
				if (default_slot && default_slot.i) default_slot.i(local);
				current = true;
			},

			o(local) {
				if (default_slot && default_slot.o) default_slot.o(local);
				current = false;
			},

			d(detaching) {
				if (detaching) {
					detach(div);
				}

				if (default_slot) default_slot.d(detaching);
				ctx.div_binding(null, div);
			}
		};
	}

	function instance$1($$self, $$props, $$invalidate) {
		let { id, backgroundColor } = $$props;

	  /**@type {HTMLDivElement}*/
	  let hint;

	  onMount(() => {
	    hint.style.backgroundColor = backgroundColor; $$invalidate('hint', hint);
	  });

		let { $$slots = {}, $$scope } = $$props;

		function div_binding($$node, check) {
			hint = $$node;
			$$invalidate('hint', hint);
		}

		$$self.$set = $$props => {
			if ('id' in $$props) $$invalidate('id', id = $$props.id);
			if ('backgroundColor' in $$props) $$invalidate('backgroundColor', backgroundColor = $$props.backgroundColor);
			if ('$$scope' in $$props) $$invalidate('$$scope', $$scope = $$props.$$scope);
		};

		return {
			id,
			backgroundColor,
			hint,
			div_binding,
			$$slots,
			$$scope
		};
	}

	class Hint extends SvelteComponent {
		constructor(options) {
			super();
			if (!document.getElementById("svelte-18ngnqv-style")) add_css$1();
			init(this, options, instance$1, create_fragment$1, safe_not_equal, ["id", "backgroundColor"]);
		}
	}

	/* src\components\chat\input\ReplyingToHint.svelte generated by Svelte v3.0.0 */

	function add_css$2() {
		var style = element("style");
		style.id = 'svelte-12qgxln-style';
		style.textContent = ".reply-author.svelte-12qgxln{font-weight:bold;color:var(--app-text-color)}.reply-msg-content.svelte-12qgxln{display:inline-block;text-overflow:ellipsis;width:70%;white-space:nowrap}";
		append(document.head, style);
	}

	// (16:0) <Hint id="reply-user-warpper" backgroundColor="var(--app-second-sidebar-color)">
	function create_default_slot(ctx) {
		var div0, t0, span, t1_value = ctx.repliedMessage.author.name, t1, t2, div1;

		return {
			c() {
				div0 = element("div");
				t0 = text("Replying to ");
				span = element("span");
				t1 = text(t1_value);
				t2 = space();
				div1 = element("div");
				span.className = "reply-author svelte-12qgxln";
				div0.className = "reply-to-author";
				div1.className = "reply-msg-content svelte-12qgxln";
			},

			m(target, anchor) {
				insert(target, div0, anchor);
				append(div0, t0);
				append(div0, span);
				append(span, t1);
				insert(target, t2, anchor);
				insert(target, div1, anchor);
				add_binding_callback(() => ctx.div1_binding(div1, null));
			},

			p(changed, ctx) {
				if ((changed.repliedMessage) && t1_value !== (t1_value = ctx.repliedMessage.author.name)) {
					set_data(t1, t1_value);
				}

				if (changed.items) {
					ctx.div1_binding(null, div1);
					ctx.div1_binding(div1, null);
				}
			},

			d(detaching) {
				if (detaching) {
					detach(div0);
					detach(t2);
					detach(div1);
				}

				ctx.div1_binding(null, div1);
			}
		};
	}

	function create_fragment$2(ctx) {
		var current;

		var hint = new Hint({
			props: {
			id: "reply-user-warpper",
			backgroundColor: "var(--app-second-sidebar-color)",
			$$slots: { default: [create_default_slot] },
			$$scope: { ctx }
		}
		});

		return {
			c() {
				hint.$$.fragment.c();
			},

			m(target, anchor) {
				mount_component(hint, target, anchor);
				current = true;
			},

			p(changed, ctx) {
				var hint_changes = {};
				if (changed.$$scope || changed.repliedMessageContent || changed.repliedMessage) hint_changes.$$scope = { changed, ctx };
				hint.$set(hint_changes);
			},

			i(local) {
				if (current) return;
				hint.$$.fragment.i(local);

				current = true;
			},

			o(local) {
				hint.$$.fragment.o(local);
				current = false;
			},

			d(detaching) {
				hint.$destroy(detaching);
			}
		};
	}

	function instance$2($$self, $$props, $$invalidate) {
		

	  /**@type {IMessageCache}*/
	  let { repliedMessage } = $$props;
	  /**@type {HTMLDivElement}*/
	  let repliedMessageContent;
	  onMount(() => {
	    repliedMessageContent.innerHTML = repliedMessage.renderedMessage; $$invalidate('repliedMessageContent', repliedMessageContent);
	  });

	  u('.reply-user-warpper').remove();

		function div1_binding($$node, check) {
			repliedMessageContent = $$node;
			$$invalidate('repliedMessageContent', repliedMessageContent);
		}

		$$self.$set = $$props => {
			if ('repliedMessage' in $$props) $$invalidate('repliedMessage', repliedMessage = $$props.repliedMessage);
		};

		return {
			repliedMessage,
			repliedMessageContent,
			div1_binding
		};
	}

	class ReplyingToHint extends SvelteComponent {
		constructor(options) {
			super();
			if (!document.getElementById("svelte-12qgxln-style")) add_css$2();
			init(this, options, instance$2, create_fragment$2, safe_not_equal, ["repliedMessage"]);
		}
	}

	/**### class `EventEmitter`
	 * Just for managing events. Can be extended to provide event lity in other classes.
	 * 
	 * This is a smaller version of nodejs [`EventEmitter`](https://nodejs.org/api/events.html)
	 * @template {{ [eventName: string]: any[] }} Event
	 */
	class EventEmitter {
	  constructor() {
	    this.listeners = /**@type {Event} */ ({});
	  }

	  /**
	   * @typedef {keyof Event} EventName
	   * @typedef {Event[EventName]} EventCallbackFnArgs
	   * @typedef {(...args: EventCallbackFnArgs) => any} EventCallbackFn
	   */

	  /**Adds a listener to the specified event. 
	   * @example
	   * ```js
	   * const event = new EventEmitter()
	   * 
	   * event.on('some_event', () => {
	   *   console.log("'some_event' called")
	   * })
	   * // call the event
	   * event.emit('some_event')
	   * // should console out "'some_event' called"
	   * ```
	   * @param {EventName} eventName the name of the event.
	   * @param {EventCallbackFn} fn  callback
	   */
	  on(eventName, fn) {
	    this.listeners[eventName] = this.listeners[eventName] || /**@type {EventCallbackFnArgs} */ ([]);
	    this.listeners[eventName].push(fn);
	    return this;
	  }

	  /**Adds a "one-time" listener for the event named `eventName`. 
	   * The next time eventName is triggered, this listener is removed and then invoked.
	   * @example
	   * ```js
	   * const event = new EventEmitter()
	   * 
	   * event.once('some_event', () => {
	   *   console.log("'some_event' called")
	   * })
	   * // call the event
	   * event.emit('some_event')
	   * // should console out "'some_event' called"
	   * ```
	   * @param {EventName} eventName 
	   * @param {(...args: EventCallbackFnArgs | []) => any} fn 
	   */
	  once(eventName, fn) {
	    this.listeners[eventName] = this.listeners[eventName] || /**@type {EventCallbackFnArgs} */ ([]);
	    const onceWrapper = () => {
	      fn();
	      this.off(eventName, onceWrapper);
	    };
	    this.listeners[eventName].push(onceWrapper);
	    return this;
	  }

	  /**Removes the specified listener from the listener array for the event named `eventName`.
	   * @example
	   * ```js
	   * const event = new EventEmitter()
	   * const callback = () => {
	   *   console.log('something happen!');
	   * }
	   * 
	   * event.on('some_event', callback);
	   * // ...
	   * event.removeListener('some_event', callback); 
	   * ```
	   * @param {EventName} eventName 
	   * @param {EventCallbackFn} fn 
	   */
	  off(eventName, fn) {
	    let listener = this.listeners[eventName];
	    if (!listener) return this
	    for(let i = listener.length; i > 0; i--) {
	      if (listener[i] === fn) {
	        listener.splice(i,1);
	        break
	      }
	    }
	    return this
	  }

	  /**Synchronously calls each of the listeners registered for the event named `eventName`, 
	   * in the order they were registered, passing the supplied arguments to each.
	   * @example
	   * ```js
	   * const event = new EventEmitter();
	   *
	   * // First listener
	   * event.on('some_event', firstListener() => {
	   *   console.log('Helloooo! first listener');
	   * });
	   * // Second listener
	   * event.on('some_event', secondListener(arg1, arg2) => {
	   *   console.log(`event with parameters ${arg1}, ${arg2} in second listener`);
	   * });
	   * // Third listener
	   * event.on('some_event', thirdListener(...args) => {
	   *   const parameters = args.join(', ');
	   *   console.log(`event with parameters ${parameters} in third listener`);
	   * });
	   *
	   *
	   * event.emit('some_event', 1, 2, 3, 4, 5);
	   *
	   * // Helloooo! first listener
	   * // event with parameters 1, 2 in second listener
	   * // event with parameters 1, 2, 3, 4, 5 in third listener
	   * ```
	   * @param {EventName} eventName 
	   * @param {Event[EventName]} args
	   */
	  emit(eventName, ...args) {
	    let fns = this.listeners[eventName];
	    if (!fns) return false;
	    fns.forEach((f) => {
	      f(...args);
	    });

	    console.trace(`event "${String(eventName)}" fired`);
	    return true;
	  }

	  /**Returns the listener count of the specified event named `eventName`, returns
	   * `0` if no listener, non-zero otherwise
	   * @param {EventName} eventName 
	   */
	  getlistenerCount(eventName) {
	    let fns = this.listeners[eventName] || [];
	    return fns.length;
	  }

	  /**Returns the listener array for the specified event.
	   * Will initialise the event object and listener arrays if required.
	   * Each property in the object response is an array of listener functions.
	   * @param {EventName} eventName 
	   */
	  getRawListeners(eventName) {
	    return this.listeners[eventName];
	  }
	}

	class MarkdownParser {
	  /**
	   * @param {string} text
	   */
	  parse(text) {
	    text = text
	    .replace(/__(.*)__/gim, /*html*/`<b>$1</b>`)
	    .replace(/\*\*(.*)\*\*/gim, /*html*/`<b>$1</b>`)
	    .replace(/\*(.*)\*|_(.*)_/gim, /*html*/`<i>$1</i>`)
	    .replace(/~~(.*)~~/gim, /*html*/`<s>$1</s>`)
	    // code block
	    .replace(/^```([\s\S]*?)```$/gm, /*html*/`<pre class="code-block">$1</pre>`)
	    .replace(/^```(?:js|javascript|)\n([\s\S]*?)```$/gm, /*html*/`<pre class="code-block">$1</pre>`)
	    // inline code block
	    .replace(/`(.*)`/g, /*html*/`<pre class="inline-code">$1</pre>`)

	    .replace(/^>(?:(.+)| )$/gm, /*html*/'<blockquote>$1</blockquote>')
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
	    .replace(/^\d\.(.+)/gm, '<li>$1</li>');

	    return text
	  }
	}

	/* src\components\chat\message\MessageEdit.svelte generated by Svelte v3.0.0 */

	function add_css$3() {
		var style = element("style");
		style.id = 'svelte-15gvgat-style';
		style.textContent = ".edit-message-container.svelte-15gvgat{position:absolute;margin-left:auto;position:absolute;right:0;bottom:55%}.edit-message-icons.svelte-15gvgat{box-shadow:1px 1px black, 1px 1px black;background:var(--app-second-sidebar-color);margin-right:10px;display:none;align-items:center;gap:15px;cursor:pointer}.edit-message-icons.svelte-15gvgat .icon.svelte-15gvgat{margin:8px;--icon-bound:15px}";
		append(document.head, style);
	}

	function get_each_context(ctx, list, i) {
		const child_ctx = Object.create(ctx);
		child_ctx.icon = list[i];
		return child_ctx;
	}

	// (30:4) {#each iconNames as icon}
	function create_each_block(ctx) {
		var div1, div0, div0_class_value, t, div1_class_value, dispose;

		return {
			c() {
				div1 = element("div");
				div0 = element("div");
				t = space();
				div0.className = div0_class_value = "icon " + ctx.icon.name + " svelte-15gvgat";
				div1.className = div1_class_value = "edit-button " + ctx.icon.id + " svelte-15gvgat";
				dispose = listen(div1, "click", ctx.editSomething);
			},

			m(target, anchor) {
				insert(target, div1, anchor);
				append(div1, div0);
				append(div1, t);
			},

			p: noop,

			d(detaching) {
				if (detaching) {
					detach(div1);
				}

				dispose();
			}
		};
	}

	function create_fragment$3(ctx) {
		var div1, div0, div1_class_value;

		var each_value = ctx.iconNames;

		var each_blocks = [];

		for (var i = 0; i < each_value.length; i += 1) {
			each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
		}

		return {
			c() {
				div1 = element("div");
				div0 = element("div");

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}
				div0.className = "edit-message-icons svelte-15gvgat";
				div1.className = div1_class_value = "edit-message-container " + ctx.messageId + " svelte-15gvgat";
			},

			m(target, anchor) {
				insert(target, div1, anchor);
				append(div1, div0);

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].m(div0, null);
				}
			},

			p(changed, ctx) {
				if (changed.iconNames || changed.editSomething) {
					each_value = ctx.iconNames;

					for (var i = 0; i < each_value.length; i += 1) {
						const child_ctx = get_each_context(ctx, each_value, i);

						if (each_blocks[i]) {
							each_blocks[i].p(changed, child_ctx);
						} else {
							each_blocks[i] = create_each_block(child_ctx);
							each_blocks[i].c();
							each_blocks[i].m(div0, null);
						}
					}

					for (; i < each_blocks.length; i += 1) {
						each_blocks[i].d(1);
					}
					each_blocks.length = each_value.length;
				}

				if ((changed.messageId) && div1_class_value !== (div1_class_value = "edit-message-container " + ctx.messageId + " svelte-15gvgat")) {
					div1.className = div1_class_value;
				}
			},

			i: noop,
			o: noop,

			d(detaching) {
				if (detaching) {
					detach(div1);
				}

				destroy_each(each_blocks, detaching);
			}
		};
	}

	function editBtnHas(theName, theEditButton) {
	  return theEditButton.className.includes(theName)
	}

	function instance$3($$self, $$props, $$invalidate) {
		let { messageId } = $$props;

	  const iconNames = [
	    { name: 'icon-reply', id: 'reply' }
	  ];

	  console.log(messageId);

	  /**@param {MouseEvent} thing*/
	  function editSomething(thing) {
	    const theEditButton = /**@type {HTMLDivElement}*/(thing.target);
	    if (editBtnHas('icon-reply', theEditButton)) {
	      chatPageEvent.emit('show_replying_to', getMessageFromId(messageId));
	    }
	  }

		$$self.$set = $$props => {
			if ('messageId' in $$props) $$invalidate('messageId', messageId = $$props.messageId);
		};

		return { messageId, iconNames, editSomething };
	}

	class MessageEdit extends SvelteComponent {
		constructor(options) {
			super();
			if (!document.getElementById("svelte-15gvgat-style")) add_css$3();
			init(this, options, instance$3, create_fragment$3, safe_not_equal, ["messageId"]);
		}
	}

	/* src\components\chat\message\Message.svelte generated by Svelte v3.0.0 */

	// (41:0) {:else}
	function create_else_block(ctx) {
		var div1, div0, p, t, div1_message_id_value, div1_user_id_value, current;

		var messageedit = new MessageEdit({ props: { messageId: ctx.message.messageId } });

		return {
			c() {
				div1 = element("div");
				div0 = element("div");
				p = element("p");
				t = space();
				messageedit.$$.fragment.c();
				div0.className = "content";
				div1.className = "message follow-up last-message";
				attr(div1, "message-id", div1_message_id_value = ctx.message.messageId);
				attr(div1, "user-id", div1_user_id_value = ctx.message.author.id);
			},

			m(target, anchor) {
				insert(target, div1, anchor);
				append(div1, div0);
				append(div0, p);
				add_binding_callback(() => ctx.p_binding_1(p, null));
				append(div1, t);
				mount_component(messageedit, div1, null);
				current = true;
			},

			p(changed, ctx) {
				if (changed.items) {
					ctx.p_binding_1(null, p);
					ctx.p_binding_1(p, null);
				}

				var messageedit_changes = {};
				if (changed.message) messageedit_changes.messageId = ctx.message.messageId;
				messageedit.$set(messageedit_changes);

				if ((!current || changed.message) && div1_message_id_value !== (div1_message_id_value = ctx.message.messageId)) {
					attr(div1, "message-id", div1_message_id_value);
				}

				if ((!current || changed.message) && div1_user_id_value !== (div1_user_id_value = ctx.message.author.id)) {
					attr(div1, "user-id", div1_user_id_value);
				}
			},

			i(local) {
				if (current) return;
				messageedit.$$.fragment.i(local);

				current = true;
			},

			o(local) {
				messageedit.$$.fragment.o(local);
				current = false;
			},

			d(detaching) {
				if (detaching) {
					detach(div1);
				}

				ctx.p_binding_1(null, p);

				messageedit.$destroy();
			}
		};
	}

	// (19:0) {#if isFollowUpMessage}
	function create_if_block(ctx) {
		var div6, t0, div5, div1, t1, div4, div2, t2_value = ctx.message.author.name, t2, t3, div3, p, t4, div6_message_id_value, div6_user_id_value, current;

		var if_block = (ctx.message.replyTo) && create_if_block_1(ctx);

		var messageedit = new MessageEdit({ props: { messageId: ctx.message.messageId } });

		return {
			c() {
				div6 = element("div");
				if (if_block) if_block.c();
				t0 = space();
				div5 = element("div");
				div1 = element("div");
				div1.innerHTML = `<div class="author icon"></div>`;
				t1 = space();
				div4 = element("div");
				div2 = element("div");
				t2 = text(t2_value);
				t3 = space();
				div3 = element("div");
				p = element("p");
				t4 = space();
				messageedit.$$.fragment.c();
				div2.className = "author-name";
				div3.className = "content";
				div4.className = "warpper";
				div5.className = "message-content-container";
				div6.className = "message last-message";
				attr(div6, "message-id", div6_message_id_value = ctx.message.messageId);
				attr(div6, "user-id", div6_user_id_value = ctx.message.author.id);
			},

			m(target, anchor) {
				insert(target, div6, anchor);
				if (if_block) if_block.m(div6, null);
				append(div6, t0);
				append(div6, div5);
				append(div5, div1);
				append(div5, t1);
				append(div5, div4);
				append(div4, div2);
				append(div2, t2);
				append(div4, t3);
				append(div4, div3);
				append(div3, p);
				add_binding_callback(() => ctx.p_binding(p, null));
				append(div6, t4);
				mount_component(messageedit, div6, null);
				current = true;
			},

			p(changed, ctx) {
				if (ctx.message.replyTo) {
					if (if_block) {
						if_block.p(changed, ctx);
					} else {
						if_block = create_if_block_1(ctx);
						if_block.c();
						if_block.m(div6, t0);
					}
				} else if (if_block) {
					if_block.d(1);
					if_block = null;
				}

				if ((!current || changed.message) && t2_value !== (t2_value = ctx.message.author.name)) {
					set_data(t2, t2_value);
				}

				if (changed.items) {
					ctx.p_binding(null, p);
					ctx.p_binding(p, null);
				}

				var messageedit_changes = {};
				if (changed.message) messageedit_changes.messageId = ctx.message.messageId;
				messageedit.$set(messageedit_changes);

				if ((!current || changed.message) && div6_message_id_value !== (div6_message_id_value = ctx.message.messageId)) {
					attr(div6, "message-id", div6_message_id_value);
				}

				if ((!current || changed.message) && div6_user_id_value !== (div6_user_id_value = ctx.message.author.id)) {
					attr(div6, "user-id", div6_user_id_value);
				}
			},

			i(local) {
				if (current) return;
				messageedit.$$.fragment.i(local);

				current = true;
			},

			o(local) {
				messageedit.$$.fragment.o(local);
				current = false;
			},

			d(detaching) {
				if (detaching) {
					detach(div6);
				}

				if (if_block) if_block.d();
				ctx.p_binding(null, p);

				messageedit.$destroy();
			}
		};
	}

	// (21:2) {#if message.replyTo}
	function create_if_block_1(ctx) {
		var div3, div0, t0, div1, t1_value = ctx.message.replyTo.author.name, t1, t2, div2;

		return {
			c() {
				div3 = element("div");
				div0 = element("div");
				t0 = space();
				div1 = element("div");
				t1 = text(t1_value);
				t2 = space();
				div2 = element("div");
				div0.className = "author icon";
				div1.className = "author-name";
				div2.className = "content";
				div3.className = "message-reply";
			},

			m(target, anchor) {
				insert(target, div3, anchor);
				append(div3, div0);
				append(div3, t0);
				append(div3, div1);
				append(div1, t1);
				append(div3, t2);
				append(div3, div2);
				add_binding_callback(() => ctx.div2_binding(div2, null));
			},

			p(changed, ctx) {
				if ((changed.message) && t1_value !== (t1_value = ctx.message.replyTo.author.name)) {
					set_data(t1, t1_value);
				}

				if (changed.items) {
					ctx.div2_binding(null, div2);
					ctx.div2_binding(div2, null);
				}
			},

			d(detaching) {
				if (detaching) {
					detach(div3);
				}

				ctx.div2_binding(null, div2);
			}
		};
	}

	function create_fragment$4(ctx) {
		var current_block_type_index, if_block, if_block_anchor, current;

		var if_block_creators = [
			create_if_block,
			create_else_block
		];

		var if_blocks = [];

		function select_block_type(ctx) {
			if (ctx.isFollowUpMessage) return 0;
			return 1;
		}

		current_block_type_index = select_block_type(ctx);
		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

		return {
			c() {
				if_block.c();
				if_block_anchor = empty();
			},

			m(target, anchor) {
				if_blocks[current_block_type_index].m(target, anchor);
				insert(target, if_block_anchor, anchor);
				current = true;
			},

			p(changed, ctx) {
				var previous_block_index = current_block_type_index;
				current_block_type_index = select_block_type(ctx);
				if (current_block_type_index === previous_block_index) {
					if_blocks[current_block_type_index].p(changed, ctx);
				} else {
					group_outros();
					on_outro(() => {
						if_blocks[previous_block_index].d(1);
						if_blocks[previous_block_index] = null;
					});
					if_block.o(1);
					check_outros();

					if_block = if_blocks[current_block_type_index];
					if (!if_block) {
						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
						if_block.c();
					}
					if_block.i(1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			},

			i(local) {
				if (current) return;
				if (if_block) if_block.i();
				current = true;
			},

			o(local) {
				if (if_block) if_block.o();
				current = false;
			},

			d(detaching) {
				if_blocks[current_block_type_index].d(detaching);

				if (detaching) {
					detach(if_block_anchor);
				}
			}
		};
	}

	function instance$4($$self, $$props, $$invalidate) {
		

	  /**@type {IMessageProps} */
	  let { message, isFollowUpMessage = false } = $$props;
	  /**@type {HTMLParagraphElement} */
	  let messageContent;
	  let repliedMessageContent;
	  onMount(() => {
	    messageContent.innerHTML = message.content; $$invalidate('messageContent', messageContent);
	    if (repliedMessageContent) {
	      repliedMessageContent.innerHTML = message.replyTo.renderedMessage; $$invalidate('repliedMessageContent', repliedMessageContent);
	    }
	  });

		function div2_binding($$node, check) {
			repliedMessageContent = $$node;
			$$invalidate('repliedMessageContent', repliedMessageContent);
		}

		function p_binding($$node, check) {
			messageContent = $$node;
			$$invalidate('messageContent', messageContent);
		}

		function p_binding_1($$node, check) {
			messageContent = $$node;
			$$invalidate('messageContent', messageContent);
		}

		$$self.$set = $$props => {
			if ('message' in $$props) $$invalidate('message', message = $$props.message);
			if ('isFollowUpMessage' in $$props) $$invalidate('isFollowUpMessage', isFollowUpMessage = $$props.isFollowUpMessage);
		};

		return {
			message,
			isFollowUpMessage,
			messageContent,
			repliedMessageContent,
			div2_binding,
			p_binding,
			p_binding_1
		};
	}

	class Message extends SvelteComponent {
		constructor(options) {
			super();
			init(this, options, instance$4, create_fragment$4, safe_not_equal, ["message", "isFollowUpMessage"]);
		}
	}

	/**@type {Map<string, IMessageCache>} */
	const messageCache = new Map();
	const markdownParser = new MarkdownParser();
	/**
	 * @param {IMessageProps} message
	 */
	function createNewMessage(message) {
	  console.time('making toast');
	  let renderedMessage = processMessage(sanitizeMessage(message.content));
	  const lastMessage = Array.from(messageCache.values()).pop();
	  const mountingPoint = u('.chat-content').nodes[0];

	  const isUserSentTheSameMessage = lastMessage?.author.id == message.author.id && !message.replyTo;
	  console.log(isUserSentTheSameMessage);
	  new Message({
	    target: mountingPoint,
	    props: { 
	      message: { ...message, content: renderedMessage },
	      isFollowUpMessage: !isUserSentTheSameMessage
	    }
	  });

	  messageCache.set(message.messageId, {
	    ...message,
	    renderedMessage
	  });
	  console.timeEnd('making toast');
	}

	function sanitizeMessage(messageContent = '') {
	  return messageContent.replaceAll('&', '<span>&amp;</span>')
	  .replace(/<|>/gm, (it) => {
	    if (!it) return ''
	    const theThing = it
	      .replaceAll('>', '&gt;')
	      .replaceAll('<', '&lt;');
	    return `<span>${theThing}</span>`
	  })
	}

	/**
	 * @param {string} messageContent
	 */
	function processMessage(messageContent) {
	  const isHasLink = /(http|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/gm;
	  messageContent = messageContent.replace(isHasLink, (link) => /*html*/`
    <a href="${link}" target="_blank">${link}</a>
  `);
	  return newLinesToBreakSpaces(markdownParser.parse(messageContent))
	}

	function newLinesToBreakSpaces(messageContent = '') {
	  return messageContent.replace(/\n/gm, it => `<div>${it}</div>`)
	}

	/**
	 * @param {string} messageId
	 * @returns {IMessageCache}
	 */
	function getMessageFromId(messageId) {
	  const message = messageCache.get(messageId);
	  if (!message) logdown.warn(`message "${messageId}" does not exist`);
	  return message
	}

	/**
	 * @typedef {{
	 *   'show_replying_to': [repliedMessage: IMessageCache],
	 *   'hide_replying_to': [],
	 *   'send_message': [messageContent: string, repliedMessage?: IMessageProps]
	 * }} ChatPageEvents
	 * @type {EventEmitter<ChatPageEvents>}
	 */
	const chatPageEvent = new EventEmitter();

	/* src\components\chat\ChatMessageInput.svelte generated by Svelte v3.0.0 */

	function add_css$4() {
		var style = element("style");
		style.id = 'svelte-19tn8oi-style';
		style.textContent = ".input-container.svelte-19tn8oi{position:absolute;bottom:0;width:100%}textarea.svelte-19tn8oi{width:100%;padding:0 0 0 5px;resize:none;background:transparent !important;overflow:hidden;overflow-y:scroll}.message-input.svelte-19tn8oi{display:flex;align-items:center;gap:20px;background:var(--chat-message-input-color);margin-bottom:10px;padding:15px;border-radius:10px}.upload.svelte-19tn8oi{padding:5px}";
		append(document.head, style);
	}

	function create_fragment$5(ctx) {
		var div4, div0, t0, div3, div2, t1, textarea, dispose;

		return {
			c() {
				div4 = element("div");
				div0 = element("div");
				t0 = space();
				div3 = element("div");
				div2 = element("div");
				div2.innerHTML = `<div class="icon icon-plus"></div>`;
				t1 = space();
				textarea = element("textarea");
				div2.className = "upload svelte-19tn8oi";
				textarea.className = "no-bg no-outline svelte-19tn8oi";
				textarea.rows = "1";
				textarea.placeholder = "Say something :)";
				div3.className = "message-input svelte-19tn8oi";
				div4.className = "input-container svelte-19tn8oi";

				dispose = [
					listen(textarea, "input", autoResize),
					listen(textarea, "keypress", ctx.onTyping),
					listen(textarea, "keyup", ctx.dismissAnyStuffAboveDaInput)
				];
			},

			m(target, anchor) {
				insert(target, div4, anchor);
				append(div4, div0);
				add_binding_callback(() => ctx.div0_binding(div0, null));
				append(div4, t0);
				append(div4, div3);
				append(div3, div2);
				append(div3, t1);
				append(div3, textarea);
			},

			p(changed, ctx) {
				if (changed.items) {
					ctx.div0_binding(null, div0);
					ctx.div0_binding(div0, null);
				}
			},

			i: noop,
			o: noop,

			d(detaching) {
				if (detaching) {
					detach(div4);
				}

				ctx.div0_binding(null, div0);
				run_all(dispose);
			}
		};
	}

	const MAXINUM_TEXT_INPUT_ROWS = 20;

	function autoResize (event) {
	  const input = /**@type {HTMLTextAreaElement}*/(event.target);
	  if (input.scrollHeight > MAXINUM_TEXT_INPUT_ROWS * 15) {
	    return logdown.warn('maxinum rows exceeded')
	  }

	  resetInput(input);
	  input.style.height = input.scrollHeight + 'px';
	}

	function resetInput (input) {
	  input.style.height = '';
	}

	function instance$5($$self, $$props, $$invalidate) {
		

	  const dispatch = createEventDispatcher();
	  const chatInputEvent = new EventEmitter();

	  /**@param {KeyboardEvent} keyboardEv */
	  function onTyping (keyboardEv) {
	    if (keyboardEv.shiftKey && keyboardEv.key === 'Enter') return
	    if (keyboardEv.key !== 'Enter') return 
	    keyboardEv.preventDefault();
	    const input = /**@type {HTMLTextAreaElement}*/(keyboardEv.target),
	      messageInTextInput = input.value,
	      messageContent = messageInTextInput.trim();
	    if (
	      messageContent == '' ||
	      messageInTextInput == '> ' 
	    ) return logdown.warn('message is empty')
	    input.value = '';
	    input.focus();
	    resetInput(input);
	    dispatch('send_message', {
	      messageTyped: messageContent,
	      repliedTo: lastRepliedMessage
	    });

	    chatInputEvent.emit('hide_replying_to');
	  }

	  /**@param {KeyboardEvent} keyboardEv */
	  function dismissAnyStuffAboveDaInput(keyboardEv) {
	    if (keyboardEv.key !== 'Escape') return
	    chatInputEvent.emit('hide_replying_to');
	    logdown.info('dismissed');
	  }

	  /**@type {IMessageProps | null}*/
	  let lastRepliedMessage = null, lastMessageId = '';
	  /**@type {HTMLDivElement} */
	  let anyHint;
	  chatPageEvent.on('show_replying_to', (repliedMessage) => {
	    if (lastMessageId === repliedMessage.messageId) {
	      return logdown.warn(`Message "${repliedMessage.messageId}" - already shown`)
	    }

	    new ReplyingToHint({
	      target: anyHint,
	      props: { repliedMessage }
	    });

	    $$invalidate('lastMessageId', lastMessageId = repliedMessage.messageId);
	    $$invalidate('lastRepliedMessage', lastRepliedMessage = repliedMessage);
	  });

	  chatInputEvent.on('hide_replying_to', () => {
	    lastRepliedMessage ? (() => {
	      hideHints();
	      $$invalidate('lastRepliedMessage', lastRepliedMessage = lastMessageId = null); $$invalidate('lastMessageId', lastMessageId);
	    })() : 0;
	  });

	  function hideHints() {
	    anyHint.children[0].remove();
	  }

		function div0_binding($$node, check) {
			anyHint = $$node;
			$$invalidate('anyHint', anyHint);
		}

		return {
			onTyping,
			dismissAnyStuffAboveDaInput,
			anyHint,
			div0_binding
		};
	}

	class ChatMessageInput extends SvelteComponent {
		constructor(options) {
			super();
			if (!document.getElementById("svelte-19tn8oi-style")) add_css$4();
			init(this, options, instance$5, create_fragment$5, safe_not_equal, []);
		}
	}

	/* src\screen\page\ChatPage.svelte generated by Svelte v3.0.0 */

	function add_css$5() {
		var style = element("style");
		style.id = 'svelte-rjvasx-style';
		style.textContent = ".chat-page.svelte-rjvasx{height:100%;position:relative;grid-template-rows:auto 3.75rem}.chat-content.svelte-rjvasx{max-height:82.5vh;padding-top:1rem;overflow-y:scroll}::-webkit-scrollbar{background:var(--chat-scroll-bar-color);border-radius:5px;width:13px}::-webkit-scrollbar-thumb{width:5px;background:var(--app-second-sidebar-color)}";
		append(document.head, style);
	}

	function create_fragment$6(ctx) {
		var div1, div0, t, current;

		var chatmessageinput = new ChatMessageInput({});
		chatmessageinput.$on("send_message", ctx.send_message_handler);

		return {
			c() {
				div1 = element("div");
				div0 = element("div");
				t = space();
				chatmessageinput.$$.fragment.c();
				div0.className = "chat-content svelte-rjvasx";
				div1.className = "chat-page svelte-rjvasx";
			},

			m(target, anchor) {
				insert(target, div1, anchor);
				append(div1, div0);
				append(div1, t);
				mount_component(chatmessageinput, div1, null);
				add_binding_callback(() => ctx.div1_binding(div1, null));
				current = true;
			},

			p(changed, ctx) {
				if (changed.items) {
					ctx.div1_binding(null, div1);
					ctx.div1_binding(div1, null);
				}
			},

			i(local) {
				if (current) return;
				chatmessageinput.$$.fragment.i(local);

				current = true;
			},

			o(local) {
				chatmessageinput.$$.fragment.o(local);
				current = false;
			},

			d(detaching) {
				if (detaching) {
					detach(div1);
				}

				chatmessageinput.$destroy();

				ctx.div1_binding(null, div1);
			}
		};
	}

	function instance$6($$self, $$props, $$invalidate) {
		
	  let { syncMessages = true } = $$props;

	  if (window.__app__.mode == 'production' && syncMessages) {
	    socket.on('message', (message) => {
	      createNewMessage(message);
	    });
	  }

	  /**@type {HTMLDivElement} */
	  let chatPage;
	  chatPageEvent.on('send_message', (messageContent, repliedMessage) => {
	    console.log('replied message:', repliedMessage);
	    const messageToSend = {
	      author: {
	        iconUrl: '',
	        id: /**@type {UserId}*/(sessionStorage.getItem('user_id')),
	        name: 'Anonymous'
	      },
	      content: messageContent,
	      messageId: makeid(20),
	      replyTo: repliedMessage
	    };

	    if (window.__app__.mode == 'production' && syncMessages) {
	      return socket.emit('message', messageToSend)
	    }

	    createNewMessage(messageToSend);
	    chatPage.scrollTop = chatPage.scrollHeight; $$invalidate('chatPage', chatPage);
	  });

		function send_message_handler(message) {
		    chatPageEvent.emit('send_message', message.detail.messageTyped, message.detail.repliedTo);
		  }

		function div1_binding($$node, check) {
			chatPage = $$node;
			$$invalidate('chatPage', chatPage);
		}

		$$self.$set = $$props => {
			if ('syncMessages' in $$props) $$invalidate('syncMessages', syncMessages = $$props.syncMessages);
		};

		return {
			syncMessages,
			chatPage,
			send_message_handler,
			div1_binding
		};
	}

	class ChatPage extends SvelteComponent {
		constructor(options) {
			super();
			if (!document.getElementById("svelte-rjvasx-style")) add_css$5();
			init(this, options, instance$6, create_fragment$6, safe_not_equal, ["syncMessages"]);
		}
	}

	/* src\screen\setting\app_related\previewer\AppThemePreview.svelte generated by Svelte v3.0.0 */

	function add_css$6() {
		var style = element("style");
		style.id = 'svelte-xqw2vx-style';
		style.textContent = ".app-previewer.svelte-xqw2vx{padding:5px;border:1px solid transparent}.previewer.svelte-xqw2vx:hover .app-previewer.svelte-xqw2vx,.previewer.selected.svelte-xqw2vx .app-previewer.svelte-xqw2vx{border-color:#ffffff8f}.small-app.svelte-xqw2vx{margin:5px;display:grid;grid-template-columns:3rem 7rem;padding:5px}h5.svelte-xqw2vx{margin:0 5px;margin-bottom:1rem}";
		append(document.head, style);
	}

	function create_fragment$7(ctx) {
		var div2, h5, t0, t1, div1, div0, aside, br0, t2, br1, t3, br2, t4, br3, t5, main, div2_class_value, dispose;

		return {
			c() {
				div2 = element("div");
				h5 = element("h5");
				t0 = text(ctx.themeName);
				t1 = space();
				div1 = element("div");
				div0 = element("div");
				aside = element("aside");
				br0 = element("br");
				t2 = space();
				br1 = element("br");
				t3 = space();
				br2 = element("br");
				t4 = space();
				br3 = element("br");
				t5 = space();
				main = element("main");
				h5.className = "svelte-xqw2vx";
				set_style(aside, "background", ctx.sidebarColor);
				div0.className = "small-app svelte-xqw2vx";
				set_style(div0, "background", ctx.backgroundColor);
				div1.className = "app-previewer svelte-xqw2vx";
				div2.className = div2_class_value = "previewer " + (ctx.selected ? 'selected' : '') + " svelte-xqw2vx";
				dispose = listen(div2, "click", ctx.click_handler);
			},

			m(target, anchor) {
				insert(target, div2, anchor);
				append(div2, h5);
				append(h5, t0);
				append(div2, t1);
				append(div2, div1);
				append(div1, div0);
				append(div0, aside);
				append(aside, br0);
				append(aside, t2);
				append(aside, br1);
				append(aside, t3);
				append(aside, br2);
				append(aside, t4);
				append(aside, br3);
				append(div0, t5);
				append(div0, main);
			},

			p(changed, ctx) {
				if (changed.themeName) {
					set_data(t0, ctx.themeName);
				}

				if (changed.sidebarColor) {
					set_style(aside, "background", ctx.sidebarColor);
				}

				if (changed.backgroundColor) {
					set_style(div0, "background", ctx.backgroundColor);
				}

				if ((changed.selected) && div2_class_value !== (div2_class_value = "previewer " + (ctx.selected ? 'selected' : '') + " svelte-xqw2vx")) {
					div2.className = div2_class_value;
				}
			},

			i: noop,
			o: noop,

			d(detaching) {
				if (detaching) {
					detach(div2);
				}

				dispose();
			}
		};
	}

	let lastSelectedTheme = '';

	function selectedTheme(themeName) {
	  console.log('theme selected:', themeName);
	  if (lastSelectedTheme == themeName) return
	  const appRoot = document.querySelector('.app-mount');
	  appRoot.className = `app-mount ${themeName}-theme ${themeName}-theme-text`;
	}

	function instance$7($$self, $$props, $$invalidate) {
		let { themeName, backgroundColor, sidebarColor, selected = false } = $$props;

		function click_handler() {
			return selectedTheme(themeName.toLowerCase());
		}

		$$self.$set = $$props => {
			if ('themeName' in $$props) $$invalidate('themeName', themeName = $$props.themeName);
			if ('backgroundColor' in $$props) $$invalidate('backgroundColor', backgroundColor = $$props.backgroundColor);
			if ('sidebarColor' in $$props) $$invalidate('sidebarColor', sidebarColor = $$props.sidebarColor);
			if ('selected' in $$props) $$invalidate('selected', selected = $$props.selected);
		};

		return {
			themeName,
			backgroundColor,
			sidebarColor,
			selected,
			click_handler
		};
	}

	class AppThemePreview extends SvelteComponent {
		constructor(options) {
			super();
			if (!document.getElementById("svelte-xqw2vx-style")) add_css$6();
			init(this, options, instance$7, create_fragment$7, safe_not_equal, ["themeName", "backgroundColor", "sidebarColor", "selected"]);
		}
	}

	/* src\screen\setting\app_related\AppearancePage.svelte generated by Svelte v3.0.0 */

	function add_css$7() {
		var style = element("style");
		style.id = 'svelte-8nya38-style';
		style.textContent = ".theme-list.svelte-8nya38{padding:10px;background:#ffffff0d;display:flex;gap:2rem}.background-settings.svelte-8nya38{display:grid;grid-template-columns:1fr 1fr}.small-app.svelte-8nya38{display:grid;grid-template-columns:7rem auto;height:15rem;padding:10px;background:var(--app-bg-color)}aside.svelte-8nya38{background:var(--app-second-sidebar-color)}.background-previewer.svelte-8nya38{padding:15px;background-color:#ffffff0d}";
		append(document.head, style);
	}

	function create_fragment$8(ctx) {
		var section0, h3, t1, div, t2, t3, section1, current;

		var appthemepreview0 = new AppThemePreview({
			props: {
			themeName: "Dark",
			backgroundColor: "#131418",
			sidebarColor: "#1c1c24",
			selected: true
		}
		});

		var appthemepreview1 = new AppThemePreview({
			props: {
			themeName: "Light",
			backgroundColor: "#ffffff",
			sidebarColor: "#ededed"
		}
		});

		return {
			c() {
				section0 = element("section");
				h3 = element("h3");
				h3.textContent = "Theme";
				t1 = space();
				div = element("div");
				appthemepreview0.$$.fragment.c();
				t2 = space();
				appthemepreview1.$$.fragment.c();
				t3 = space();
				section1 = element("section");
				section1.innerHTML = `<h3>Background</h3>
			  <div class="background-settings svelte-8nya38"><div>something</div>
			    <div class="background-previewer svelte-8nya38"><div class="small-app svelte-8nya38"><aside class="svelte-8nya38"><br>
			          <br>
			          <br>
			          <br></aside>
			        <main></main></div></div></div>`;
				div.className = "theme-list svelte-8nya38";
			},

			m(target, anchor) {
				insert(target, section0, anchor);
				append(section0, h3);
				append(section0, t1);
				append(section0, div);
				mount_component(appthemepreview0, div, null);
				append(div, t2);
				mount_component(appthemepreview1, div, null);
				insert(target, t3, anchor);
				insert(target, section1, anchor);
				current = true;
			},

			p: noop,

			i(local) {
				if (current) return;
				appthemepreview0.$$.fragment.i(local);

				appthemepreview1.$$.fragment.i(local);

				current = true;
			},

			o(local) {
				appthemepreview0.$$.fragment.o(local);
				appthemepreview1.$$.fragment.o(local);
				current = false;
			},

			d(detaching) {
				if (detaching) {
					detach(section0);
				}

				appthemepreview0.$destroy();

				appthemepreview1.$destroy();

				if (detaching) {
					detach(t3);
					detach(section1);
				}
			}
		};
	}

	class AppearancePage extends SvelteComponent {
		constructor(options) {
			super();
			if (!document.getElementById("svelte-8nya38-style")) add_css$7();
			init(this, options, null, create_fragment$8, safe_not_equal, []);
		}
	}

	/* src\screen\setting\SettingPage.svelte generated by Svelte v3.0.0 */

	function add_css$8() {
		var style = element("style");
		style.id = 'svelte-pbrl9p-style';
		style.textContent = ".setting-page.svelte-pbrl9p{padding:var(--app-space)}.close-setting.svelte-pbrl9p{margin-left:auto;padding:5px}.close-setting.svelte-pbrl9p:hover{background:var(--app-icon-selected-color)}h1.svelte-pbrl9p{margin-top:0;margin-bottom:5px;color:#d1d1d1;display:flex;align-items:center}";
		append(document.head, style);
	}

	function create_fragment$9(ctx) {
		var div5, div3, h1, t0, t1, div1, div0, t2, div2, t3, t4, div4, current, dispose;

		const default_slot_1 = ctx.$$slots.default;
		const default_slot = create_slot(default_slot_1, ctx, null);

		return {
			c() {
				div5 = element("div");
				div3 = element("div");
				h1 = element("h1");
				t0 = text(ctx.name);
				t1 = space();
				div1 = element("div");
				div0 = element("div");
				t2 = space();
				div2 = element("div");
				t3 = text(ctx.description);
				t4 = space();
				div4 = element("div");

				if (default_slot) default_slot.c();
				div0.className = "icon icon-x";
				div1.className = "close-setting svelte-pbrl9p";
				h1.className = "svelte-pbrl9p";

				div5.className = "setting-page svelte-pbrl9p";
				dispose = listen(div0, "click", ctx.click_handler);
			},

			l(nodes) {
				if (default_slot) default_slot.l(div4_nodes);
			},

			m(target, anchor) {
				insert(target, div5, anchor);
				append(div5, div3);
				append(div3, h1);
				append(h1, t0);
				append(h1, t1);
				append(h1, div1);
				append(div1, div0);
				append(div3, t2);
				append(div3, div2);
				append(div2, t3);
				append(div5, t4);
				append(div5, div4);

				if (default_slot) {
					default_slot.m(div4, null);
				}

				current = true;
			},

			p(changed, ctx) {
				if (!current || changed.name) {
					set_data(t0, ctx.name);
				}

				if (!current || changed.description) {
					set_data(t3, ctx.description);
				}

				if (default_slot && default_slot.p && changed.$$scope) {
					default_slot.p(get_slot_changes(default_slot_1, ctx, changed,), get_slot_context(default_slot_1, ctx, null));
				}
			},

			i(local) {
				if (current) return;
				if (default_slot && default_slot.i) default_slot.i(local);
				current = true;
			},

			o(local) {
				if (default_slot && default_slot.o) default_slot.o(local);
				current = false;
			},

			d(detaching) {
				if (detaching) {
					detach(div5);
				}

				if (default_slot) default_slot.d(detaching);
				dispose();
			}
		};
	}

	function instance$8($$self, $$props, $$invalidate) {
		let { name, description } = $$props;

	  const dispatch = createEventDispatcher();

		let { $$slots = {}, $$scope } = $$props;

		function click_handler() {
			return dispatch('close_setting', null);
		}

		$$self.$set = $$props => {
			if ('name' in $$props) $$invalidate('name', name = $$props.name);
			if ('description' in $$props) $$invalidate('description', description = $$props.description);
			if ('$$scope' in $$props) $$invalidate('$$scope', $$scope = $$props.$$scope);
		};

		return {
			name,
			description,
			dispatch,
			click_handler,
			$$slots,
			$$scope
		};
	}

	class SettingPage extends SvelteComponent {
		constructor(options) {
			super();
			if (!document.getElementById("svelte-pbrl9p-style")) add_css$8();
			init(this, options, instance$8, create_fragment$9, safe_not_equal, ["name", "description"]);
		}
	}

	/* src\components\SideBarItem.svelte generated by Svelte v3.0.0 */

	function add_css$9() {
		var style = element("style");
		style.id = 'svelte-1yz2dvb-style';
		style.textContent = "li.svelte-1yz2dvb{display:flex;align-items:center;gap:9px;list-style:none;padding:5px 10px 5px 24px;margin:5px 0;transition:all 0.1s ease-out;cursor:pointer;border-radius:5px}li.selected.svelte-1yz2dvb,li.svelte-1yz2dvb:hover{font-weight:bold;background:var(--app-icon-selected-color)}.menu-item.svelte-1yz2dvb{display:flex;align-items:center;gap:9px;list-style:none;padding:5px 10px 5px 24px;margin:5px 0;transition:all 0.1s ease-out;cursor:pointer;border-radius:5px}li.svelte-1yz2dvb .icon.svelte-1yz2dvb{--icon-url:url('https://cdn.discordapp.com/attachments/1089483298327253075/1136142944273969273/image.jpeg')}.menu-item.svelte-1yz2dvb:hover{font-weight:bold;background-color:var(--app-icon-selected-color)}.notification-count.svelte-1yz2dvb{margin-left:auto;padding:1px 9px;border-radius:8px;background:var(--app-notification-color)}.description.svelte-1yz2dvb{font-size:small;color:var(--app-sidebar-description-color)}";
		append(document.head, style);
	}

	// (15:2) {#if icon}
	function create_if_block_2(ctx) {
		var div;

		return {
			c() {
				div = element("div");
				div.className = "icon svelte-1yz2dvb";
			},

			m(target, anchor) {
				insert(target, div, anchor);
			},

			d(detaching) {
				if (detaching) {
					detach(div);
				}
			}
		};
	}

	// (20:4) {#if description}
	function create_if_block_1$1(ctx) {
		var div, t;

		return {
			c() {
				div = element("div");
				t = text(ctx.description);
				div.className = "description svelte-1yz2dvb";
			},

			m(target, anchor) {
				insert(target, div, anchor);
				append(div, t);
			},

			p(changed, ctx) {
				if (changed.description) {
					set_data(t, ctx.description);
				}
			},

			d(detaching) {
				if (detaching) {
					detach(div);
				}
			}
		};
	}

	// (24:2) {#if notificationCount}
	function create_if_block$1(ctx) {
		var div, span, t;

		return {
			c() {
				div = element("div");
				span = element("span");
				t = text(ctx.notificationCount);
				div.className = "notification-count svelte-1yz2dvb";
			},

			m(target, anchor) {
				insert(target, div, anchor);
				append(div, span);
				append(span, t);
			},

			p(changed, ctx) {
				if (changed.notificationCount) {
					set_data(t, ctx.notificationCount);
				}
			},

			d(detaching) {
				if (detaching) {
					detach(div);
				}
			}
		};
	}

	function create_fragment$a(ctx) {
		var li, t0, div, t1, t2, t3, li_class_value, dispose;

		var if_block0 = (ctx.icon) && create_if_block_2();

		var if_block1 = (ctx.description) && create_if_block_1$1(ctx);

		var if_block2 = (ctx.notificationCount) && create_if_block$1(ctx);

		return {
			c() {
				li = element("li");
				if (if_block0) if_block0.c();
				t0 = space();
				div = element("div");
				t1 = text(ctx.name);
				t2 = space();
				if (if_block1) if_block1.c();
				t3 = space();
				if (if_block2) if_block2.c();
				div.className = "menu-item-name svelte-1yz2dvb";
				li.className = li_class_value = "" + (ctx.selected ? 'selected' : '') + " svelte-1yz2dvb";
				li.id = ctx.id;
				dispose = listen(li, "click", ctx.click_handler);
			},

			m(target, anchor) {
				insert(target, li, anchor);
				if (if_block0) if_block0.m(li, null);
				append(li, t0);
				append(li, div);
				append(div, t1);
				append(div, t2);
				if (if_block1) if_block1.m(div, null);
				append(li, t3);
				if (if_block2) if_block2.m(li, null);
			},

			p(changed, ctx) {
				if (ctx.icon) {
					if (!if_block0) {
						if_block0 = create_if_block_2();
						if_block0.c();
						if_block0.m(li, t0);
					}
				} else if (if_block0) {
					if_block0.d(1);
					if_block0 = null;
				}

				if (changed.name) {
					set_data(t1, ctx.name);
				}

				if (ctx.description) {
					if (if_block1) {
						if_block1.p(changed, ctx);
					} else {
						if_block1 = create_if_block_1$1(ctx);
						if_block1.c();
						if_block1.m(div, null);
					}
				} else if (if_block1) {
					if_block1.d(1);
					if_block1 = null;
				}

				if (ctx.notificationCount) {
					if (if_block2) {
						if_block2.p(changed, ctx);
					} else {
						if_block2 = create_if_block$1(ctx);
						if_block2.c();
						if_block2.m(li, null);
					}
				} else if (if_block2) {
					if_block2.d(1);
					if_block2 = null;
				}

				if ((changed.selected) && li_class_value !== (li_class_value = "" + (ctx.selected ? 'selected' : '') + " svelte-1yz2dvb")) {
					li.className = li_class_value;
				}

				if (changed.id) {
					li.id = ctx.id;
				}
			},

			i: noop,
			o: noop,

			d(detaching) {
				if (detaching) {
					detach(li);
				}

				if (if_block0) if_block0.d();
				if (if_block1) if_block1.d();
				if (if_block2) if_block2.d();
				dispose();
			}
		};
	}

	function instance$9($$self, $$props, $$invalidate) {
		let { name, description = null, selected = false, id, icon = null, notificationCount = null } = $$props;

	  const dispatch = createEventDispatcher();

		function click_handler() {
			return dispatch('switch_page', id);
		}

		$$self.$set = $$props => {
			if ('name' in $$props) $$invalidate('name', name = $$props.name);
			if ('description' in $$props) $$invalidate('description', description = $$props.description);
			if ('selected' in $$props) $$invalidate('selected', selected = $$props.selected);
			if ('id' in $$props) $$invalidate('id', id = $$props.id);
			if ('icon' in $$props) $$invalidate('icon', icon = $$props.icon);
			if ('notificationCount' in $$props) $$invalidate('notificationCount', notificationCount = $$props.notificationCount);
		};

		return {
			name,
			description,
			selected,
			id,
			icon,
			notificationCount,
			dispatch,
			click_handler
		};
	}

	class SideBarItem extends SvelteComponent {
		constructor(options) {
			super();
			if (!document.getElementById("svelte-1yz2dvb-style")) add_css$9();
			init(this, options, instance$9, create_fragment$a, safe_not_equal, ["name", "description", "selected", "id", "icon", "notificationCount"]);
		}
	}

	/* src\components\SideBarSection.svelte generated by Svelte v3.0.0 */

	function add_css$a() {
		var style = element("style");
		style.id = 'svelte-12h1co1-style';
		style.textContent = "section.svelte-12h1co1{padding:var(--app-space)}ul.svelte-12h1co1{padding-inline-start:0px;margin-bottom:3rem}.section-title.svelte-12h1co1{display:flex;align-items:center;gap:10px;margin:7px 0}h3.svelte-12h1co1{margin:0}.icon.svelte-12h1co1{--icon-bound:14px;transition:background-color 0.15s ease-out;cursor:pointer;padding:4px}.icon.svelte-12h1co1:hover{background-color:var(--app-icon-selected-color)}";
		append(document.head, style);
	}

	// (8:4) {#if showArrowIcon}
	function create_if_block$2(ctx) {
		var div;

		return {
			c() {
				div = element("div");
				div.className = "icon icon-arrow svelte-12h1co1";
			},

			m(target, anchor) {
				insert(target, div, anchor);
			},

			d(detaching) {
				if (detaching) {
					detach(div);
				}
			}
		};
	}

	function create_fragment$b(ctx) {
		var section, div, t0, h3, t1, t2, ul, current;

		var if_block = (ctx.showArrowIcon) && create_if_block$2();

		const default_slot_1 = ctx.$$slots.default;
		const default_slot = create_slot(default_slot_1, ctx, null);

		return {
			c() {
				section = element("section");
				div = element("div");
				if (if_block) if_block.c();
				t0 = space();
				h3 = element("h3");
				t1 = text(ctx.name);
				t2 = space();
				ul = element("ul");

				if (default_slot) default_slot.c();
				h3.className = "svelte-12h1co1";
				div.className = "section-title svelte-12h1co1";

				ul.className = "svelte-12h1co1";
				section.className = "svelte-12h1co1";
			},

			l(nodes) {
				if (default_slot) default_slot.l(ul_nodes);
			},

			m(target, anchor) {
				insert(target, section, anchor);
				append(section, div);
				if (if_block) if_block.m(div, null);
				append(div, t0);
				append(div, h3);
				append(h3, t1);
				append(section, t2);
				append(section, ul);

				if (default_slot) {
					default_slot.m(ul, null);
				}

				current = true;
			},

			p(changed, ctx) {
				if (ctx.showArrowIcon) {
					if (!if_block) {
						if_block = create_if_block$2();
						if_block.c();
						if_block.m(div, t0);
					}
				} else if (if_block) {
					if_block.d(1);
					if_block = null;
				}

				if (!current || changed.name) {
					set_data(t1, ctx.name);
				}

				if (default_slot && default_slot.p && changed.$$scope) {
					default_slot.p(get_slot_changes(default_slot_1, ctx, changed,), get_slot_context(default_slot_1, ctx, null));
				}
			},

			i(local) {
				if (current) return;
				if (default_slot && default_slot.i) default_slot.i(local);
				current = true;
			},

			o(local) {
				if (default_slot && default_slot.o) default_slot.o(local);
				current = false;
			},

			d(detaching) {
				if (detaching) {
					detach(section);
				}

				if (if_block) if_block.d();

				if (default_slot) default_slot.d(detaching);
			}
		};
	}

	function instance$a($$self, $$props, $$invalidate) {
		let { name, showArrowIcon = true } = $$props;

		let { $$slots = {}, $$scope } = $$props;

		$$self.$set = $$props => {
			if ('name' in $$props) $$invalidate('name', name = $$props.name);
			if ('showArrowIcon' in $$props) $$invalidate('showArrowIcon', showArrowIcon = $$props.showArrowIcon);
			if ('$$scope' in $$props) $$invalidate('$$scope', $$scope = $$props.$$scope);
		};

		return { name, showArrowIcon, $$slots, $$scope };
	}

	class SideBarSection extends SvelteComponent {
		constructor(options) {
			super();
			if (!document.getElementById("svelte-12h1co1-style")) add_css$a();
			init(this, options, instance$a, create_fragment$b, safe_not_equal, ["name", "showArrowIcon"]);
		}
	}

	/* src\screen\Setting.svelte generated by Svelte v3.0.0 */

	function add_css$b() {
		var style = element("style");
		style.id = 'svelte-p7cgc5-style';
		style.textContent = ".setting.svelte-p7cgc5{background:var(--app-bg-color);animation:fade-in 0.15s ease-in;display:grid;grid-template-columns:22rem auto;gap:var(--app-space);padding:var(--app-space)}h1.svelte-p7cgc5{margin-left:var(--app-space)}aside.svelte-p7cgc5{padding:0 5px;background:var(--app-second-sidebar-color)}";
		append(document.head, style);
	}

	// (15:4) <SideBarSection name="App related">
	function create_default_slot_1(ctx) {
		var current;

		var sidebaritem = new SideBarItem({
			props: { name: "Appearance", id: "appearance" }
		});

		return {
			c() {
				sidebaritem.$$.fragment.c();
			},

			m(target, anchor) {
				mount_component(sidebaritem, target, anchor);
				current = true;
			},

			p: noop,

			i(local) {
				if (current) return;
				sidebaritem.$$.fragment.i(local);

				current = true;
			},

			o(local) {
				sidebaritem.$$.fragment.o(local);
				current = false;
			},

			d(detaching) {
				sidebaritem.$destroy(detaching);
			}
		};
	}

	// (20:4) <SettingPage name="App related > Appearance" description="Change the app theme, customize the background, ..." on:close_setting={() => setting.remove()}>
	function create_default_slot$1(ctx) {
		var current;

		var appearancepage = new AppearancePage({});

		return {
			c() {
				appearancepage.$$.fragment.c();
			},

			m(target, anchor) {
				mount_component(appearancepage, target, anchor);
				current = true;
			},

			i(local) {
				if (current) return;
				appearancepage.$$.fragment.i(local);

				current = true;
			},

			o(local) {
				appearancepage.$$.fragment.o(local);
				current = false;
			},

			d(detaching) {
				appearancepage.$destroy(detaching);
			}
		};
	}

	function create_fragment$c(ctx) {
		var div, aside, h1, t1, t2, main, current;

		var sidebarsection = new SideBarSection({
			props: {
			name: "App related",
			$$slots: { default: [create_default_slot_1] },
			$$scope: { ctx }
		}
		});

		var settingpage = new SettingPage({
			props: {
			name: "App related > Appearance",
			description: "Change the app theme, customize the background, ...",
			$$slots: { default: [create_default_slot$1] },
			$$scope: { ctx }
		}
		});
		settingpage.$on("close_setting", ctx.close_setting_handler);

		return {
			c() {
				div = element("div");
				aside = element("aside");
				h1 = element("h1");
				h1.textContent = "Settings";
				t1 = space();
				sidebarsection.$$.fragment.c();
				t2 = space();
				main = element("main");
				settingpage.$$.fragment.c();
				h1.className = "svelte-p7cgc5";
				aside.className = "svelte-p7cgc5";
				div.className = "setting screen svelte-p7cgc5";
			},

			m(target, anchor) {
				insert(target, div, anchor);
				append(div, aside);
				append(aside, h1);
				append(aside, t1);
				mount_component(sidebarsection, aside, null);
				append(div, t2);
				append(div, main);
				mount_component(settingpage, main, null);
				add_binding_callback(() => ctx.div_binding(div, null));
				current = true;
			},

			p(changed, ctx) {
				var sidebarsection_changes = {};
				if (changed.$$scope) sidebarsection_changes.$$scope = { changed, ctx };
				sidebarsection.$set(sidebarsection_changes);

				var settingpage_changes = {};
				if (changed.$$scope) settingpage_changes.$$scope = { changed, ctx };
				settingpage.$set(settingpage_changes);

				if (changed.items) {
					ctx.div_binding(null, div);
					ctx.div_binding(div, null);
				}
			},

			i(local) {
				if (current) return;
				sidebarsection.$$.fragment.i(local);

				settingpage.$$.fragment.i(local);

				current = true;
			},

			o(local) {
				sidebarsection.$$.fragment.o(local);
				settingpage.$$.fragment.o(local);
				current = false;
			},

			d(detaching) {
				if (detaching) {
					detach(div);
				}

				sidebarsection.$destroy();

				settingpage.$destroy();

				ctx.div_binding(null, div);
			}
		};
	}

	function instance$b($$self, $$props, $$invalidate) {
		

	  /**@type {HTMLDivElement}*/
	  let setting;

		function close_setting_handler() {
			return setting.remove();
		}

		function div_binding($$node, check) {
			setting = $$node;
			$$invalidate('setting', setting);
		}

		return {
			setting,
			close_setting_handler,
			div_binding
		};
	}

	class Setting extends SvelteComponent {
		constructor(options) {
			super();
			if (!document.getElementById("svelte-p7cgc5-style")) add_css$b();
			init(this, options, instance$b, create_fragment$c, safe_not_equal, []);
		}
	}

	/* src\components\UserInfo.svelte generated by Svelte v3.0.0 */

	function add_css$c() {
		var style = element("style");
		style.id = 'svelte-1d131f4-style';
		style.textContent = ".setting-warpper.svelte-1d131f4{padding:var(--app-space);display:flex;justify-content:space-between;margin-top:auto;height:100%;flex-flow:column}.setting-warpper.svelte-1d131f4>.svelte-1d131f4{flex:none}.setting-warpper.svelte-1d131f4 .user-avatar.svelte-1d131f4{--icon-bound:2rem;--icon-url:url('https://media.discordapp.net/attachments/1089483298327253075/1136148197572616304/image.jpeg');border-radius:50%}.setting.svelte-1d131f4{margin-left:auto;cursor:pointer;display:flex;justify-content:center;align-items:center;padding:5px}.setting.svelte-1d131f4:hover{background-color:var(--app-icon-selected-color)}.setting-warpper.svelte-1d131f4 .icon-gear.svelte-1d131f4{--icon-bound:1.25rem}";
		append(document.head, style);
	}

	function create_fragment$d(ctx) {
		var div3, div0, t, div2, dispose;

		return {
			c() {
				div3 = element("div");
				div0 = element("div");
				t = space();
				div2 = element("div");
				div2.innerHTML = `<div class="icon icon-gear svelte-1d131f4"></div>`;
				div0.className = "icon user-avatar svelte-1d131f4";
				div2.className = "setting svelte-1d131f4";
				div3.className = "setting-warpper svelte-1d131f4";
				dispose = listen(div2, "click", showSetting);
			},

			m(target, anchor) {
				insert(target, div3, anchor);
				append(div3, div0);
				append(div3, t);
				append(div3, div2);
			},

			p: noop,
			i: noop,
			o: noop,

			d(detaching) {
				if (detaching) {
					detach(div3);
				}

				dispose();
			}
		};
	}

	function showSetting() {
	  new Setting({
	    target: document.querySelector('.app-mount')
	  });
	}

	function instance$c($$self, $$props, $$invalidate) {
		let { username } = $$props;

		$$self.$set = $$props => {
			if ('username' in $$props) $$invalidate('username', username = $$props.username);
		};

		return { username };
	}

	class UserInfo extends SvelteComponent {
		constructor(options) {
			super();
			if (!document.getElementById("svelte-1d131f4-style")) add_css$c();
			init(this, options, instance$c, create_fragment$d, safe_not_equal, ["username"]);
		}
	}

	/* src\screen\Home.svelte generated by Svelte v3.0.0 */

	function add_css$d() {
		var style = element("style");
		style.id = 'svelte-wr0yhm-style';
		style.textContent = ".app-container.svelte-wr0yhm{padding:var(--app-space);display:grid;grid-template-columns:60px 330px 3fr;background:var(--app-bg-color);color:var(--app-text-color)}.idk-how-to-name-this.svelte-wr0yhm{background:var(--app-first-sidebar-color);border-top-left-radius:var(--app-sidebar-border-radius);border-bottom-left-radius:var(--app-sidebar-border-radius)}aside.svelte-wr0yhm,main.svelte-wr0yhm{height:100%}aside.svelte-wr0yhm{background:var(--app-second-sidebar-color);position:relative}main.svelte-wr0yhm{overflow:hidden;margin-left:var(--app-space)}";
		append(document.head, style);
	}

	// (13:4) <SideBarSection name="you &#123; display: flex; &#125;">
	function create_default_slot$2(ctx) {
		var current;

		var sidebaritem = new SideBarItem({
			props: {
			name: "Playground",
			description: "Experimenting some feature",
			id: "playground",
			icon: "something",
			selected: true,
			notificationCount: "1"
		}
		});

		return {
			c() {
				sidebaritem.$$.fragment.c();
			},

			m(target, anchor) {
				mount_component(sidebaritem, target, anchor);
				current = true;
			},

			p: noop,

			i(local) {
				if (current) return;
				sidebaritem.$$.fragment.i(local);

				current = true;
			},

			o(local) {
				sidebaritem.$$.fragment.o(local);
				current = false;
			},

			d(detaching) {
				sidebaritem.$destroy(detaching);
			}
		};
	}

	function create_fragment$e(ctx) {
		var div, aside0, t0, aside1, t1, main, current;

		var userinfo = new UserInfo({ props: { username: "Amongious" } });

		var sidebarsection = new SideBarSection({
			props: {
			name: "you { display: flex; }",
			$$slots: { default: [create_default_slot$2] },
			$$scope: { ctx }
		}
		});

		var chatpage = new ChatPage({});

		return {
			c() {
				div = element("div");
				aside0 = element("aside");
				userinfo.$$.fragment.c();
				t0 = space();
				aside1 = element("aside");
				sidebarsection.$$.fragment.c();
				t1 = space();
				main = element("main");
				chatpage.$$.fragment.c();
				aside0.className = "idk-how-to-name-this svelte-wr0yhm";
				aside1.className = "svelte-wr0yhm";
				main.className = "svelte-wr0yhm";
				div.className = "app-container screen svelte-wr0yhm";
			},

			m(target, anchor) {
				insert(target, div, anchor);
				append(div, aside0);
				mount_component(userinfo, aside0, null);
				append(div, t0);
				append(div, aside1);
				mount_component(sidebarsection, aside1, null);
				append(div, t1);
				append(div, main);
				mount_component(chatpage, main, null);
				current = true;
			},

			p(changed, ctx) {
				var sidebarsection_changes = {};
				if (changed.$$scope) sidebarsection_changes.$$scope = { changed, ctx };
				sidebarsection.$set(sidebarsection_changes);
			},

			i(local) {
				if (current) return;
				userinfo.$$.fragment.i(local);

				sidebarsection.$$.fragment.i(local);

				chatpage.$$.fragment.i(local);

				current = true;
			},

			o(local) {
				userinfo.$$.fragment.o(local);
				sidebarsection.$$.fragment.o(local);
				chatpage.$$.fragment.o(local);
				current = false;
			},

			d(detaching) {
				if (detaching) {
					detach(div);
				}

				userinfo.$destroy();

				sidebarsection.$destroy();

				chatpage.$destroy();
			}
		};
	}

	class Home extends SvelteComponent {
		constructor(options) {
			super();
			if (!document.getElementById("svelte-wr0yhm-style")) add_css$d();
			init(this, options, null, create_fragment$e, safe_not_equal, []);
		}
	}

	/* src\App.svelte generated by Svelte v3.0.0 */

	// (24:0) {:else}
	function create_else_block$1(ctx) {
		var current;

		var loading = new Loading({ props: { done: ctx.doneLoading } });

		return {
			c() {
				loading.$$.fragment.c();
			},

			m(target, anchor) {
				mount_component(loading, target, anchor);
				current = true;
			},

			p(changed, ctx) {
				var loading_changes = {};
				if (changed.doneLoading) loading_changes.done = ctx.doneLoading;
				loading.$set(loading_changes);
			},

			i(local) {
				if (current) return;
				loading.$$.fragment.i(local);

				current = true;
			},

			o(local) {
				loading.$$.fragment.o(local);
				current = false;
			},

			d(detaching) {
				loading.$destroy(detaching);
			}
		};
	}

	// (22:0) {#if /*window.__app__.mode == 'test'*/ false}
	function create_if_block$3(ctx) {
		var current;

		var home = new Home({});

		return {
			c() {
				home.$$.fragment.c();
			},

			m(target, anchor) {
				mount_component(home, target, anchor);
				current = true;
			},

			p: noop,

			i(local) {
				if (current) return;
				home.$$.fragment.i(local);

				current = true;
			},

			o(local) {
				home.$$.fragment.o(local);
				current = false;
			},

			d(detaching) {
				home.$destroy(detaching);
			}
		};
	}

	function create_fragment$f(ctx) {
		var current_block_type_index, if_block, if_block_anchor, current;

		var if_block_creators = [
			create_if_block$3,
			create_else_block$1
		];

		var if_blocks = [];

		function select_block_type(ctx) {
			return 1;
		}

		current_block_type_index = select_block_type();
		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

		return {
			c() {
				if_block.c();
				if_block_anchor = empty();
			},

			m(target, anchor) {
				if_blocks[current_block_type_index].m(target, anchor);
				insert(target, if_block_anchor, anchor);
				current = true;
			},

			p(changed, ctx) {
				var previous_block_index = current_block_type_index;
				current_block_type_index = select_block_type();
				if (current_block_type_index === previous_block_index) {
					if_blocks[current_block_type_index].p(changed, ctx);
				} else {
					group_outros();
					on_outro(() => {
						if_blocks[previous_block_index].d(1);
						if_blocks[previous_block_index] = null;
					});
					if_block.o(1);
					check_outros();

					if_block = if_blocks[current_block_type_index];
					if (!if_block) {
						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
						if_block.c();
					}
					if_block.i(1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			},

			i(local) {
				if (current) return;
				if (if_block) if_block.i();
				current = true;
			},

			o(local) {
				if (if_block) if_block.o();
				current = false;
			},

			d(detaching) {
				if_blocks[current_block_type_index].d(detaching);

				if (detaching) {
					detach(if_block_anchor);
				}
			}
		};
	}

	function instance$d($$self, $$props, $$invalidate) {
		

	  let doneLoading = false;
	  async function start() {
	    await sleep(1000);
	    new Home({
	      target: document.querySelector('.app-mount')
	    });
	    await sleep(4000);
	    await sleep(500);
	    $$invalidate('doneLoading', doneLoading = true);
	  }

	  onMount(start);

		return { doneLoading };
	}

	class App extends SvelteComponent {
		constructor(options) {
			super();
			init(this, options, instance$d, create_fragment$f, safe_not_equal, []);
		}
	}

	logdown.start(`Starting this app... (v1.0.0 dev-build 5)
  .        ／＞　 フ
          | 　_　_| 
        ／\` ミ__^ノ 
       /　　　　 |
      /　 ヽ　　 ﾉ              ╱|、
     /　　 |　|　|            (˚ˎ 。7  
    ／￣|　　 |　|　|          |、˜〵          
    (￣ヽ＿_  ヽ_)__)         じしˍ,)ノ
    ＼二)
`);
	logdown.info('hello from space.JS! v1.0');
	const currentPage = location.pathname.split('/').pop().replace('.html', '');

	sessionStorage.setItem('user_id', `user-${makeid(10)}`);
	const app = new App({
		target: document.querySelector('.app-mount'),
	});

	console.log('user id:', sessionStorage.getItem('user_id'));
	logdown.info(`you\'re currently on "${currentPage}" page`);

	logdown.success('app mounted');

	return app;

}());
//# sourceMappingURL=bundle.js.map
