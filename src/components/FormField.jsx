export default function FormField({
  label,
  name,
  value,
  onChange,
  type = "text",
  isTextarea = false,
}) {
  return (
    <section
      className={`flex flex-col ${isTextarea ? "col-span-3" : ""} w-full`}
    >
      <label htmlFor={name} className="text-white">
        {label}
      </label>
      {isTextarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          rows={4}
          className="bg-white border border-gray-500 rounded-lg px-2 py-1"
        />
      ) : (
        <input
          type={type}
          className="bg-white border border-gray-500 rounded-lg px-2 py-1"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
        />
      )}
    </section>
  );
}
