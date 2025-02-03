// Importing the express library
const express = require('express');
const app = express();
const port = 3000;

// Function to get mathematical properties of a number
function getMathProperties(num) {
    const isPrime = (n) => {
        if (n <= 1) return false;
        for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) return false;
        }
        return true;
    };

    const isPerfect = (n) => {
        let sum = 0;
        for (let i = 1; i < n; i++) {
            if (n % i === 0) sum += i;
        }
        return sum === n;
    };

    const isArmstrong = (n) => {
        const digits = n.toString().split('');
        const sum = digits.reduce((acc, digit) => acc + Math.pow(Number(digit), digits.length), 0);
        return sum === n;
    };

    const digitSum = num
        .toString()
        .split('')
        .map(Number)
        .reduce((acc, val) => acc + val, 0);

    const properties = [];
    if (isArmstrong(num)) properties.push('armstrong');
    if (num % 2 === 0) properties.push('even');
    else properties.push('odd');
    if (isPerfect(num)) properties.push('perfect');

    const funFact = isArmstrong(num)
        ? `${num} is an Armstrong number because ${num
              .toString()
              .split('')
              .map((digit) => `${digit}^${num.toString().length}`)
              .join(' + ')} = ${num}`
        : `${num} is not an Armstrong number.`;

    return {
        number: num,
        is_prime: isPrime(num),
        is_perfect: isPerfect(num),
        properties: properties,
        digit_sum: digitSum,
        fun_fact: funFact
    };
}

// Define the GET route
app.get('/number/:num', (req, res) => {
    const num = parseInt(req.params.num, 10);

    // Check if the input is a valid integer
    if (isNaN(num)) {
        return res.status(400).json({
            error: 'Invalid input. Please provide a valid integer.'
        });
    }

    const result = getMathProperties(num);
    return res.json(result);
});

// Start the server
app.listen(port, () => {
    console.log(`Math API listening at http://localhost:${port}`);
});
