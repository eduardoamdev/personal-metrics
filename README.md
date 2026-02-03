# Personal Metrics

## What is this?

Personal Metrics is a simple form created to enter daily life information into a database. The main idea is to use AI to analyze this information and detect anomalies or patterns that could be related to specific situations.

## First steps

- Download the repository using the command `git clone https://github.com/eduardoamdev/personal-metrics`.

- Install the packages with `npm i`.

- Rebuild native dependencies with `npm run rebuild`. This command is necessary to run after the first `npm i` because it rebuilds native dependencies (like better-sqlite3) for your specific system architecture. Native modules need to be compiled against your local Node.js version and operating system to function properly.

- Execute `npm start` to run the application.
