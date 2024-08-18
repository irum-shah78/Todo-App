import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    } & DefaultSession['user'];
  }
}

export type Todo = {
  id: string;
  name: string;
  title: string;
  theme: string;  
  createdAt: string;
  updatedAt: string;
  userId: string;
};

export type Task = {
  id: string;
  name: string;
  completed: boolean;
  todoId: string;
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


  export type Theme = {
    primary: string;
    background: string;
    accent: string;
  };
  
  export type UseHeaderProps = {
    theme?: Theme;
  };
  
  export type UseHeaderReturn = {
    headerStyle: React.CSSProperties;
    tuneNavStyle: string;
    handleSignOut: () => void;
    isAuthenticated: boolean;
  };

  export type HeaderProps = {
    theme?: Theme;
  }

 export type UserProfile = {
    name: string;
    email: string;
    image: string;
  }

  export type TodoState = {
    todos: Todo[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }