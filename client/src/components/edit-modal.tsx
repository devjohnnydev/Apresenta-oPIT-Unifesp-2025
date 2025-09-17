import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface EditModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSave?: (content: string) => void;
  initialContent?: string;
  title?: string;
}

export function EditModal({ 
  isOpen = false, 
  onClose, 
  onSave, 
  initialContent = "", 
  title = "Editar Conteúdo" 
}: EditModalProps) {
  const [content, setContent] = useState(initialContent);

  const handleSave = () => {
    if (onSave) {
      onSave(content);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]" data-testid="edit-modal">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[200px] resize-none"
            placeholder="Digite o conteúdo aqui..."
            data-testid="textarea-edit-content"
          />
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} data-testid="button-cancel-edit">
            Cancelar
          </Button>
          <Button onClick={handleSave} data-testid="button-save-edit">
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
