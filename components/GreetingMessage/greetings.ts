export const morningGreetings: readonly string[] = [
  "Morning, {name}. What are we designing today?",
  "Good morning, {name}! A fresh start — and a blank canvas.",
  "Hey {name}, the best floor plans get drawn early.",
  "Good morning, {name}. Ready to build something great?",
  "Rise and design, {name}. What's on the board today?",
  "Morning, {name}! Let's turn ideas into floor plans.",
  "Hey {name}, big things start with a single wall. Shall we?",
  "Good morning, {name}. Your canvas is waiting.",
  "Morning, {name}. What are we building?",
  "Good morning, {name}. Fresh day, fresh plan.",
  "Hey {name}, early start — love it.",
  "Morning, {name}. The board is blank.",
  "Rise and design, {name}.",
]

export const afternoonGreetings: readonly string[] = [
  "Good afternoon, {name}. What will you design next?",
  "Hey {name}, the afternoon belongs to you. Let's build.",
  "Welcome back, {name}! Pick up where you left off?",
  "Good afternoon, {name}. Your next great design starts here.",
  "Hey {name}, still in the zone? Let's keep designing.",
  "Afternoon, {name}! What space are we shaping today?",
  "Good afternoon, {name}. One prompt away from something brilliant.",
  "Hey {name}, what are we creating this afternoon?",
  "Afternoon, {name}. What's the brief?",
  "Hey {name}, good afternoon. Still in the zone?",
  "Good afternoon, {name}. Shall we design?",
  "Hey {name}, afternoon's yours.",
  "What are we creating today, {name}?",
]

export const eveningGreetings: readonly string[] = [
  "Good evening, {name}. What will you like to design?",
  "Evening, {name}! The creative hours are the best hours.",
  "Good evening, {name}. Let's turn ideas into floor plans.",
  "Hey {name}, winding down or just getting started?",
  "Good evening, {name}. Ready to design something new?",
  "Evening, {name}! Shall we build something tonight?",
  "Hey {name}, great designs come alive after sundown.",
  "Good evening, {name}. What space comes to life tonight?",
  "Good evening, {name}. What will you design?",
  "Evening, {name}. Let's build something.",
  "Hey {name}, good evening. What's the plan?",
  "Evening, {name}. The quiet hours are the best.",
  "Good evening, {name}. Ready to design?",
]

export const nightGreetings: readonly string[] = [
  "Still up, {name}? Let's design something worth it.",
  "Late-night inspiration, {name}? Clairvyn's right here.",
  "Hey {name}, the quiet hours make for sharp designs.",
  "Night owl mode, {name}. What are we building?",
  "Can't sleep, {name}? Let's build something instead.",
  "Hey {name}, the best floor plans are drawn after midnight.",
  "Still designing, {name}? We're just getting started.",
  "Night, {name}. Great ideas don't keep office hours.",
  "Still up, {name}? Let's make it count.",
  "Night, {name}. What are we building?",
  "Hey {name}, burning the midnight oil?",
  "Late night, {name}. Best time to design.",
  "Can't sleep, {name}? Let's create.",
]

/** Greetings that don't depend on time of day — used as a general fallback pool. */
export const generalGreetings: readonly string[] = [
  "Hey {name}.",
  "Welcome back, {name}.",
  "Good to see you, {name}.",
  "There you are, {name}.",
  "Hello, {name}.",
  "Back again, {name}?",
  "{name}. Let's build.",
  "Hi {name}, ready?",
  "Hey {name}, what are we designing?",
  "Welcome back, {name}. What's the brief?",
  "Good to see you, {name}. What's on today?",
  "Hey {name}, pick up where you left off?",
  "{name}, what space are we building today?",
  "Hi {name}. The canvas is ready.",
  "Welcome, {name}. What shall we create?",
  "Hey {name}, got a project in mind?",
  "Good to have you back, {name}.",
  "Hi {name}, what's the vision today?",
  "{name}, ready when you are.",
  "Back at it, {name}? Let's go.",
]

/** Returning-user variants (session 2+). */
export const returningGreetings: readonly string[] = [
  "Welcome back, {name}.",
  "Good to see you again, {name}.",
  "Back already, {name}? Let's keep going.",
  "Hey {name}, picking up where you left off?",
  "Welcome back, {name}. What's next?",
  "{name}, you're back. What are we designing?",
  "Again, {name}? We love the dedication.",
  "Good to have you back, {name}.",
]

/** Empty string = nameless variant (produce grammatically clean output). */
export const fallbackNames: readonly string[] = ["Pal", "You", "Dude", ""]
