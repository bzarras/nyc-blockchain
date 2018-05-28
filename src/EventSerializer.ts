import { EventData, EventLocation } from './EventDataSource';

export class EventSerializer {
    private static headers = ['name', 'source', 'group', 'time', 'location', 'link', 'description'];
    
    static getSerializedHeaders(): string {
        return EventSerializer.headers.join(Separators.TAB);
    }
    
    static serializeEvent(eventData: EventData): string {
        return EventSerializer.headers.map(header => {
            if (header === 'location') {
                return eventData.location ? EventSerializer.serializeLocation(eventData.location) : '';
            }
            if (header === 'time') {
                const time = eventData[header];
                return time.toString();
            }
            return eventData[header] as string;
        }).join(Separators.TAB);
    }

    private static serializeLocation(location: EventLocation): string {
        return `${location.city} ${location.state || ''}`;
    }
}

enum Separators {
    TAB = '\t',
    COMMA = ','
}
