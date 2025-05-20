const TOMTOM_API_KEY = process.env.EXPO_PUBLIC_TOMTOM_API_KEY;

interface TrafficData {
  duration: number;  // saniye cinsinden
  distance: number;  // metre cinsinden
  congestion: string; // 'low', 'medium', 'high'
}

export const getTrafficData = async (
  start: { latitude: number; longitude: number },
  end: { latitude: number; longitude: number }
): Promise<TrafficData> => {
  const url = `https://api.tomtom.com/routing/1/calculateRoute/${start.latitude},${start.longitude}:${end.latitude},${end.longitude}/json?traffic=true&key=${TOMTOM_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.routes && data.routes.length > 0) {
      const summary = data.routes[0].summary;

      // TomTom yoğunluk bilgisini "trafficDelayInSeconds" ile tahmin ederiz:
      const delay = summary.trafficDelayInSeconds || 0;
      const congestionLevel = delay > 900 ? 'high' : delay > 300 ? 'medium' : 'low';

      return {
        duration: summary.travelTimeInSeconds,
        distance: summary.lengthInMeters,
        congestion: congestionLevel,
      };
    } else {
      return { duration: 0, distance: 0, congestion: 'unknown' };
    }
  } catch (error) {
    console.error("TomTom Traffic API Hatası:", error);
    return { duration: 0, distance: 0, congestion: 'unknown' };
  }
};
