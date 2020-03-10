export interface FormTemplate {
  type: string;
  title: string;
  description?: string;
  fields: {
    name: string;
    type: string;
    key?: string;
    placeholder?: string;
  }[];
  submit: string;
}
