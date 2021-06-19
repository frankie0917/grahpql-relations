import React, { PropsWithChildren } from 'react';
import { useContext } from 'react';
import { NodeGraph } from './NodeGraph';

export type StoreType = {
  nodeGraph: NodeGraph;
};

const defaultValue = {
  nodeGraph: new NodeGraph(),
} as StoreType;

export const GlobalStoreContext = React.createContext(defaultValue);

export const GlobalStoreContextProvider = ({
  children,
}: PropsWithChildren<{}>) => (
  <GlobalStoreContext.Provider value={defaultValue}>
    {children}
  </GlobalStoreContext.Provider>
);

export const useStore = () => useContext(GlobalStoreContext);
