import { connectDB } from 'models';
import { MONGO_URI } from '$env/static/private';

let connected = false;

export async function connect() {
	try {
		if (connected) return;
		await connectDB(MONGO_URI);
		connected = true;
	} catch (error) {
		console.error('MongoDB connection error:', error);
		throw error;
	}
}
