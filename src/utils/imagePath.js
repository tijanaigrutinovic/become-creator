/**
 * Utility funkcija za rukovanje putanjama do slika
 * Automatski dodaje PUBLIC_URL u produkciji za GitHub Pages
 */
export const getImagePath = (path) => {
  // Ukloni početni slash ako postoji
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // U produkciji dodaj PUBLIC_URL, u development-u koristi relativnu putanju
  return process.env.NODE_ENV === 'production' 
    ? `${process.env.PUBLIC_URL}/${cleanPath}`
    : `/${cleanPath}`;
};

/**
 * Utility funkcija za rukovanje putanjama do ikona
 */
export const getIconPath = (path) => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  return process.env.NODE_ENV === 'production' 
    ? `${process.env.PUBLIC_URL}/${cleanPath}`
    : `/${cleanPath}`;
}; 