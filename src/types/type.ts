export type Todo = {
  id: string;
  name: string;
  title: string;
  theme?: string;  
  createdAt: string;
  updatedAt: string;
  userId: string;
};


export type ThemeName = 
  | "Vintage Garden"
  | "Cosmic Symphony"
  | "Rustic Charm"
  | "Sunset Serenade"
  | "Industrial Chic"
  | "Blackout Neutrals"
  | "Vibrant Spectrum"
  | "Coastal Sunrise"
  | "Oceanic Serenity";
