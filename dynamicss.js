;( function( root, document, undefined ) {
	var dynamicStylesheet = (function() {
		// Can be used with:
		// dynamicStylesheet.addRule('.map-type-2 .maplese-svg-666666', 'fill: #666');

		// Create the <style> tag
		var style = document.createElement("style");

		// WebKit hack :(
		style.appendChild(document.createTextNode(""));

		// Add the <style> element to the page
		document.head.appendChild(style);

		return style.sheet;
	})();

	var dynamicCssModule = {};

	// it does not add additional cssRules for the same selector,
	// instead it appends the rules to the existing one, and it returns the resulting cssRule.
	dynamicCssModule.addCssRule = function( selector, rules ){
		//Backward searching of the selector matching cssRules
		var index = dynamicStylesheet.cssRules.length === 0 ? 0 : dynamicStylesheet.cssRules.length - 1;

		for( var i = index; i > 0; i-- ) {
			var current_style = dynamicStylesheet.cssRules[ i ];

			if( current_style.selectorText === selector ) {
			//Append the new rules to the current content of the cssRule;
			rules = current_style.style.cssText + rules;
			dynamicStylesheet.deleteRule( i );
			index = i;
			}
		}

		if( dynamicStylesheet.insertRule ){
			dynamicStylesheet.insertRule( selector + "{" + rules + "}", index );
		}
		else{
			dynamicStylesheet.addRule( selector, rules, index );
		}

		return dynamicStylesheet.cssRules[ index ].cssText;
	};

	root.dynamiCss = dynamicCssModule;
})( window, document );
