import { useState, useCallback } from "react";

export interface ModalState<T = any> {
  isOpen: boolean;
  data?: T;
}

export interface UseModalsReturn<T extends Record<string, any>> {
  modals: { [K in keyof T]: ModalState<T[K]> };
  openModal: <K extends keyof T>(modalKey: K, data?: T[K]) => void;
  closeModal: <K extends keyof T>(modalKey: K) => void;
  toggleModal: <K extends keyof T>(modalKey: K, data?: T[K]) => void;
  closeAllModals: () => void;
  isAnyModalOpen: boolean;
}

export function useModals<T extends Record<string, any>>(
  initialModals: T,
): UseModalsReturn<T> {
  const [modals, setModals] = useState<{ [K in keyof T]: ModalState<T[K]> }>(
    () => {
      const initialState = {} as { [K in keyof T]: ModalState<T[K]> };

      Object.keys(initialModals).forEach((key) => {
        const modalKey = key as keyof T;
        initialState[modalKey] = {
          isOpen: false,
          data: initialModals[modalKey],
        };
      });

      return initialState;
    },
  );

  const openModal = useCallback(
    <K extends keyof T>(modalKey: K, data?: T[K]) => {
      setModals((prev) => ({
        ...prev,
        [modalKey]: {
          isOpen: true,
          data: data ?? prev[modalKey].data,
        },
      }));
    },
    [],
  );

  const closeModal = useCallback(<K extends keyof T>(modalKey: K) => {
    setModals((prev) => ({
      ...prev,
      [modalKey]: {
        ...prev[modalKey],
        isOpen: false,
      },
    }));
  }, []);

  const toggleModal = useCallback(
    <K extends keyof T>(modalKey: K, data?: T[K]) => {
      setModals((prev) => ({
        ...prev,
        [modalKey]: {
          isOpen: !prev[modalKey].isOpen,
          data: data ?? prev[modalKey].data,
        },
      }));
    },
    [],
  );

  const closeAllModals = useCallback(() => {
    setModals((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        const modalKey = key as keyof T;
        newState[modalKey] = {
          ...newState[modalKey],
          isOpen: false,
        };
      });
      return newState;
    });
  }, []);

  const isAnyModalOpen = Object.values(modals).some((modal) => modal.isOpen);

  return {
    modals,
    openModal,
    closeModal,
    toggleModal,
    closeAllModals,
    isAnyModalOpen,
  };
}
