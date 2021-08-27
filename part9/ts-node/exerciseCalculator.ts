interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDesc: string;
    target: number;
    average: number;
}

const exerciseCalculator = (hours: Array<number>, target: number): Result => {
    const average = (hours.reduce((a, b) => a + b))/hours.length;
    let rating
    let ratingDesc
    if(average < target) {
        rating = 0
        ratingDesc = 'bad'
    }
    else if(average === target) {
        rating = 1
        ratingDesc = 'good'
    }
    else {
        rating = 2
        ratingDesc = 'great'
    }
    return {
        periodLength: hours.length,
        trainingDays: hours.filter(day => day !== 0).length,
        success: average >= target ? true : false,
        rating,
        ratingDesc,
        target,
        average
    }
}

console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2))