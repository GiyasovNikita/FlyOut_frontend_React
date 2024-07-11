export interface FlightDetails {
    flight_id: number;
    origin_airport: string;
    destination_airport: string;
    airline_code: string;
    flight_number: string;
    departure_at: string;
    return_at: string;
    duration: number;
    origin_city_name: string;
    destination_city_name: string;
    origin_airport_name: string;
    destination_airport_name: string;
    details: {
        flight_details_id: number;
        flight_id: number;
        price: string;
        currency: string;
        baggage: boolean;
    };
}

export interface ConnectingFlight {
    firstLeg: FlightDetails;
    secondLeg: FlightDetails;
}

export interface Airport {
    airport_code: string;
    airport_name: string;
    city_id: number;
    city_name: string;
}
