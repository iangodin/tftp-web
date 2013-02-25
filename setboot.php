<?php

$name = $_POST["name"];
$method = $_POST["method"];

exec( "/usr/bin/bootmgr methods", $methods );
exec( "/usr/bin/bootmgr " . $method . " " . $name, $output, $retval );

if( $retval == 0 )
{
	header( "Status: 201 Created" );

	foreach ( $output as $line )
	{
		list( $ip, $name, $method ) = explode( "\t", $line, 3 );
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
}
else
{
	echo "Error: " . implode( "\n", $output );
}

?>
