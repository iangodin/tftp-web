/*
 * A very simple script to filter a table according to search criteria
 *
 * http://leparlement.org/filterTable
 * See also http://www.vonloesch.de/node/23
 */
function filterTable(term, table) {
	dehighlight(table);

	var terms = term.value.toLowerCase().split(" ");
	for (var r = 0; r < table.children.length; r++) {
		var display = '';
		for (var i = 0; i < terms.length; i++) {
			if ( ! highlight( terms[i], table.children[r] ) ) {
				display = 'none';
			}
			table.children[r].style.display = display;
		}
	}
}


/*
 * Transform back each
 * <span>preText <span class="highlighted">term</span> postText</span>
 * into its original
 * preText term postText
 */
function dehighlight(container) {
	for (var i = 0; i < container.childNodes.length; i++) {
		var node = container.childNodes[i];

		if (node.attributes && node.attributes['class'] && node.attributes['class'].value == 'highlighted') {
			node.parentNode.parentNode.replaceChild( document.createTextNode( node.parentNode.innerHTML.replace(/<[^>]+>/g, "")), node.parentNode);
			// Stop here and process next parent
			return;
		} else if (node.nodeType != 3) {
			// Keep going onto other elements
			dehighlight(node);
		}
	}
}

/*
 * Create a
 * <span>preText <span class="highlighted">term</span> postText</span>
 * around each search term
 */
function highlight(term, container) {
	if ( term.length == 0 )
		return true;

	var found = false;
	for (var i = 0; i < container.childNodes.length; i++) {
		var node = container.childNodes[i];
		if ( node.nodeName == "BUTTON" ) {
			continue;
		}

		if (node.nodeType == 3) {
			// Text node
			var data = node.data;
			var data_low = data.toLowerCase();
			if (data_low.indexOf(term) >= 0) {
				//term found!
				found = true;
				var new_node = document.createElement('span');

				node.parentNode.replaceChild(new_node, node);

				var result;
				while ((result = data_low.indexOf(term)) != -1) {
					new_node.appendChild(document.createTextNode(
								data.substr(0, result)));
					new_node.appendChild(create_node(
								document.createTextNode(data.substr(
										result, term.length))));
					data = data.substr(result + term.length);
					data_low = data_low.substr(result + term.length);
				}
				new_node.appendChild(document.createTextNode(data));
			}
		} else {
			// Keep going onto other elements
			if ( highlight(term, node) )
				found = true;
		}
	}

	return found;
}

function create_node(child) {
	var node = document.createElement('span');
	node.setAttribute('class', 'highlighted');
	node.attributes['class'].value = 'highlighted';
	node.appendChild(child);
	return node;
}

