import MainLayout from "../../layouts/MainLayout";

export default function Dashboard() {
  const role = localStorage.getItem("role");

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">

        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 hover:bg-emerald-500/10 hover:border-green-500 hover:shadow-xl">
          <h2 className="font-semibold">Welcome</h2>
          <p className="text-gray-600 mt-2">
            You are logged in as <b>{role}</b>
          </p>
        </div>

       <div className="bg-white border border-gray-200 rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 hover:bg-emerald-500/10 hover:border-green-500 hover:shadow-xl">
          <h2 className="font-semibold">Quick Action</h2>
          <p className="text-gray-600 mt-2">
            Go to Stores and rate them ⭐
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 hover:bg-emerald-500/10 hover:border-green-500 hover:shadow-xl">
          <h2 className="font-semibold">System Info</h2>
          <p className="text-gray-600 mt-2">
            RateMyStore App Running
          </p>
        </div>

      </div>
    </MainLayout>
  );
}