import React, { createContext, Dispatch } from 'react';
import { ChatMessage } from '../types/chat.types';

export const defaultContext: ContextDataType = {
  joined: false,
  username: "N/A",
  roomId: 'N/A',
  messages: [],
  errorMessage: undefined
};

export interface ContextDataType {
  joined: boolean;
  username?: string;
  roomId: string;
  messages?: ChatMessage[];
  errorMessage?: string;
}

export interface ContextType {
  contextData: ContextDataType;
  setContextData: Dispatch<React.SetStateAction<ContextDataType>>;
}

export const AppContext = createContext<ContextType>({
  contextData: defaultContext,
  setContextData: () => {},
});
