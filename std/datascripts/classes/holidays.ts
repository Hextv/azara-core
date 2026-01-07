import { SQL, std } from "wow/wotlk";

export class Holiday {
    /**
     * Disables a Holiday by clearing its data and disabling associated game events.
     * 
     * This will:
     * - Clear all holiday stages (Date/Duration arrays) to prevent event time calculation
     * - Clear all holiday data using std.Holidays.Clear()
     * - Disable all game events linked to this holiday (sets state to INTERNAL)
     * - Disable holiday_dates SQL entries (sets date_value and holiday_duration to 0)
     * 
     * Note: Game events are disabled (not deleted) to preserve references from other systems
     * like conditions and creature loot, preventing "non existing event id" errors.
     * 
     * @param id The Holiday ID to disable.
     */
    disableHoliday(id: number) {
        const holiday = std.Holidays.load(id);
        
        if (!holiday || holiday.isDeleted()) {
            return;
        }
        
        // Clear all the other holiday data
        std.Holidays.Clear(holiday);

        // Due to lack of functionality in TSWoW, we need to clear the Date 
        // and Duration arrays manually. This prevents the server from calculating 
        // event times from the DBC
        for (let i = 0; i < 26; i++) {
            holiday.row.Date.setIndex(i, 0);
        }
        // Clear Duration array (10 entries)
        for (let i = 0; i < 10; i++) {
            holiday.row.Duration.setIndex(i, 0);
        }

        // Disable all game events linked to this holiday instead of deleting them
        // This prevents events from firing while preserving references (e.g., conditions, creature loot)
        // Setting world_event to 5 (GAMEEVENT_INTERNAL) makes CheckOneGameEvent() return false
        SQL.game_event.queryAll({ holiday: id }).forEach(event => {
            event.world_event.set(5); // GAMEEVENT_INTERNAL - never handled in update
            event.holiday.set(0); // Unlink from holiday
            // Set times to a safe past date to ensure it never fires even if state changes
            // Using 2000-01-01 instead of 1970-01-01 to avoid MySQL NO_ZERO_DATE issues
            event.start_time.set('2000-01-01 00:00:00');
            event.end_time.set('2000-01-01 00:00:00');
        });

        // Disable holiday_dates entries instead of deleting them
        // Setting date_value and holiday_duration to 0 prevents them from being used
        // This preserves entries while ensuring they don't override cleared DBC values
        SQL.holiday_dates.queryAll({ id: id }).forEach(dateRow => {
            dateRow.date_value.set(0);
            dateRow.holiday_duration.set(0);
        });
    }
}

export const HolidaysRegistry = new Holiday();

