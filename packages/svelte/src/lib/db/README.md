# MongoDB Connection Setup

This directory contains the MongoDB connection utility using Mongoose.

## Usage

1. Create a `.env` file in the root of your Svelte project and add your MongoDB connection string:

```
MONGO_URI=mongodb://your-connection-string
```

2. Import and use the connection utility in your server-side code (e.g., +page.server.ts):

```typescript
import { connectDB } from '$lib/db/mongoose';

// Connect to MongoDB
await connectDB();
```

The connection utility handles:

- Single connection instance (prevents multiple connections)
- Connection error handling
- Proper cleanup on app termination
- TypeScript support

Note: Remember to add your `.env` file to `.gitignore` to keep your database credentials secure.
