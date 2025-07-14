const Input = ({ label, ...props }) => (
  <div className="mb-4">
    {label && <label className="block text-sm font-semibold mb-1">{label}</label>}
    <input
      {...props}
      className="w-full p-2 rounded-md bg-black border border-gray-700 text-white"
    />
  </div>
);

export default Input;
