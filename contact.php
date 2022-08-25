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
		foreach ($keys as $key) {
			if (empty($_POST[$key])) {
				header('Location: /#page5');
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

	function sendEmail($to_email, $data) {
		$content = "Bonjour,\r\ntu as reçu un nouveau contact depuis le site laverre-logan.com.\r\n";

		foreach ($data as $label => $value) {
			$content .= $label . "\r\n";
			$content .= wordwrap($value, 70, "\r\n");
			$content .= "\r\n";
		}

		return mail($to_email, 'Nouveau contact', $content);
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

	if($_POST) {
		function getCaptcha($secretKey) {
			$response = file_get_contents("https://www.google.com.recaptcha/api/siteverify?secret=".SECRET_KEY."&response={$secretKey}");
			$jsonResponse = json_decode($response);
			return $jsonResponse;
		}
		$captcha = getCaptcha($_Post['g-recaptcha-response']);
	}