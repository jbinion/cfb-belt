# CFB Belt

- **packages/data**  
  Scripts and utilities to fetch, process, and calculate the college football lineal championship lineage, team data, etc

- **packages/svelte**  
  Svelte static pre rendered app that displays the results

## Data Source

All data is sourced from the excellent [CollegeFootballData.com](https://collegefootballdata.com/).

## Preview

[cfb-belt.com](https://cfb-belt.com)

## Getting Started

1. **Clone the repository:**

   ```sh
   git clone https://github.com/jbinion/cfb_belt.git
   cd cfb_belt
   ```

2. **Set up environment variables:**

   Create `.env` files in the project root by copying the provided `.env.example` files:

   ```sh
   cp .env.example .env
   ```

   Then, edit these `.env` files to add your API key and your MongoDB connection URI

3. **Install dependencies**

   ```sh
   pnpm install
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

Contributions are welcome. If you have ideas for new features or improvements, please feel free to open an issue or submit a pull request.
