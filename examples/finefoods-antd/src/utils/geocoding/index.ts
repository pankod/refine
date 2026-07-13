const API_URL = "https://geocode.maps.co";
const API_KEY = "65caa5869275c294478503twc82c790";

export type LatLng = {
  lat: number;
  lng: number;
};

export type Place = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  display_name: string;
  address: {
    amenity: string;
    road: string;
    neighbourhood: string;
    suburb: string;
    city: string;
    state: string;
    "ISO3166-2-lvl4": string;
    postcode: string;
    country: string;
    country_code: string;
  };
  boundingbox: Array<string>;
};

export const getAddressWithLatLng = async ({ lat, lng }: LatLng) => {
  try {
    const query = `lat=${lat}&lon=${lng}&api_key=${API_KEY}`;
    const response = await fetch(`${API_URL}/reverse?${query}`);
    const data: Place = await response.json();
    if (!data) return null;

    return {
      address: data.display_name,
    };
  } catch (error) {
    return null;
  }
};

export const getLatLngWithAddress = async (address: string) => {
  try {
    const query = `q=${address}&api_key=${API_KEY}`;
    const response = await fetch(`${API_URL}/search?${query}`);
    const data: Place[] = await response.json();
    const lat = data?.[0]?.lat || null;
    const lng = data?.[0]?.lon || null;

    if (lat && lng) {
      return {
        lat,
        lng,
      };
    }

    return null;
  } catch (error) {
    return null;
  }
};

export const convertLatLng = (latLng: { lat: string; lng: string }) => {
  const formatter = new Intl.NumberFormat("en", {
    maximumFractionDigits: 5,
  });
  const lat = Number(formatter.format(Number(latLng.lat)));
  const lng = Number(formatter.format(Number(latLng.lng)));

  return {
    lat,
    lng,
  };
};
