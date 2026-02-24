export interface TimeStatus {
    label: string;
    progress: number; // 0 to 1
    isActive: boolean;
    isUpcoming: boolean;
    isCompleted: boolean;
    minutesToStart?: number;
}

export const parseTime = (timeStr: string): Date => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
};

export const getLectureStatus = (startStr: string, endStr: string): TimeStatus => {
    const now = new Date();
    const start = parseTime(startStr);
    const end = parseTime(endStr);

    // If it's earlier than start
    if (now < start) {
        const diffMs = start.getTime() - now.getTime();
        const diffMins = Math.floor(diffMs / 60000);

        return {
            label: `Upcoming (${diffMins}m)`,
            progress: 0,
            isActive: false,
            isUpcoming: true,
            isCompleted: false,
            minutesToStart: diffMins
        };
    }

    // If it's between start and end
    if (now >= start && now <= end) {
        const totalDuration = end.getTime() - start.getTime();
        const elapsed = now.getTime() - start.getTime();
        const progress = elapsed / totalDuration;
        const remainingMinutes = Math.floor((end.getTime() - now.getTime()) / 60000);

        return {
            label: `In Progress (${remainingMinutes}m left)`,
            progress: Math.min(Math.max(progress, 0), 1),
            isActive: true,
            isUpcoming: false,
            isCompleted: false
        };
    }

    // Otherwise it's completed
    return {
        label: 'Completed',
        progress: 1,
        isActive: false,
        isUpcoming: false,
        isCompleted: true
    };
};

export const getNotificationSeconds = (startStr: string): number => {
    const now = new Date();
    const start = parseTime(startStr);

    // Calculate 10 minutes before start
    const alertTime = new Date(start.getTime() - 10 * 60000);

    if (now >= alertTime) {
        // If it's already within 10 mins of start, or past it, 
        // trigger in 5 seconds for immediate feedback
        return 5;
    }

    return Math.floor((alertTime.getTime() - now.getTime()) / 1000);
};
