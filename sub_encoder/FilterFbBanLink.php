<?php
$keitaroAddress="http://<TRACKER_DOMAINorIP>";
$keitaroApiKey="<TRACKER_API_KEY>";
$fbApiToken="<FACEBOOK_ACCESS_TOKEN>";


$keitaroAddress.="/admin_api/v1/";

$ch=curl_init();
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_URL, $keitaroAddress."domains");
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Api-Key: '.$keitaroApiKey));
$res=curl_exec($ch);
$domains=json_decode($res,false);
echo "Found ".count($domains)." domains to check. Starting...\n";
curl_close($ch);

$banned=array();
$startIndex=(count($argv)==2?$argv[1]:0); //You can use cmd param to start from some domain that you want
for ($i=$startIndex;$i<count($domains);$i++) {
    $d=$domains[$i];
    echo "Checking #{$i}: ".$d->name."... ";
    $isBanned=check_if_banned($d->name,$fbApiToken);
    if ($isBanned){
        $banned[$d->id]=$d->name;
        echo "BANNED!\n";
    }
    else echo "OK\n";
}
if (count($banned)==0){
    echo "Great, you don't have any banned domains! Good luck)";
    exit;
}
echo "We have ".count($banned)." banned domains. Deleting...\n";
/*foreach ($banned as $bid=>$bname) {
    echo "Deleting ".$bname."...";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $keitaroAddress."domains/".$bid);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Api-Key: '.$keitaroApiKey));
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
    $result = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    if ($httpCode==200) echo "OK\n";
    else echo "ERROR:".$httpCode."\n";
}*/

echo "Cleaned all banned domains! Return when there will be some more...\n";
echo "And don't forget to donate: https://t.me/yellowwebdonate_bot";


function check_if_banned($dn,$token):bool
{
    $dn="http://{$dn}";
    $fb="https://graph.facebook.com/v12.0";
    $params=[
        "scrape"=>"true",
        "id"=>$dn,
        "access_token"=>$token,
        "locale"=>"en_US"
    ];
    $res=post($fb,$params);
    file_put_contents(__DIR__."/kdelbanned.log", $res["resp"],FILE_APPEND); //for debugging
    $json=json_decode($res["resp"],true);
    if (isset($json["error"])) {
        if ($json["error"]["code"]==368 && strpos($json["error"]["message"],"disallowed")!==false) return true;
        if ($json["error"]["code"]==100) return false;
        echo $res["resp"];
        exit;
    }
    if (strpos($res["resp"], "Error validating access token")!==false){
        echo "INVALID FACEBOOK ACCESS TOKEN!!!";
        exit;
    }
    return false;
}

function post($url,$postfields){
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => false,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_POSTFIELDS => http_build_query($postfields),
        CURLOPT_USERAGENT=>'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/84.0.4147.89 Safari/537.36'
    ));

    $content = curl_exec($curl);
    $info = curl_getinfo($curl);
    $error= curl_error($curl);
    curl_close($curl);
    return ["resp"=>$content,"info"=>$info,"error"=>$error];
}
