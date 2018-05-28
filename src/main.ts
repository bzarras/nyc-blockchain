import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

import { EventData, EventQuery } from './EventDataSource'
import { EventSerializer } from './EventSerializer';
import { MeetupDataSource } from './MeetupDataSource';
import { chronologicalEventComparator } from './utils';
import { EventbriteDataSource } from './EventbriteDataSource';

reportResults();

async function reportResults() {
    const dataSources = [
        new MeetupDataSource(),
        new EventbriteDataSource()
    ];
    const eventQuery: EventQuery = {
        startDate: new Date('2018-05-28'),
        endDate: new Date ('2018-06-02'),
        query: 'blockchain',
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
