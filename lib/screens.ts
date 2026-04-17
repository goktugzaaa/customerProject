export interface ScreenOption {
  label: string;
  emoji: string;
  value: string;
  description?: string;
  symbolLine?: string;
}

export type ScreenType = "input" | "buttons" | "profanity" | "booking";

export interface Screen {
  id: number;
  title: string;
  questions: string;
  type: ScreenType;
  placeholder?: string;
  options?: ScreenOption[];
  description: string;
  icon?: string;
  nextLabel: "next" | "done";
  requiresNonEmpty?: boolean;
}

export const screens: Screen[] = [
  {
    id: 1,
    title: "SONG SETUP",
    questions: "What shall we call your souvenir song?",
    type: "input",
    placeholder: 'For example "Bahamas here we come!"',
    description:
      "You can change your song title any time during your cruise if you wish.",
    icon: "music",
    nextLabel: "next",
    requiresNonEmpty: true,
  },
  {
    id: 2,
    title: "SONG SETUP",
    questions:
      "Which artist or group would you like your song to sound similar to?",
    type: "input",
    placeholder: "Artist or group name",
    description:
      "We’ll do our very best to make it sound as similar as we can. You can change your chosen artist any time during your cruise if you wish.",
    icon: "mic",
    nextLabel: "next",
    requiresNonEmpty: true,
  },
  {
    id: 3,
    title: "SONG SETUP",
    questions: "How funny do you want your song lyrics to be?",
    type: "buttons",
    options: [
      { label: "Very funny", emoji: "😂", value: "very_funny" },
      { label: "Quite funny", emoji: "😀", value: "quite_funny" },
      { label: "Not funny", emoji: "😐", value: "not_funny" },
    ],
    description:
      "You can change your song’s humour level any time during your cruise if you wish.",
    icon: "smile",
    nextLabel: "next",
  },
  {
    id: 4,
    title: "SONG SETUP",
    questions: "Would you like your song to include any profanities?",
    type: "profanity",
    options: [
      { label: "Some", emoji: "", value: "some", symbolLine: "X ! !!" },
      { label: "None", emoji: "", value: "none", symbolLine: "—" },
      { label: "Lots", emoji: "", value: "lots", symbolLine: "!!" },
    ],
    description:
      "The worst profanities used are the S-bomb and the F-bomb. You can change your profanities level any time during your cruise if you wish.",
    icon: "alert",
    nextLabel: "next",
  },
  {
    id: 5,
    title: "SONG SETUP",
    questions:
      "What is your first name? And the first name of others in your group?",
    type: "input",
    placeholder: "First names only, separated by a comma",
    description:
      "Type in the first name of any people you want mentioned in your song lyrics (first names only, separated by a comma). You can change these names any time during your cruise if you wish.",
    icon: "users",
    nextLabel: "next",
    requiresNonEmpty: true,
  },
  {
    id: 6,
    title: "SONG SETUP",
    questions: "What is your email address?",
    type: "input",
    placeholder: "your@email.com",
    description:
      "This is the email adress we will send your finished song to (24-48 hours after your cruise). You can change this email adress any time during your cruise if you wish.",
    icon: "mail",
    nextLabel: "done",
    requiresNonEmpty: true,
  },
  {
    id: 7,
    title: "SONG SETUP",
    questions: "What is your booking ID?",
    type: "booking",
    placeholder: "Booking reference",
    description:
      "This is used to validate you are a registered guest on this cruise.",
    icon: "ticket",
    nextLabel: "next",
    requiresNonEmpty: true,
  },
];

export const humourLabel: Record<string, string> = {
  very_funny: "Very funny",
  quite_funny: "Quite funny",
  not_funny: "Not funny",
};

export const profanityLabel: Record<string, string> = {
  some: "Some profanities",
  none: "No profanities",
  lots: "Lots of profanities",
};
