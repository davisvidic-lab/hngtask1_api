const express = require('express');
const app = express();
const port = 3000;

// Utility function to check if a number is prime
function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// Utility function to check if a number is perfect
function isPerfect(num) {
    let sum = 0;
    for (let i = 1; i < num; i++) {
        if (num % i === 0) sum += i;
    }
    return sum === num;
}

// Utility function to check if a number is an Armstrong number
function isArmstrong(num) {
    const digits = num.toString().split('');
    const sum = digits.reduce((acc, digit) => acc + Math.pow(Number(digit), digits.length), 0);
    return sum === num;
}

// Function to calculate the sum of digits
function sumOfDigits(num) {
    return num.toString().split('').reduce((sum, digit) => sum + Number(digit), 0);
}

// Fun fact for the number (simplified for this example)
function getFunFact(num) {
    if (num === 371) {
        return "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371";
    }
    return "This number has no special fun fact.";
}

// API endpoint
app.get('/number-info', (req, res) => {
    const { number } = req.query;

    // Validate if number is a valid integer
    if (!number || isNaN(number)) {
        return res.status(400).json({
            number: number,
            error: true
        });
    }

    const num = parseInt(number, 10);

    // Prepare the response
    const response = {
        number: num,
        is_prime: isPrime(num),
        is_perfect: isPerfect(num),
        properties: [],
        digit_sum: sumOfDigits(num),
        fun_fact: getFunFact(num)
    };

    // Determine number properties
    if (isArmstrong(num)) response.properties.push("armstrong");
    if (num % 2 !== 0) response.properties.push("odd");
    else response.properties.push("even");

    res.status(200).json(response);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
