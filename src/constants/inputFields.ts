import { InputFields } from "@/types/type";

export const inputFields: InputFields[] = [
  { label: 'Name', type: 'text', value: '', onChange: () => {}, placeholder: 'Name' },
  { label: 'Email', type: 'email', value: '', onChange: () => {}, placeholder: 'Email' },
  { label: 'Password', type: 'password', value: '', onChange: () => {}, placeholder: 'Password' },
  { label: 'Confirm Password', type: 'password', value: '', onChange: () => {}, placeholder: 'Confirm Password' },
];
