const ContinueButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="w-full bg-white text-black py-2 rounded-md font-bold hover:bg-gray-200 transition"
  >
    Continue to Dashboard
  </button>
);

export default ContinueButton;
