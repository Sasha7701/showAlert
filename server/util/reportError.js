export default function reportError(err, req) {
	if (process.env.DEBUG) {
		const prefix = req ? `Error at ${req.originalUrl}:` : `Error during request:`;
		console.error(prefix, err);
	}
}
