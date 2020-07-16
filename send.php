<?php // API access key from Google API's Console
define( 'API_ACCESS_KEY', 'AAAAtq3RLGo:APA91bEA-Mi4gAIRcqqvAjHCk7qVhF1SqGy49gmAJIIm2q6gP6gOduqKF0uszenArANTJpkb3SkobM6kS3PkYv0RGUZhxrCaWND1H0LfQx7UJQXzoy5AK9mabfUXRM4sDbrDCwAwRwoy' );

$to =  $_GET['id'] ?? "dSpv2LVG-S_TeW6LJ9dEJR:APA91bHq_grA6Y6b0C1VULqQ5Jr3IsQJ_Qtk4N5hl2B_82g44TW8CQ_1J65tYm0dTrnY-7T9bWSxQkiR5QPZ59OgA3cn7-MMDw5XoU-9cQO3FJjKcRcf6CZ0ZaNCvGS7WxA-nbbqwMkw";


// prep the bundle
$msg = array
(
	'title'		=> 'This is a title. title',
	'body'	=> 'This is a subtitle. subtitle',
	'vibrate'	=> 1,
	'sound'		=> 1,
);

$fields = array
(
	'to' 	=> $to,
	'notification'			=> $msg
);
 
$headers = array
(
	'Authorization: key=' . API_ACCESS_KEY,
	'Content-Type: application/json'
);


$ch = curl_init();
curl_setopt( $ch,CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send' );
curl_setopt( $ch,CURLOPT_POST, true );
curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode( $fields ) );
$result = curl_exec($ch );
curl_close( $ch );
echo json_encode( $fields )."<br>";
echo $result;