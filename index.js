const express = require('express');
const app = express();
const port = 3000;

// Function to check if the number is prime
function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// Function to check if the number is a perfect number
function isPerfect(num) {
    let sum = 0;
    for (let i = 1; i < num; i++) {
        if (num % i === 0) sum += i;
    }
    return sum === num;
}

// Function to check if the number is an Armstrong number
function isArmstrong(num) {
    let sum = 0;
    let digits = num.toString().split('');
    let numDigits = digits.length;

    for (let digit of digits) {
        sum += Math.pow(parseInt(digit), numDigits);
    }

    return sum === num;
}

// Function to calculate the sum of digits
function digitSum(num) {
    return num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
}

// Fun fact generation based on Armstrong number check
function getFunFact(num) {
    if (isArmstrong(num)) {
        const digits = num.toString().split('');
        const sumOfPowers = digits.map(digit => Math.pow(parseInt(digit), digits.length)).join(' + ');
        return `${num} is an Armstrong number because ${sumOfPowers} = ${num}`;
    }
    return '';
}

// Main API Route
app.get('/api/number/:num', (req, res) => {
    const num = parseInt(req.params.num);

    if (isNaN(num)) {
        return res.status(400).json({
            number: req.params.num,
            error: true
        });
    }

    const result = {
        number: num,
        is_prime: isPrime(num),
        is_perfect: isPerfect(num),
        properties: [],
        digit_sum: digitSum(num),
        fun_fact: getFunFact(num)
    };

    if (isArmstrong(num)) result.properties.push("armstrong");
    if (num % 2 !== 0) result.properties.push("odd");

    res.status(200).json(result);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
