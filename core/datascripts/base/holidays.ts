import { SQL, std } from "wow/wotlk";

// Clear all existing holidays from the DBC
std.Holidays.queryAll({}).forEach(holiday => {
    holiday.delete();
});

// Set holidays far in the future
SQL.game_event.queryAll({}).forEach(event => {
    event.start_time.set('2030-01-01 00:00:00')
    event.end_time.set('2030-01-01 00:00:01')
})