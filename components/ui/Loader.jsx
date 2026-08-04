export default function Loader({ size = "md", label = "Loading..." }) {
  const sizeClasses = {
    sm: "h-6 w-6 border-2",
    md: "h-10 w-10 border-[3px]",
    lg: "h-14 w-14 border-4",
  };

  const spinnerSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div
      className="flex flex-col items-center justify-center gap-3"
      role="status"
      aria-live="polite"
    >
      <div
        className={`${spinnerSize} rounded-full border-slate-300/40 border-t-blue-500 animate-spin`}
        aria-hidden="true"
      />
      <span className="text-sm text-slate-300">{label}</span>
    </div>
  );
}
