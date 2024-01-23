# Zap

Zap is a chat application built to explore Relay and GraphQL, aiming to understand their strengths and weaknesses. With inspiration from popular messaging platforms like Telegram and WhatsApp, Zap provides a simple yet effective chat experience.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/hnrbs/zap.git
   ```
2. Navigate to the project directory:
   ```sh
   cd zap
   ```
3. Install dependencies for both web and server:
   ```sh
   yarn install
   ```

## Usage

To start the application, run the following commands:

1. Run the Docker containers.
   ```sh
   docker-comopse up -d
   ```

2. Run the development server.
   ```sh
   cd apps/server
   cp .env.example .env && xdg-open .env
   yarn dev
   ```

3. Run the web client.
   ```sh
   cd apps/web
   cp .env.example .env
   yarn dev
   ```

Then, navigate to `http://localhost:3000` in your web browser to access the application.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Henri Borges - [@hnrbs_](https://twitter.com/hnrbs_) - henri@henr.in
