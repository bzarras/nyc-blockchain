import { EventData, EventQuery } from './EventDataSource';
import { EventSerializer } from './EventSerializer';
import { MeetupDataSource } from './MeetupDataSource';
import { EventbriteDataSource } from './EventbriteDataSource';
import { chronologicalEventComparator } from './utils';

export class EventReporter {
    private startDate: Date;
    private endDate: Date;
    private query: string;
    
    constructor(startDate: string, endDate: string, query: string) {
        this.startDate = new Date(startDate);
        this.endDate = new Date(endDate);
        this.query = query;
    }
    
    async reportResults() {
        const dataSources = [
            new MeetupDataSource(),
            new EventbriteDataSource()
        ];
        const eventQuery: EventQuery = {
            startDate: this.startDate,
            endDate: this.endDate,
            query: this.query,
            latitude: '40.737712', // lat-long roughly near union square
            longitude: '-73.992031',
            radius: '10' // miles
        };
        let events: EventData[] = [];
        
        console.log(EventSerializer.getSerializedHeaders());
        
        for (const dataSource of dataSources) {
            const eventData = await dataSource.fetchEvents(eventQuery);
            events = events.concat(eventData);
        }
        
        const sortedEventData = events.sort(chronologicalEventComparator);
        sortedEventData.forEach(event => console.log(EventSerializer.serializeEvent(event)));
    }
}
