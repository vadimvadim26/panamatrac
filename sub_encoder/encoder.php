<?php

if (isset($_POST['link']) | isset($_POST['pix']) | isset($_POST['name']) | isset($_POST['camp'])) {
    $link =  $_POST['link'];
    $pix = $_POST['pix'];
    $name = $_POST['name'];
    $camp = $_POST['camp'];
    $sub = '/?e=';


$utmsource = [$pix, $name, $camp];
$str = implode(" ", $utmsource);

$dataToEncrypt = $str;
$cypherMethod = 'AES-256-CBC';
$key = 'Sirius1Sirius1553';
$iv = 'Sirius1Sirius134';

$encryptedData = openssl_encrypt($dataToEncrypt, $cypherMethod, $key, $options=0, $iv);


function base64url_encode($data) {
  return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

/*function base64url_decode($data) {
  return base64_decode(str_pad(strtr($data, '-_', '+/'), strlen($data) % 4, '=', STR_PAD_RIGHT));
}*/

$enbaseutm =  base64url_encode($encryptedData);

/*$debaseutm =  base64url_decode($enbaseutm);*/

$arrlink = [$link, $sub, $enbaseutm];

$readylink = implode("", $arrlink);

echo $readylink;
}

else if(!isset($_POST['link']) | !isset($_POST['pix']) | !isset($_POST['name']) | !isset($_POST['camp'])){
    $errmessage = 'Заполните все поля правильно';
    echo $errmessage;
}
?>