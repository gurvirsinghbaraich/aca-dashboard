"use client";

import { useContext } from "react";
import {
  DashboardContext,
  DashboardContextProps,
} from "@/contexts/DashboardProvider";
import { Doughnut } from "react-chartjs-2";

// Registering Components
import { ArcElement, Chart } from "chart.js";
Chart.register([ArcElement]);

export default function AdminDashboardChart() {
  const { recentlyAddedAgents, recentlyAddedCustomers } =
    useContext<DashboardContextProps>(DashboardContext);

  return (
    <div className="aspect-square w-full max-w-96">
      <Doughnut
        data={{
          datasets: [
            {
              data: [recentlyAddedAgents, recentlyAddedCustomers],
            },
          ],
        }}
      />
    </div>
  );
}
