
import {Message} from "whatsapp-web.js";

import WeatherResponse from "../interfaces/weather-response.js";
import {Command} from "../utils/command.js";

export default new Command({
    name: "weather",
    description: "Menampilkan cuaca daerah Bondowoso",
    aliases: ["cuaca"],
    async run(message: Message) {
        await message.reply(`Loading...`);
        const req = await fetch(process.env.WEATHER_API!);
        const res: WeatherResponse = await req.json();
        if (res.cod == 200) {
            await message.reply(
            `*Cuaca ${res.name}*\n- Lat: ${res.coord.lat}\n- Lon: ${res.coord.lon}\n- Cuaca: ${res.weather[0].main}/${res.weather[0].description}\n- Temperatur: ${res.main.temp}\n- Kecepatan Angin: ${res.wind.speed}`
            );
        } else {
            await message.reply(`Gagal mendapatkan cuaca`);
        }
    },
});