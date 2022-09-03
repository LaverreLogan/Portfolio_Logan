<?php
	require 'utils.php';
	header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
    header("Cache-Control: post-check=0, pre-check=0", false);
    header("Pragma: no-cache");
	/**
	 * Variables
	 */
	
	$email = Env::get("EMAIL_FROM");
	$keys = [
		'name' => 'Nom',
		'email' => 'E-mail',
		'message' => 'Message',
	];
	$secret = Env::get('RECAPTCHA_SECRET');

	/**
	 * Functions
	 */

	function isFormSubmited($keys) {
		foreach ($keys as $key => $value) {
			if (empty($_POST[$key])) {
				return false;
			}
		}
		return true;
	}

	function postData($keys) {
		$data = [];

		foreach ($keys as $key => $label) {
			$data[$label] = $_POST[$key];
		}

		return $data;
	}

	function sendEmail($email, $data) {
		$content = "Bonjour,\r\nTu as reçu un nouveau message depuis le site laverre-logan.com.\r\n";

		foreach ($data as $label => $value) {
			$content .= $label .":". wordwrap($value, 70). "\r\n";
		}

		return mail(htmlentities($email, ENT_QUOTES, 'UTF-8'), 'Nouveau contact', htmlentities($content, ENT_QUOTES, 'UTF-8'));
	}

	function saveContact($data) {
		$date = date('Y/m/d H:i');
		$content = <<<CONTENT
	[$date]: {$data['name']} <{$data['email']}>
	{$data['message']}\n
	CONTENT;

		return file_put_contents('contacts.log', $content, FILE_APPEND);
	}

	/**
	 * Formulaire de contact
	 */

	// if (isFormSubmited($keys)) {
	// 	if (check_token()) {
	// 		$contact = postData($keys);
			
	// 		saveContact($_POST);
	// 		try {
	// 			sendEmail($email, $contact);
	// 		} catch (\Exception $e) 
	// 		{ unset($e); }
	// 	}
	// 	header('Location: /#page5');
	// 	exit;
	// }

	function check_token($token, $secret) {
		$url_verif = "https://www.google.com/recaptcha/api/siteverify?secret=$secret&response=$token";
		$curl = curl_init($url_verif);
		curl_setopt($curl, CURLOPT_HEADER, false);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		$verif_response = curl_exec($curl);

		if (empty($verif_response)) return false;
		else {
			$json_response = json_decode($verif_response);
			return $json_response->success;
		}
	}

	if (isFormSubmited($keys)) {
		if (check_token($_POST['g-recaptcha-response'], $secret)) {
			echo "<script>
			window.location.replace('https://www.laverre-logan.com/#page5');
			</script>";
			$contact = postData($keys);
			saveContact($_POST);
			try {
				sendEmail($email, $contact);
			} catch (\Exception $e) 
			{ unset($e); }
		}else {
			echo "Formulaire non traité";
			echo "<script>window.location.replace('https://www.laverre-logan.com');</script>";
		}
	}
	// function checkRecaptcha() {
		// if(isset($_POST['g-recaptcha-response'])) {
		// 	$captcha = $_POST['g-recaptca-response'];
		// } else {
		// 	return false;
		// }
		// $secret = Env::get('RECAPTCHA_SECRET');
		// $response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".$secret."&response=".$captcha);
		// $response = json_decode($response, true);
		// if (!$response['success'] == false) {
		// 	echo "<script>console.log('false')</script>";
		// } else {
		// 	return true;
		// }
	// }


