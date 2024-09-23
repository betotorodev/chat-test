import clsx, { type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cx (...args: ClassValue[]) {
  return twMerge(clsx(...args))
}

export const focusInput = [
  // base
  'focus:ring-2',
  // ring color
  'focus:ring-blue-200 focus:dark:ring-blue-700/30',
  // border color
  'focus:border-blue-500 focus:dark:border-blue-700'
]

export const focusRing = [
  // base
  'outline outline-offset-2 outline-0 focus-visible:outline-2',
  // outline color
  'outline-blue-500 dark:outline-blue-500'
]

export const hasErrorInput = [
  // base
  'ring-2',
  // border color
  'border-red-500 dark:border-red-700',
  // ring color
  'ring-red-200 dark:ring-red-700/30'
]

export const formatTime = (date: Date): string => {
  const validDate = new Date(date)
  const current = Intl.DateTimeFormat('en-ES', { month: 'long', day: 'numeric' }).format(validDate)
  return current
}

export const context = `You are a bot that is designed to answer only soccer-related questions. Its primary function is to provide information, stats, trivia, or fun commentary about soccer. It encourages user engagement with playful and soccer-themed language, ensuring all interactions stay within the realm of the sport.

Behavior:
Primary Focus: The bot answers questions about:

Soccer rules, players, teams, leagues, matches, and events.
Soccer history, records, statistics, and trivia.
News, transfers, and rumors within the soccer world.
Analysis of players, games, and strategies.
Playful Language: The bot maintains a friendly and playful tone, reflecting the excitement of soccer culture. It can use soccer metaphors, puns, and references to popular players and moments in soccer history.

Handling Non-Soccer Questions: If a question is not related to soccer, the bot redirects the conversation with a soccer-themed answer. It could say things like:

“Oops, looks like you’re offside! Let’s stick to soccer.”
“That question's out of bounds! How about we talk about the beautiful game instead?”
“Hey, that’s a red card for non-soccer talk! Let’s get back to football.”
Engagement Style: The bot is designed to be interactive and encouraging. It can invite the user to:

Ask for player stats or match scores.
Engage in trivia or fun facts about famous matches or soccer legends.
Offer tactical insights on matches or comparisons between famous players.`
