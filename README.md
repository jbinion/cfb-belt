# CFB Belt

Tracking the College Football Belt with Svelte and Mongoose.

## Project Structure

- **packages/data**  
  Scripts and utilities to fetch, process, and calculate the college football lineal championship lineage

- **packages/svelte**  
  The Svelte app that displays the results

## Data Source

All data is sourced from the excellent [CollegeFootballData.com](https://collegefootballdata.com/).

## Live Website

Check out the live site: [cfb-belt.com](https://cfb-belt.com)

## Getting Started

1. **Clone the repository:**

   ```sh
   git clone https://github.com/jbinion/cfb_belt.git
   cd cfb_belt
   ```

2. **Set up environment variables:**

   Create `.env` files in both `packages/data` and `packages/svelte` by copying the provided `.env.example` files:

   ```sh
   cp packages/data/.env.example packages/data/.env
   cp packages/svelte/.env.example packages/svelte/.env
   ```

   Then, edit these `.env` files to add your API key and your MongoDB connection URI

3. **Install dependencies & build models:**

   ```sh
   pnpm install
   cd packages/models && npm run build
   ```

4. **Run the data scripts (optional, for contributors):**

   ```sh
   cd packages/data
   pnpm start
   ```

5. **Start the website locally:**
   ```sh
   cd packages/svelte
   pnpm dev
   ```

## Contributing

Contributions are welcome! If you have ideas for new features or improvements, please feel free to open an issue or submit a pull request.
