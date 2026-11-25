import { createContext, useContext, useState } from 'react';

const CursorContext = createContext({
  cursorVariant: 'default',
  cursorText: '',
  setCursor: () => {},
  resetCursor: () => {},
});

export function CursorProvider({ children }) {
  const [cursorVariant, setCursorVariant] = useState('default');
  const [cursorText, setCursorText] = useState('');

  const setCursor = (variant = 'default', text = '') => {
    setCursorVariant(variant);
    setCursorText(text);
  };

  const resetCursor = () => {
    setCursorVariant('default');
    setCursorText('');
  };

  return (
    <CursorContext.Provider value={{ cursorVariant, cursorText, setCursor, resetCursor }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  return useContext(CursorContext);
}
