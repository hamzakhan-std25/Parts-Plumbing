import Loader from "@/components/ui/Loader";

export default function Loading() {
  return (
    <main className="min-h-[50vh] flex items-center justify-center px-4">
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    </main>
  );
}
