interface FormInputProps {
  label: string;
  type: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  name: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  placeholder,
  onChange,
  value,
  name,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">{label}</label>
      <input
        onChange={onChange}
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default FormInput;
