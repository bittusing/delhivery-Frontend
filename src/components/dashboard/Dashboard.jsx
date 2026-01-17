import UpcomingPickups from "../UpcomingPickups";
import PerformanceGraph from "./PerformanceGraph";
import Topheader from "./Topheader";
import UpcomingPickupsCard from "./UpcomingPickupsCard";
import YourPerformanceCard from "./YourPerformanceCard";

const Dashboard = () => {
 

  return (
    <div className="min-h-screen">
      <Topheader />
      <UpcomingPickupsCard />
      {/* <UpcomingPickups /> */}
      <PerformanceGraph />
      {/* <YourPerformanceCard data={mockChartData} title="Your Performance" /> */}
    </div>
  );
};

export default Dashboard;
