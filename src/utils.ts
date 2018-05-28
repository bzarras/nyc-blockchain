import { EventData } from "./EventDataSource";

export function chronologicalEventComparator(eventA: EventData, eventB: EventData) {
    if (eventA.time < eventB.time) {
        return -1;
    } else if (eventA.time > eventB.time) {
        return 1;
    } else {
        return 0;
    }
}

export function localDatetime(date: Date): string {
    return date.toISOString().split('.')[0];
}
