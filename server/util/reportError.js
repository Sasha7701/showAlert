export default function reportError(err, req) {
	const prefix = req ? `Error at ${req.originalUrl}:` : `Error during request:`;
	console.error(prefix, err);
}
