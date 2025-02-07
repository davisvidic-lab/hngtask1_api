app.get('/number-info/:number', (req, res) => {
    const { number } = req.params; // Get number from URL path

    if (!number || isNaN(number)) {
        return res.status(400).json({ number: number, error: true });
    }

    const num = parseInt(number, 10);
    const response = {
        number: num,
        is_prime: isPrime(num),
        is_perfect: isPerfect(num),
        properties: [],
        digit_sum: sumOfDigits(num),
        fun_fact: getFunFact(num)
    };

    if (isArmstrong(num)) response.properties.push("armstrong");
    if (num % 2 !== 0) response.properties.push("odd");
    else response.properties.push("even");

    res.status(200).json(response);
});