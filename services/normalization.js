// services/normalization.js

/**
 * Normalizes spoken email formats into standard email format.
 * E.g. "john dot smith at gmail dot com" -> "john.smith@gmail.com"
 */
function normalizeEmail(text) {
  if (!text || typeof text !== 'string') return text;
  
  let normalized = text.toLowerCase().trim();
  
  // Replacements for common spoken email symbols
  normalized = normalized.replace(/\s+at\s+/g, '@');
  normalized = normalized.replace(/\s+dot\s+/g, '.');
  normalized = normalized.replace(/\s+underscore\s+/g, '_');
  normalized = normalized.replace(/\s+hyphen\s+/g, '-');
  normalized = normalized.replace(/\s+dash\s+/g, '-');
  
  // Remove all remaining spaces
  normalized = normalized.replace(/\s+/g, '');
  
  // Fallback check: if it still doesn't look like an email, return null or original
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(normalized)) {
    return text; // Return original if we couldn't properly format it
  }
  
  return normalized;
}

/**
 * Normalizes spoken phone numbers or dirty phone strings into standard digits.
 * E.g. "nine eight seven six five four three two one zero" -> "9876543210"
 * E.g. "plus one two three" -> "+123"
 */
function normalizePhone(text) {
  if (!text || typeof text !== 'string') return text;

  let normalized = text.toLowerCase();

  const numberWords = {
    'zero': '0', 'one': '1', 'two': '2', 'three': '3', 'four': '4',
    'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9',
    'oh': '0', 'plus': '+'
  };

  // Replace words with digits
  for (const [word, digit] of Object.entries(numberWords)) {
    const regex = new RegExp(`\\b${word}\\b`, 'g');
    normalized = normalized.replace(regex, digit);
  }

  // Extract only plus and digits
  normalized = normalized.replace(/[^\d+]/g, '');

  return normalized;
}

/**
 * Normalizes relative and spoken dates into YYYY-MM-DD.
 * Handles "tomorrow", "today", "next friday", etc.
 */
function normalizeDate(text) {
  if (!text || typeof text !== 'string') return text;
  
  let lowerText = text.toLowerCase().trim();
  const today = new Date();
  let targetDate = new Date(today);

  // Simple hardcoded mapping for very common relative days
  if (lowerText.includes('today')) {
    // leave as today
  } else if (lowerText.includes('tomorrow')) {
    targetDate.setDate(today.getDate() + 1);
  } else if (lowerText.includes('day after tomorrow')) {
    targetDate.setDate(today.getDate() + 2);
  } else {
    // Map days of the week
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    let dayMatched = false;
    
    for (let i = 0; i < days.length; i++) {
      if (lowerText.includes(days[i])) {
        let currentDay = today.getDay();
        let targetDay = i;
        let daysToAdd = targetDay - currentDay;
        
        if (daysToAdd <= 0) {
          daysToAdd += 7; // Next week
        }
        
        if (lowerText.includes('next ' + days[i])) {
          daysToAdd += 7;
        }
        
        targetDate.setDate(today.getDate() + daysToAdd);
        dayMatched = true;
        break;
      }
    }
    
    // Fallback: If it's already a standard date string or couldn't parse, try standard Date parsing
    if (!dayMatched) {
      const parsed = new Date(text);
      if (!isNaN(parsed.getTime())) {
        targetDate = parsed;
      } else {
        return text; // Return original if parsing completely fails
      }
    }
  }

  const yyyy = targetDate.getFullYear();
  const mm = String(targetDate.getMonth() + 1).padStart(2, '0');
  const dd = String(targetDate.getDate()).padStart(2, '0');
  
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Normalizes spoken times to standard 24-hour HH:MM format.
 * E.g. "2 PM" -> "14:00", "noon" -> "12:00", "2:30 in the afternoon" -> "14:30"
 */
function normalizeTime(text) {
  if (!text || typeof text !== 'string') return text;
  
  let lower = text.toLowerCase().trim();

  // Common word replacements
  lower = lower.replace('noon', '12:00 pm');
  lower = lower.replace('midnight', '12:00 am');
  
  if (lower.includes('morning')) lower += ' am';
  if (lower.includes('afternoon') || lower.includes('evening') || lower.includes('night')) lower += ' pm';

  // Extract hour and minute
  // Matches "2", "2:30", "14:00"
  const timeMatch = lower.match(/(\d{1,2})(?::(\d{2}))?/);
  if (!timeMatch) return text; // Cannot parse

  let hour = parseInt(timeMatch[1], 10);
  let min = timeMatch[2] ? parseInt(timeMatch[2], 10) : 0;
  
  const isPM = lower.includes('p'); // naive pm check
  const isAM = lower.includes('a'); // naive am check
  
  if (isPM && hour < 12) {
    hour += 12;
  }
  if (isAM && hour === 12) {
    hour = 0;
  }
  // Assume day-time if not specified and hour is small
  if (!isPM && !isAM) {
    if (hour >= 1 && hour <= 6) {
      hour += 12; // E.g., "2" usually means 2 PM in real estate viewing contexts
    }
  }

  const hh = String(hour).padStart(2, '0');
  const mm = String(min).padStart(2, '0');

  return `${hh}:${mm}`;
}

module.exports = {
  normalizeEmail,
  normalizePhone,
  normalizeDate,
  normalizeTime
};
