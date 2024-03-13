export function Button({ label, onClick }) {
    return (
        <button onClick={onClick} type="button" className="text-white py-2.5 mt-3 font-medium rounded-lg text-sm px-5  me-2 mb-2 dark:bg-gray-800 dark:border-gray-700">
            {label}</button>
    )
}