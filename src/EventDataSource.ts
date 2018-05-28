export interface EventDataSource {
    readonly host: string;
    fetchEvents(eventQuery: EventQuery): Promise<EventData[]>;
}

export interface EventQuery {
    startDate: Date;
    endDate: Date;
    query: string;
}

export interface EventData {
    name: string;
    source: EventWebsite;
    group?: string;
    time: Date;
    location?: EventLocation;
    link: string;
    description?: string;
    [index: string]: any
}

export interface EventLocation {
    address_1?: string;
    address_2?: string;
    city: string;
    state: string;
    zip?: number;
    country?: string;
    latitude?: string;
    longitude?: string;
}

export enum EventWebsite {
    EVENTBRITE = 'Eventbrite',
    MEETUP = 'Meetup'
}
