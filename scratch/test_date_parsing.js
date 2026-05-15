// Mock dependencies
const now = new Date('2026-05-15T10:00:00Z'); // Friday
global.Date = class extends Date {
  constructor(arg) {
    if (arg) return new Date(arg);
    return now;
  }
};

function parseRelativeDate(dateStr) {
  if (!dateStr) return dateStr;
  const lower = String(dateStr).toLowerCase().trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  if (lower === 'today') return now.toISOString().split('T')[0];
  if (lower === 'tomorrow') {
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }
  const cleanDay = lower.replace(/next |this /g, '');
  const dayIndex = days.indexOf(cleanDay);
  if (dayIndex !== -1) {
    const todayIndex = now.getDay();
    let diff = dayIndex - todayIndex;
    if (diff <= 0) diff += 7;
    const targetDate = new Date(now);
    targetDate.setDate(now.getDate() + diff);
    return targetDate.toISOString().split('T')[0];
  }
  return dateStr;
}

console.log('--- Testing parseRelativeDate ---');
console.log('Today (Friday):', parseRelativeDate('today')); // 2026-05-15
console.log('Tomorrow:', parseRelativeDate('tomorrow')); // 2026-05-16
console.log('Thursday:', parseRelativeDate('thursday')); // 2026-05-21 (next Thursday)
console.log('Monday:', parseRelativeDate('Monday')); // 2026-05-18
console.log('Next Thursday:', parseRelativeDate('next thursday')); // 2026-05-21
console.log('2026-06-01:', parseRelativeDate('2026-06-01')); // 2026-06-01
