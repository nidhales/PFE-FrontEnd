interface Field {
  name: string;
  label: string;
  type: 'text' | 'number' | 'password' | 'file';
  required: boolean;
}

export interface ModalProps {
  title: string;
  fields: Field[];
  handleClose: () => void;
  onSubmit: (formFields: any, id: string) => void;
  open: boolean;
  isSuccess: boolean;
  action: string;
  id?: string;
}
