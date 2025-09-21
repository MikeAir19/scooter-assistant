//TEST

//zima:
// const tempMorning = 1
// const tempAfternoon = 2
// const rainMorning = hourly.rain[morningIndex]
// const rainAfternoon = hourly.rain[afternoonIndex]

//déšť:
// const tempMorning = hourly.temperature_2m[morningIndex]
// const tempAfternoon = hourly.temperature_2m[afternoonIndex]
// const rainMorning = 2
// const rainAfternoon = 1

//správné počasí:
// const tempMorning = hourly.temperature_2m[morningIndex]
// const tempAfternoon = hourly.temperature_2m[afternoonIndex]
// const rainMorning = hourly.rain[morningIndex]
// const rainAfternoon = hourly.rain[afternoonIndex]


//čas:
// const now = new Date("2025-09-21T07:30:00") // simuluje ráno

//správný čas:
// const now = new Date()