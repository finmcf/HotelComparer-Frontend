import React, { createContext, useState, useContext } from "react";

type UIContextType = {
  isLoading: boolean;
  isModalOpen: boolean;
  setLoading: (isLoading: boolean) => void;
  openModal: () => void;
  closeModal: () => void;
};

const UIContext = createContext<UIContextType>(null!);

export const useUI = () => useContext(UIContext);

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <UIContext.Provider
      value={{ isLoading, setLoading, isModalOpen, openModal, closeModal }}
    >
      {children}
    </UIContext.Provider>
  );
};
