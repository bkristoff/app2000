<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>APP2000</title>
</head>

<body>

    <h1>Velkommen til Ekko (en lat webtjener)</h1>
	
    <?php

    echo "<p>Du sendte meg følgende forespørsel:</p>";
	echo "<pre>";
    print_r($_REQUEST);
	echo "</pre>";
    
    ?>

</body>

</html>