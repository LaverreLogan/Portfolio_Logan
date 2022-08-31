<?php
class Env
{
	protected static ?array $variables = null;

	protected static function read()
	{
		if (is_array(self::$variables)) {
			return;
		}

		try {
			$file = @file_get_contents('.env');

			if (false === $file) {
				throw new \InvalidArgumentException("The env file does not exists or is not readable");
			}
		} catch (\Exception $e) {
			throw new \Exception($e->getMessage());
		}

		$variables = [];

		preg_match_all('/([A-Z0-9\_]+)=(.*)?\n?/iu', $file, $variables);
		
		foreach ($variables[1] as $index => $value) {
			self::$variables[$value] = $variables[2][$index];
		}
	}

	public static function all(): array
	{
		self::read();

		return self::$variables;
	}

	public static function has(string $key): bool
	{
		self::read();

		return array_key_exists($key, self::$variables);
	}

	public static function get(string $key, mixed $default = null): mixed
	{
		self::read();

		return self::has($key) ? self::$variables[$key] : $default;
	}
}
