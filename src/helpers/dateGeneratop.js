export function dateGenerator(dateString) {
	return dateString
		.split('/')
		.map((chunk) => chunk.padStart(2, '0'))
		.join('.');
}
