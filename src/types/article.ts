export interface Article {
  id: string;
  title: string;
  description: string;
  source: string;
  author: string;
  category: string;
  date: string;
  imageUrl: string;
  url: string;
}

export interface UserPreferences {
  preferredSources: string[];
  preferredCategories: string[];
}

export interface ButtonProps {
  savedPreferences: () => void;
  isSaving: boolean;
  resetPreferences: () => void;
  isResetting: boolean;
}