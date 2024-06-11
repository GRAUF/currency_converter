#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
import Table from 'cli-table3';
console.log(chalk.yellow('<<<<<<<<||||<<<<<<<<<< $$$$$$$$$$$$$$$$$$$$$$ >>>>>>>>||||>>>>>>||||||||>>>>>>>>>>'));
console.log(chalk.green.bold(' <<<<<<<<||||||>>>>>> Welcome to Currency Converter Store! >>>>>>>||||||<<<<<<'));
console.log(chalk.yellow('<<<<<<<|||<<<<<<<===== $$$$$$$$$$$$$$$$$$$$$$ ===== >>>>>>>>|||>>>>>>>>>>>>>>>>>>>'));
console.log(chalk.green.bold(' <<<<<<<<||||||>>>>>> Thanks for visiting! >>>||||||<<<<  <|||||||<<<<<<<<<<<<'));
console.log(chalk.yellow('<<<<<<<|||<<<<<<<===== $$$$$$$$$$$$$$$$$$$$$$ ===== >>>>>>>>|||>>>>>>>>>||||||||||'));
console.log(chalk.green.bold(' <<<<<<<<|||>>>>>> ||||||||||========||||||||||>>>>>>>||||||<<<<<<<<<<<<<<<<<<'));
console.log("\n");
// Define exchange rates (as of a specific date for demonstration purposes)
const exchangeRates = {
    USD: 1.00,
    EUR: 299.04,
    GBP: 1.33,
    INR: 3.30,
    AUD: 183.81,
    CAD: 202.35,
    SGD: 205.75,
    CHF: 309.88,
    MYR: 4.15,
    JPY: 1.77,
    PKR: 278.50,
    SAR: 74.25,
    AFGHANI: 4.01,
    THAKKA: 2.37
};
// List of top currencies
const currencies = Object.keys(exchangeRates);
const displayTable = () => {
    const table = new Table({
        head: ['Currency', 'Rate (per USD)'],
        colWidths: [10, 20]
    });
    currencies.forEach((currency) => {
        table.push([currency, exchangeRates[currency].toString()]);
    });
    console.log(table.toString());
};
const convertCurrency = async () => {
    const { fromCurrency } = await inquirer.prompt([
        {
            type: 'list',
            name: 'fromCurrency',
            message: 'Select the currency you want to convert from:',
            choices: currencies
        }
    ]);
    const { toCurrency } = await inquirer.prompt([
        {
            type: 'list',
            name: 'toCurrency',
            message: 'Select the currency you want to convert to:',
            choices: currencies.filter((currency) => currency !== fromCurrency)
        }
    ]);
    const { amount } = await inquirer.prompt([
        {
            type: 'input',
            name: 'amount',
            message: `Enter the amount you want to convert from ${fromCurrency} to ${toCurrency}:`,
            validate: (input) => !isNaN(parseFloat(input)) || 'Please enter a valid number'
        }
    ]);
    const convertedAmount = (parseFloat(amount) / exchangeRates[fromCurrency]) * exchangeRates[toCurrency];
    console.log(chalk.green(`\n${amount} ${fromCurrency} is equal to ${convertedAmount.toFixed(2)} ${toCurrency}\n`));
    const { nextAction } = await inquirer.prompt([
        {
            type: 'list',
            name: 'nextAction',
            message: 'What would you like to do next?',
            choices: ['Convert another currency', 'Exit']
        }
    ]);
    if (nextAction === 'Convert another currency') {
        await convertCurrency();
    }
    else {
        console.log(chalk.blue('Thank you for using the currency converter!'));
    }
};
const main = async () => {
    console.log(chalk.yellow('Welcome to the Currency Converter!'));
    displayTable();
    await convertCurrency();
};
main().catch(error => console.error(error));
