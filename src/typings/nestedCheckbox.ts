// {
//     "id": "1",
//     "name": "Parent 1",
//     "isChecked": true,
//     "children": [
//       {

interface CheckboxBasic {
  id: string;
  name: string;
  isChecked: boolean;
}

export type CheckBoxDataType = CheckboxBasic & {
  children?: CheckboxBasic[];
};
