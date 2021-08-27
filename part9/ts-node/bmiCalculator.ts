const bmiCalculator = (height: number, weight: number): string => {
    const result = weight / ((height / 100) ** 2)
    if(result < 16) return 'Underweight'
    else if(result > 25) return 'Overweight'
    else return 'Normal weight'
}

console.log(bmiCalculator(180, 100))