function env(key: string, fallback?: string): string {
	const value = process.env[key];
	if (value !== undefined) {
		return value;
	} else if (fallback !== undefined) {
		return fallback;
	} else {
		throw new Error(`missing environment variable: "${key}"`);
	}
}

export default env;
