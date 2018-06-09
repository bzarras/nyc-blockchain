import { EventData, EventQuery, EventDataSource } from './EventDataSource';
import { EventSerializer } from './EventSerializer';
import { MeetupDataSource } from './MeetupDataSource';
import { EventbriteDataSource } from './EventbriteDataSource';
import { chronologicalEventComparator } from './utils';

export class EventReporter {
    private startDate: Date;
    private endDate: Date;
    private queries: string[];
    private dataSources: EventDataSource[];
    
    constructor(startDate: string, endDate: string, queries: string[]) {
        this.startDate = new Date(startDate);
        this.endDate = new Date(endDate);
        this.queries = queries;
        this.dataSources = [
            new MeetupDataSource(),
            new EventbriteDataSource()
        ];
    }

    async reportResults() {
        const eventQueries: EventQuery[] = this.queries.map(query => ({
            startDate: this.startDate,
            endDate: this.endDate,
            query,
            latitude: '40.737712', // lat-long roughly near union square
            longitude: '-73.992031',
            radius: '10' // miles
        }));
        let eventsMap: Map<string, EventData> = new Map();
        
        console.log(EventSerializer.getSerializedHeaders());
        
        for (const dataSource of this.dataSources) {
            for(const eventQuery of eventQueries) {
                const eventData = await dataSource.fetchEvents(eventQuery);
                eventData.forEach(event => eventsMap.set(event.id, event));
            }
        }

        const events: EventData[] = Array.from(eventsMap.values());
        
        const sortedEventData = events.sort(chronologicalEventComparator);
        sortedEventData.forEach(event => console.log(EventSerializer.serializeEvent(event)));
    }
}
