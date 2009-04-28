/**
 * document.createElement convenience wrapper
 *
 * The data parameter is an object that must have the "tag" key, containing
 * a string with the tagname of the element to create.  It can optionally have
 * a "children" key which can be: a string, "data" object, or an array of "data"
 * objects to append to this element as children.  Any other key is taken as an
 * attribute to be applied to this tag.
 *
 * Release homepage:
 * http://www.arantius.com/article/dollar+e
 *
 * Available under an MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @param {Object} data The data representing the element to create
 * @return {Element} The element created.
 */
function $E(data) {
	var el;

	if ('string'==typeof data) {
		el=document.createTextNode(data);
	}else if(data.nodeType){
	  el = data;
	}else {
		//create the element
		el=document.createElement(data.tag);
		delete(data.tag);

		//append the children
		if ('undefined'!=typeof data.children) {
			if ('string'==typeof data.children ||
				'undefined'==typeof data.children.length
			) {
				//strings and single elements
				el.appendChild($E(data.children));
			} else {
				//arrays of elements
				for (var i=0, child=null; 'undefined'!=typeof (child=data.children[i]); i++) {
					el.appendChild($E(child));
				}
			}
			delete(data.children);
		}

		//any other data is attributes
		for (attr in data) {
			el[attr]=data[attr];
		}
	}

	return el;
}
