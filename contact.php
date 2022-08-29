<?php

	/**
	 * Variables
	 */

	$email = 'laverrelogan@gmail.com';

	$keys = [
		'name' => 'Nom',
		'email' => 'E-mail',
		'message' => 'Message',
	];
	define('SITE_KEY', '6Lfb4KQhAAAAAPi5jACDfRncMywjZHqIqnEzJLQD');
	define('SECRET_KEY', '6Lfb4KQhAAAAACIo7h7JDfgO4PtrxEgoxt8iifPP');
	/**
	 * Functions
	 */

	function isFormSubmited($keys) {
		// foreach ($keys as $key) {
			// if (empty($_POST[$key])) {
			// 	return false;
			// }
		// }
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

	if (isFormSubmited($keys)) {
		$contact = postData($keys);
		
		saveContact($_POST);
		try {
			sendEmail($email, $contact);
		} catch (\Exception $e) 
		{ unset($e); }



		header('Location: /#page5');
		exit;
	}

	if(isset($_POST['g-recaptcha-response'])) {
		$captcha = $_POST['g-recaptca-response'];
	} else {
		$captcha = false;
	}

	if (!$captcha) {
		echo "<script>alert \"Error in captcha\"</script>";
	} else {
		$secret = "6Lfb4KQhAAAAACIo7h7JDfgO4PtrxEgoxt8iifPP";
		$response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=" . $secret . "&response=" . $captcha . "&remoteip=" . $_SERVER['REMOTE_ADDR']);
		$response = json_decode($response);
		if ($response->succes === false) {
			echo "<script>alert \"Error in response\"</script>";
		}
	}
	if ($response->success==true && $response->score <= 0.5) {
		echo "<script>alert \"Robot\"</script>";
	}
