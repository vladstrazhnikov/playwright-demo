# playwright-demo

## Simple Test Framework with Playwright
This is a simple sample test framework using Page Object Model in Playwright. Tests are written in `.ts`.
> **Note:** This repository is currently under development and subject to changes.

## Setup
Since this is based on Playwright with TS, so the pre-requisite is that you should have NodeJS installed on your system.
Once NodeJS is installed.
Install the `npm` dependencies using `npm i` or `npm install`

## System Under Test
The system under test is : https://github.com/RocketChat/Rocket.Chat

## Running tests
To run all tests on local run
```npx playwright test```

To run tests and generate an allure report
```npx allure serve allure-results```
