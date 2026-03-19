import Header from "@/components/header";

export default function Loading() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-[#5FBA51] border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
}
