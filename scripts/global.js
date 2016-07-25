


// Feature Detection:
(function(doc) {
	var html = doc.documentElement,
	bool;
	html.className = 'js';

	function addClass(condition, ref) {
		html.className += ' ' + (condition ? ref : 'no-' + ref);
	}

	ok = {
		// HTML:
			attr: function(attr, element, ref) {
				ref = ref || attr;
				addClass(bool = attr in doc.createElement(element || 'div'), ref);
				return bool;
			},

		// CSS:
			prop: function(prop) {
				addClass(bool = prop in doc.body.style, prop);
				return bool;
			},

			value: function(prop, value, ref) {
				var el = doc.createElement('div');
				el.style[prop] = value;
				addClass(bool = !!el.style[prop], ref);
				return bool;
			},

			// Careful with Pseudo elements! Webkit browsers think they support ::bogus-pseudo-elements with double colon notation.
			selector: function(selector, ref) {
				var el = doc.createElement('div');
				el.innerHTML = ['&shy;', '<style>', selector, '{}', '</style>'].join('');
				el = doc.body.appendChild(el);
				var style = el.getElementsByTagName('style')[0];
				var bool = !!( style.sheet ? (style.sheet.rules || style.sheet.cssRules)[0] : style.styleSheet.rules.length );
				addClass(bool, ref);
				doc.body.removeChild(el);
				return bool;
			}
	};

})(document);


ok.selector(':nth-child(3n+3)', 'nth-child');
ok.value('width', '1vw', 'vw');
ok.value('width', '1vmin', 'vmin');
