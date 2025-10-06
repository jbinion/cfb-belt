export function serialize<T extends Record<string, any>>(doc: T): any {
	if (!doc) return doc;
	return JSON.parse(
		JSON.stringify(doc, (key, value) => {
			if (value instanceof Date) return value.toISOString();
			if (typeof value === 'object' && value?._bsontype === 'ObjectID') {
				return value.toString();
			}
			return value;
		})
	);
}
