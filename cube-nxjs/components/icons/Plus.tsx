export default function PlusIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
