
export async function handler(event) {
    const city = event.queryStringParameters.city;
    const apiKey = process.env.WEATHER_KEY;

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=en`
    );
    const data = await response.json();

    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };
}
