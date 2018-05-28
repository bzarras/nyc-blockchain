import { EventDataSource, EventData, EventQuery, EventWebsite } from "./EventDataSource";
import { localDatetime } from './utils';
import rp from 'request-promise';

export class EventbriteDataSource implements EventDataSource {
    readonly host: string;
    constructor() {
        this.host = process.env['EVENTBRITE_HOST'] as string;   
    }

    async fetchEvents(eventQuery: EventQuery): Promise<EventData[]> {
        try {
            const response: EventbriteResponse = await rp({
                method: 'GET',
                uri: `${this.host}/v3/events/search/`,
                qs: {
                    'location.latitude': '40.737712',
                    'location.longitude': '-73.992031',
                    'location.within': '10mi',
                    q: eventQuery.query,
                    'start_date.range_start': localDatetime(eventQuery.startDate),
                    'start_date.range_end': localDatetime(eventQuery.endDate),
                    sort_by: 'date'
                },
                headers: {
                    'Authorization': `Bearer ${process.env['EVENTBRITE_TOKEN']}`
                },
                json: true
            });
            const eventData: EventData[] = response.events.map(event => ({
                name: event.name.text,
                source: EventWebsite.EVENTBRITE,
                time: new Date(event.start.utc),
                link: event.url
            }));
            return eventData;
        } catch (e) {
            console.log(e);
            return [];
        }
    }
}

interface EventbriteResponse {
    pagination: any,
    events: any[]
}
