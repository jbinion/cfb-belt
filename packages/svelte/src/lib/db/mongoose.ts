import { connectDB } from 'models';
import { MONGO_URI } from '$env/static/private';

export async function connect() {
	try {
		await connectDB(MONGO_URI);
	} catch (error) {
		console.error('MongoDB connection error:', error);
		throw error;
	}
}
