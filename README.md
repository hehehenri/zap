# Zap

Zap is a chat application built to explore Relay and GraphQL, aiming to understand their strengths and weaknesses. With inspiration from popular messaging platforms like Telegram and WhatsApp, Zap provides a simple yet effective chat experience.

## Preview

https://github.com/hnrbs/zap/assets/23015763/dc42b7f3-99a2-4319-9f04-35fb9e91e7ee

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

4. Setup the environment variables:
   ```sh
   cp apps/server/.env.example apps/server/.env &&
   cp apps/web/.env.example apps/web/.env
   ```

## Usage

To start the application, run the following commands:

1. Run the Docker containers.
   ```sh
   docker-comopse up -d
   ```

2. Run apps in develpment mode.
   ```sh
   yarn dev
   ```

Then, navigate to `http://localhost:3000` in your web browser to access the application.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Henri Borges - [@hnrbs_](https://twitter.com/hnrbs_) - henri@henr.in
