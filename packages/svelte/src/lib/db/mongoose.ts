import mongoose from 'mongoose';
import { MONGO_URI } from '$env/static/private';

let isConnected = false;

export async function connectDB() {
	if (isConnected) {
		return;
	}

	try {
		await mongoose.connect(MONGO_URI);
		isConnected = true;
		console.log('MongoDB connected successfully');
	} catch (error) {
		console.error('MongoDB connection error:', error);
		throw error;
	}
}

export function disconnectDB() {
	if (!isConnected) {
		return;
	}

	return mongoose.disconnect();
}

// Ensure proper cleanup on app termination
process.on('SIGTERM', async () => {
	if (isConnected) {
		await disconnectDB();
	}
});
