import Card from "../../components/Card";
import Header from "./Header";

function Dashboard() {
  return (
    <div className="bg-[#F7F7F7] min-h-screen flex flex-col space-y-10 p-6">
      <Header />
      <Card>
        <div className="m-6 flex flex-col items-center space-y-6 w-full">
          <h1 className="max-w-lg text-center text-4xl font-bold">
            Boost Your Productivity With AI-Powered Planning
          </h1>
          <h4 className="text-sm font-bold text-gray-700">
            Organize tasks, track progress, and achieve more - effortlessly
          </h4>
          <div className="flex items-center space-x-4 font-semibold">
            <button
              className="bg-[#FA6F5E] hover:shadow-md shadow-black/70 transition-all duration-300 rounded-full px-6 py-3 text-white text-sm"
              onClick={() => console.log("Do something please")}
            >
              Start Free Trial
            </button>
            <button
              className="px-6 py-3 bg-white/25 backdrop-blur-lg text-gray-800 text-sm hover:shadow-md shadow-black/70 rounded-full"
              onClick={() => console.log("Do something please")}
            >
              Explore Features
            </button>
          </div>
          <div className="flex items-center justify-center rounded-3xl max-w-4xl w-full h-100 bg-white/50 backdrop-blur-lg">
            A Screenshot of the actual application
          </div>
        </div>
      </Card>

      <div className="flex flex-col items-center space-y-3">
        <h4 className="text-[#FA6F5E] font-semibold">Advantages</h4>
        <h2 className="text-gray-800 text-3xl font-semibold">
          3 Simple Steps to Organize Tasks
        </h2>
        <div className="flex w-full space-x-8">
          <Card>Card</Card>
          <div className="flex-1">Details</div>
        </div>
        <div className="flex w-full space-x-8">
          <div className="flex-1">Details</div>
          <Card>Card</Card>
        </div>
        <div className="flex w-full space-x-8">
          <Card>Card</Card>
          <div className="flex-1">Details</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
