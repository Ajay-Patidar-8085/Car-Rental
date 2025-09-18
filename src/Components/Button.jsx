export default function Button({ children, onClick, className }) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 text-sm rounded-md font-medium text-white hover:bg-blue-700 transition w-fit ${className} `}
        >
            {children}
        </button>
    );
}
