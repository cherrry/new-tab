export default {
  refresh() {
    return {
      location: 'hongkong',
      weather: {
        today: { temp: 28, icon: 50 },
        forecast: [
          { minTemp: 24, maxTemp: 28, icon: 51 },
          { minTemp: 24, maxTemp: 28, icon: 52 },
          { minTemp: 24, maxTemp: 28, icon: 53 },
          { minTemp: 24, maxTemp: 28, icon: 54 }
        ]
      }
    }
  }
}
