"use client";
import { cn } from "@/lib/cn";
import { useContext } from "react";
import translate from "@/hooks/translate";
import AdminDashboardChart from "./AdminDashboardChart";
import { DashboardContext } from "@/contexts/DashboardProvider";
import getAppropriateGreeting from "@/lib/getAppropriateGreeting";

export default function AdminDashboard() {
  const t = translate();
  const { recentlyAddedAgents, recentlyAddedCustomers, session } =
    useContext(DashboardContext);

  return (
    <>
      <section className="mx-auto flex w-full max-w-4xl flex-col-reverse rounded-md bg-white p-4 px-12 lg:grid lg:grid-cols-[max-content_1fr] lg:grid-rows-1">
        <div className="flex flex-col justify-center gap-4">
          <div>
            <h2 className="text-2xl font-medium capitalize text-[var(--blue)]">
              {t(getAppropriateGreeting())}, {session.user.fullName}
            </h2>
            <p className="text-gray-600">
              {t("Here's what's happening with your store today!")}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div>
              <h3
                className={cn(
                  "text-2xl font-bold capitalize",
                  Number(recentlyAddedAgents) > 0 && "text-lime-900",
                )}
              >
                {recentlyAddedAgents}
              </h3>
              <p className="capitalize text-gray-600">
                {t("Agent's added today.")}
              </p>
            </div>

            <div>
              <h3
                className={cn(
                  "text-2xl font-bold capitalize",
                  Number(recentlyAddedCustomers) > 0 && "text-lime-900",
                )}
              >
                {recentlyAddedCustomers}
              </h3>
              <p className="text-gray-600">{t("Customer's added today.")}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end overflow-hidden px-8">
          <AdminDashboardChart />
        </div>
      </section>

      {/* All agents */}
    </>
  );
}
