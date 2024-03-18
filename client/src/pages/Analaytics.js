import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import axios from "axios";
import { userAnalytic } from "../services/operations/blogAPI";
import { useSelector } from "react-redux";
ChartJS.register(...registerables);

const Analytics = () => {
  const [userAnalytics, setUserAnalytics] = useState(null);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUserAnalytics = async () => {
      try {
        const response = await userAnalytic(token);
        setUserAnalytics(response.data.userAnalytics);
      } catch (error) {
        console.error("Error fetching user analytics:", error);
      }
    };

    fetchUserAnalytics();
  }, [token]);

  // Function to format user analytics data for the line chart
  const formatAnalyticsData = () => {
    if (!userAnalytics) return {};

    const data = {
      labels: ["Blogs", "Views", "Upvotes", "Downvotes", "Comments"],
      datasets: [
        {
          label: "User Analytics",
          data: [
            userAnalytics[0].totalBlogs,
            userAnalytics[0].totalViews,
            userAnalytics[0].totalUpvotes,
            userAnalytics[0].totalDownvotes,
            userAnalytics[0].totalComments,
          ],
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 2,
        },
      ],
    };

    return data;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Analytics</h2>
      {userAnalytics ? (
        <>
          <Line
            data={formatAnalyticsData()}
            options={{
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                ],
              },
            }}
          />
          <table className="mt-4 w-full border-collapse border border-gray-300">
            <tbody>
              <tr>
                <td className="px-4 py-2">Total Blogs</td>
                <td className="px-4 py-2">{userAnalytics[0]?.totalBlogs}</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Total Views</td>
                <td className="px-4 py-2">{userAnalytics[0]?.totalViews}</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Total Upvotes</td>
                <td className="px-4 py-2">{userAnalytics[0]?.totalUpvotes}</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Total Downvotes</td>
                <td className="px-4 py-2">
                  {userAnalytics[0]?.totalDownvotes}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">Total Comments</td>
                <td className="px-4 py-2">{userAnalytics[0]?.totalComments}</td>
              </tr>
            </tbody>
          </table>
        </>
      ) : (
        <p className="text-lg">No blogs yet.</p>
      )}
    </div>
  );
};

export default Analytics;
