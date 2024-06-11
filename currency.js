#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
import axios from 'axios';
const correctPasscode = '1234'; // Set your personal passcode here
const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD'];
const getCurrencyRates = async () => {
    try {
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
        return response.data.rates;
    }
    catch (error) {
        console.error(chalk.red('Error fetching exchange rates'), error);
        return null;
    }
};
const askForPasscode = async () => {
    const answer = await inquirer.prompt({
        type: 'password',
        name: 'passcode',
        message: 'Enter your personal passcode:',
    });
    if (answer.passcode !== correctPasscode) {
        console.log(chalk.red('Incorrect passcode. Access denied.'));
        process.exit(1);
    }
};
const askForCurrencyAmounts = async (rates) => {
    const questions = currencies.map(currency => ({
        type: 'input',
        name: currency,
        message: `Enter amount in ${currency}:`,
        validate: (input) => !isNaN(parseFloat(input)) || 'Please enter a valid number',
    }));
    const answers = await inquirer.prompt(questions);
    let totalInUSD = 0;
    for (const currency of currencies) {
        const amount = parseFloat(answers[currency]);
        const rate = rates[currency];
        const amountInUSD = amount / rate;
        totalInUSD += amountInUSD;
    }
    console.log(chalk.green(`Total value in USD: ${totalInUSD.toFixed(2)}`));
};
const main = async () => {
    await askForPasscode();
    const rates = await getCurrencyRates();
    if (!rates)
        return;
    console.log(chalk.blue('Current Exchange Rates (Base: USD):'));
    currencies.forEach(currency => {
        console.log(chalk.yellow(`${currency}: Buy - ${rates[currency]}, Sell - ${1 / rates[currency]}`));
    });
    await askForCurrencyAmounts(rates);
};
main();
