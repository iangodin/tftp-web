
<div class='row-fluid'>
    <div class='input-prepend span6'>
      <button class='btn' data-toggle='tooltip' title='Clear filter' onclick='$("#host_filter").val(""); filterTable( $("#host_filter")[0], $("#host_table")[0] );'><i class='icon-filter'></i></button>
      <input id='host_filter' class='filter' type='text' placeholder='Filter' onkeyup='filterTable(this,$("#host_table")[0])'>
    </div>
	<div class='span6'>
		<button class='btn btn-primary pull-right' onclick='addHost()'><i class='icon-plus'></i> Add Host</button>
	</div>
</div>

<div class='row-fluid '>
	<div class='span4'><strong>IP Address</strong></div>
	<div class='span4'><strong>DNS Address</strong></div>
	<div class='span4'><strong>Boot Method</strong></div>
</div>
<hr>

<div id='host_table' class='table filterable'>

<?php

exec( "bootmgr methods", $methods );

exec( "bootmgr list", $hosts );

foreach ( $hosts as $host )
{
	list( $ip, $name, $method ) = explode( "\t", $host, 3 );
	echo "<div><div class='row-fluid'>";
		echo "<div class='span4'>" . $ip . "</div>";
		echo "<div class='span4'>" . $name . "</div>";
		echo "<div class='span4'>";
			echo "<div class='btn-group btn-block'>";
				echo "<button class='btn dropdown-toggle btn-block' data-toggle='dropdown'>";
					echo "<span class='btn-left'>" . $method . "</span>";
					echo "<span class='caret btn-right'></span>";
				echo "</button>";
				echo "<ul class='dropdown-menu' role='menu'>";
				foreach ( $methods as $m )
				{
					echo "<li><a onclick='setBoot( this, \"" . $name . "\", \"" . $m . "\" )' href='#'>$m</a></li>";
				}
				echo "</ul>";
			echo "</div>";
		echo "</div>";
	echo "</div><hr></div>";
}

?>

</div>

<div id="new_host" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="hostEditorLabel" aria-hidden="true">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
		<h3 id="hostEditorLabel">Host Boot Method</h3>
	</div>
	<div class="modal-body">
		<form id="host_form" class="form-horizontal">
			<input id="host_orig" type="hidden" name="original">
			<div class="control-group">
				<label class="control-label" for="name">Host name</label>
				<div class="controls"><input id="host_name" type="text" name="name" placeholder="Host name"></div>
			</div>
			<div class="control-group">
				<label class="control-label" for="method">Boot method</label>
				<div class="controls">
					<div id="host_method" class="btn-group btn-group-vertical" data-toggle="buttons-radio">
<?php
	foreach ( $methods as $m )
	{
		if ( $m == "default" )
			echo "<a class='btn active' href='#'>$m</a>";
		else
			echo "<a class='btn' href='#'>$m</a>";
	}
?>
					</div>
				</div>
			</div>
		</form>
	</div>
	<div class="modal-footer">
		<button class="btn" data-dismiss="modal" aria-hidden="true">Cancel</button>
		<button id="host_save" class="btn btn-primary">Save changes</button>
	</div>
</div>
