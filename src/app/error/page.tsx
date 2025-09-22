export default function ErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-8 shadow-md">
        <h1 className="text-2xl font-bold text-red-600">An Error Occurred</h1>
        <p className="mt-4 text-gray-700">
          Something went wrong. Please try again later.
        </p>
      </div>
    </div>
  );
}
