import { Component} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-allscripts',
  templateUrl: './allscripts.component.html',
  styleUrls: ['./allscripts.component.scss']
})


export class AllscriptsComponent {
    constructor(private snackBar: MatSnackBar)
    { }
  code = `
<?php
if(isset($_SERVER['HTTP_HOST'])) {
    $current_domain = $_SERVER['HTTP_HOST'];
} else {
}
$domarray = explode('.', $current_domain);
if(isset($domarray[2])){
  $domain_path = $domarray[0] . '_' . $domarray[1]. '_' .$domarray[2];
}else{
  $domain_path = $domarray[0] . '_' . $domarray[1];
}
$file_path = 'preference/'.$domain_path.'.txt';
$file_contents = file_get_contents($file_path);
if ($file_contents !== false) {
    $data = json_decode($file_contents, true);
    if ($data !== null) {
       $sub_e = $data['preference']['sub1'];
    } else {
    }
} else {
}
if (isset($data['preference']['redirect']) && $data['preference']['redirect'] !== false){
  $rediofferlink = $data['preference']['link'];
  }else{
session_start();
if (isset($_GET["e"])){
  $_SESSION["e"] = $_GET["e"];
$encodesource = $_SESSION["e"];
}else{
    $encodesource = $sub_e;
}
function base64url_decode($data) {
  return base64_decode(str_pad(strtr($data, '-_', '+/'), strlen($data) % 4, '=', STR_PAD_RIGHT));
}
$debaseutm =  base64url_decode($encodesource);
$dataToDecrypt = $debaseutm;
$cypherMethod = 'AES-256-CBC';
$key = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
$iv = 'Sirius1Sirius134';
$decryptedData = openssl_decrypt($dataToDecrypt, $cypherMethod, $key, $options=0, $iv);
$subarray = explode(' ', $decryptedData);
}
?>

//form hidden inputs
<input type="hidden" name="x" id="x" value="<?=$subarray[0]?>">
<input type="hidden" name="b" id="b" value="<?=$subarray[1]?>">
<input type="hidden" name="t" id="t" value="<?=$subarray[2]?>">

//PA_Idealica_ElPais lost
`
  jsoncode = `
  {
  "domain": "example.com",
    "preference":     {
      "redirect": false,
      "sub1": "NElTSEZLZkF3cERwZX...",
      "link": "",
      "offer": "",
      "offerimg": "",
      "price": ""
    }
  }
`

}
