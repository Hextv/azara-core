import { azaraSTD } from "shadows-of-azara.std";
import { std } from "wow/wotlk";

// Disable all existing holidays by clearing their data (instead of deleting)
// This preserves the holiday entries but removes all their content
std.Holidays.queryAll({}).forEach((holiday) => {
    azaraSTD.Holiday.disableHoliday(holiday.ID);
});