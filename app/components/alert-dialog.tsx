"use client";

import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import { createContext, useContext, useState, useTransition } from "react";
import { Button } from "./button";

type onConfirmType = () => Promise<void> | void;
type AlertDialogContextType = {
  openDialog: (onConfirm: onConfirmType) => void;
  closeDialog: () => void;
  open: boolean;
  onConfirm: onConfirmType;
  isPendingConfirm: boolean;
};

export const AlertDialogContext = createContext<AlertDialogContextType>(
  {} as AlertDialogContextType,
);

interface DialogState {
  open: boolean;
  onConfirm: onConfirmType;
}

const initialDialogState: DialogState = { open: false, onConfirm: () => {} };

interface AlertDialogProviderProps {
  children: React.ReactNode;
}

export function AlertDialogProvider({ children }: AlertDialogProviderProps) {
  const [dialogState, setDialogState] = useState<DialogState>(
    () => initialDialogState,
  );
  const [isPending, startTransition] = useTransition();

  const openDialog = async (onConfirmCallback: () => Promise<void> | void) => {
    setDialogState({ open: true, onConfirm: onConfirmCallback });
  };

  const closeDialog = () => {
    setDialogState(initialDialogState);
  };

  const onConfirmLocal = () => {
    startTransition(async () => {
      await dialogState.onConfirm();
      closeDialog();
    });
  };

  return (
    <AlertDialogContext.Provider
      value={{
        openDialog,
        closeDialog,
        open: dialogState.open,
        onConfirm: onConfirmLocal,
        isPendingConfirm: isPending,
      }}
    >
      {children}
    </AlertDialogContext.Provider>
  );
}

export function AlertDialog() {
  const { open, closeDialog, onConfirm, isPendingConfirm } =
    useContext(AlertDialogContext);

  return (
    <RadixAlertDialog.Root
      open={open}
      onOpenChange={(open) => !open && closeDialog()}
    >
      <RadixAlertDialog.Trigger />
      <RadixAlertDialog.Portal>
        <RadixAlertDialog.Overlay className="fixed inset-0 bg-black/50" />
        <RadixAlertDialog.Content className="fixed left-1/2 top-1/2 w-5/6 max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg border border-app-gray-350 bg-background p-6">
          <RadixAlertDialog.Title className="pb-2 font-bold">
            Are you sure?
          </RadixAlertDialog.Title>
          <RadixAlertDialog.Description className="pb-4 text-sm">
            This action cannot be undone. This will permanently delete your task
            and remove it from our servers.
          </RadixAlertDialog.Description>
          <div className="flex justify-end gap-5">
            <RadixAlertDialog.Cancel className="text-sm font-medium hover:underline">
              Cancel
            </RadixAlertDialog.Cancel>
            <div className="w-min">
              <RadixAlertDialog.Action asChild>
                <Button onClick={onConfirm} variant="destructive">
                  {isPendingConfirm ? "Deleting…" : "Delete"}
                </Button>
              </RadixAlertDialog.Action>
            </div>
          </div>
        </RadixAlertDialog.Content>
      </RadixAlertDialog.Portal>
    </RadixAlertDialog.Root>
  );
}
