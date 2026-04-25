import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { RevenueAnalyzer } from "./RevenueAnalyzer";
import { useExtras } from "@/i18n/extras";

interface Ctx {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const DiagnosticModalContext = createContext<Ctx | null>(null);

export function DiagnosticModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);
  const ex = useExtras();

  return (
    <DiagnosticModalContext.Provider value={{ open, openModal, closeModal }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[92vh] w-[calc(100vw-1.5rem)] max-w-3xl overflow-y-auto border-border bg-background/95 p-4 backdrop-blur-xl sm:p-6">
          <DialogTitle className="sr-only">{ex.diagnostic.sectionTitle}</DialogTitle>
          <DialogDescription className="sr-only">{ex.diagnostic.sectionSub}</DialogDescription>
          <RevenueAnalyzer />
        </DialogContent>
      </Dialog>
    </DiagnosticModalContext.Provider>
  );
}

export function useDiagnosticModal() {
  const ctx = useContext(DiagnosticModalContext);
  if (!ctx) throw new Error("useDiagnosticModal must be used within DiagnosticModalProvider");
  return ctx;
}