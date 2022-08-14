<?php
$pix = $_POST['pix'];
$name = $_POST['name'];
$camp = $_POST['camp'];
$utmsource = [$pix, $name, $camp];
$str = implode(" ", $utmsource);
$textToEncrypt = $str;
$encryptionMethod = "AES-256-CBC";
$secret = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
$iv = 'Sirius1Sirius134';

$encryptedMessage = openssl_encrypt($textToEncrypt, $encryptionMethod, $secret,0,$iv);
function base64url_encode($data) {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}
$enbaseutm =  base64url_encode($encryptedMessage);

echo $enbaseutm;
/*Decrypt Data*/
/*
 $decryptedMessage = openssl_decrypt($encryptedMessage, $encryptionMethod, $secret,0,$iv);
function base64url_decode($data) {
  return base64_decode(str_pad(strtr($data, '-_', '+/'), strlen($data) % 4, '=', STR_PAD_RIGHT));
}*/
/*Decrypt Data*/



