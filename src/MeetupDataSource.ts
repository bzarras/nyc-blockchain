import { EventDataSource, EventData, EventQuery, EventWebsite } from './EventDataSource';
import { localDatetime } from './utils';
import rp from 'request-promise';

export class MeetupDataSource implements EventDataSource {
    readonly host: string;

    constructor() {
        this.host = process.env['MEETUP_HOST'] as string;
    }
    
    async fetchEvents(eventQuery: EventQuery): Promise<EventData[]> {
        const startDate: string = localDatetime(eventQuery.startDate);
        const endDate: string = localDatetime(eventQuery.endDate);
        try {
            const response: MeetupResponse = await rp({
                method: 'GET',
                uri: `${this.host}/find/upcoming_events`,
                qs: {
                    key: process.env['MEETUP_API_KEY'],
                    lat: eventQuery.latitude,
                    lon: eventQuery.longitude,
                    radius: eventQuery.radius,
                    text: eventQuery.query,
                    start_date_range: startDate,
                    end_date_range: endDate
                },
                json: true
            });
            const city: string = response.city.city;
            const state: string = response.city.state;
            const eventData = response.events.map(event => ({
                name: event.name,
                source: EventWebsite.MEETUP,
                group: event.group.name,
                time: new Date(event.time),
                location: {
                    city: event.venue ? event.venue.city : city,
                    state: event.venue ? event.venue.state : state
                },
                link: event.link,
                description: event.description
            }));
            return eventData;
        } catch (e) {
            console.log(e);
            return [];
        }
    }
}

interface MeetupResponse {
    events: any[];
    city: any;
}
