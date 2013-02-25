
(function($) {
	$.fn.spin = function(opts, color) {
		var presets = {
			"tiny": { lines: 8, length: 2, width: 2, radius: 3 },
			"small": { lines: 8, length: 4, width: 3, radius: 5 },
			"large": { lines: 10, length: 8, width: 4, radius: 8 }
		};
		if (Spinner) {
			return this.each(function() {
				var $this = $(this),
					data = $this.data();
				
				if (data.spinner) {
					data.spinner.stop();
					delete data.spinner;
				}
				if (opts !== false) {
					if (typeof opts === "string") {
						if (opts in presets) {
							opts = presets[opts];
						} else {
							opts = {};
						}
						if (color) {
							opts.color = color;
						}
					}
					data.spinner = new Spinner($.extend({color: $this.css('color')}, opts)).spin(this);
				}
			});
		} else {
			throw "Spinner class not available.";
		}
	};
})(jQuery);

function loadedHosts( responseText, textStatus, request )
{
	var page = $("#hosts");
	if ( page.children().length == 0 )
		page.append( '<div class="alert alert-error"><i class="icon-warning-sign"></i> Could not load list of hosts</div>' );
	updateUI();
};

window.onload = function() {
	$("#spinner-holder").spin("small", "#fff" );
	updateUI();
	$("#hosts").load( "hosts.php", loadedHosts );
};

function setBoot( choice, name, method ) {
	var btn = choice.parentNode.parentNode.previousSibling;
	var data = {
		name: name,
		method: method
	}
	$.post( "setboot.php", data, function(data,status,xhr) {
		if ( xhr.status != 201 )
			$('.notifications').notify( { type: 'error', fadeOut: { enabled: false }, message: { text: "Error " + name + ": " + data } } ).show();
		else
		{
			$('.notifications').notify( { type: 'success', fadeOut: { enabled: true, delay: 10000 }, message: { text: "Boot method changed for " + name } } ).show();
			$(btn).contents().first()[0].textContent = method + " ";
		}
	} );
};

function updateUI()
{
	$(".dnsname").tooltip();
	$(".prettydate").tooltip();
	var hpage = $("#hosts")[0];
	if ( hpage.children.length > 0 )
		$("#spinner-holder").data('spinner').stop() 
};

function addHost() {
	$("#host_name").val( "" );
//	$("#host_method").text( "default" );
	$("#host_save").attr('onclick','').unbind('click');
	$("#host_save").click( function() { saveBoot(); } );
	$("#new_host").modal( 'show' );
}

function saveBoot() {
	$("#new_host").modal( 'hide' );
	var m = "default"
	var choices = $("#host_method").children( "a" );
	for ( var i = 0; i < choices.length; i++ ) {
		var n = choices[i];
		if ( n.className.indexOf( "active" ) != -1 )
			m = n.textContent;
	}

	var data = {
		name: $("#host_name").val(),
		method: m
	}
	$.post( "setboot.php", data, function(data,status,xhr) {
		if ( xhr.status != 201 )
			$('.notifications').notify( { type: 'error', fadeOut: { enabled: false }, message: { text: data } } ).show();
		else
		{
			$('.notifications').notify( { type: 'success', fadeOut: { enabled: true, delay: 10000 }, message: { text: "Host added" } } ).show();
			$('#host_table').append( data );
		}
	} );
};
