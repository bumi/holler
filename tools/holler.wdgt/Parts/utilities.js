// This file was generated by Dashcode from Apple Inc.
// DO NOT EDIT - This file is maintained by Dashcode.

//
// getLocalizedString(string)
// Pulls a string out an array named localizedStrings.  Each language project directory in this widget
// contains a file named "localizedStrings.js", which, in turn, contains an array called localizedStrings.
// This method queries the array of the file of whichever language has highest precedence, according to
// your preference set in the language toolbar item
//
// string: the key to the array
//
function getLocalizedString(string)
{
	try { string = localizedStrings[string] || string; } catch (e) {}
	return string;
}

//
// createInstancePreferenceKey(key)
// Returns a unique preference key that is based on a instance of an opened widget.
// The returned value can then be used in widget.setPreferenceForKey()
// and widget.preferenceForKey() so that the value that is set or retrieved is
// only for a particular opened widget.
//
// key: preference key
//
function createInstancePreferenceKey(key)
{
	return widget.identifier + "-" + key;
}

//
// getElementHeight(mainElement)
// Get the height of a part even if it's hidden (by 'display: none').
//
// mainElement: Part element
//
function getElementHeight(mainElement)
{
	var height = mainElement.offsetHeight;
	
	if (!height || height == 0) {
		height = getElementSize(mainElement).height;
	}
	
	return height;	
}

//
// getElementWidth(mainElement)
// Get the width of a part even if it's hidden (by 'display: none').
//
// mainElement: Part element
//
function getElementWidth(mainElement)
{
	var width = mainElement.offsetWidth;
	
	if (!width || width == 0) {
		width = getElementSize(mainElement).width;
	}
	
	return width;	
}

//
// getElementSize(mainElement)
// Get the size of a part even if it's hidden (by 'display: none').
//
// mainElement: Part element
//
function getElementSize(mainElement)
{
	var width = mainElement.offsetWidth;
	var height = mainElement.offsetHeight;

	if (!width || width == 0 || !height || height == 0) {
		var displayNoneElements = new Array();

		var parentNode = mainElement;
		while (parentNode && (parentNode != document)) {
			var displayValue;
			var style = document.defaultView.getComputedStyle(parentNode, null);
			if (style) {
				displayValue = style.getPropertyValue("display");
			} else {
				// for Tiger
				displayValue = parentNode.style.display;
			}

			if (displayValue != "block") {
				displayNoneElements.push({node:parentNode, display:parentNode.style.display});
				parentNode.style.display = "block";
			}
			parentNode = parentNode.parentNode;
		}

		if (!width || width == 0) width = mainElement.offsetWidth;
		if (!height || height == 0) height = mainElement.offsetHeight;

		for (var i=0; i<displayNoneElements.length; i++) {
			var element = displayNoneElements[i].node;
			element.style.display = displayNoneElements[i].display;
			// clean up
			if (element.getAttribute("style") == "") {
				element.removeAttribute("style");
			}
		}
	}

	return {width:width, height:height};
}
