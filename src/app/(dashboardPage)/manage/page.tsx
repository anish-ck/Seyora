"use client";
import { Column, TouristColumn } from "@/modules/management/compoenents/column";
import { DataTable } from "@/modules/management/compoenents/data-table";
import ManageNavbar from "@/modules/management/compoenents/navbar";
import React, { useState, useEffect } from "react"; // Import useState and useEffect
import { trpc } from "@/trpc/client"; // Use client-side trpc
import { Tourists } from "@/db/schema";
import UserDetailsPopUp from "@/modules/management/compoenents/UserDetailsPopUp"; // Import new component

async function getLocalData(): Promise<TouristColumn[]> {
  return [
    {
      useremail: "john@example.com",
      place: "Bali",
      timeLeft: "3 days",
      numberOfDays: "5 days",
      status: "ACTIVE",
    },
    {
      useremail: "emma@example.com",
      place: "Paris",
      timeLeft: "15 days",
      numberOfDays: "10 days",
      status: "ACTIVE",
    },
    {
      useremail: "raj@example.com",
      place: "Goa",
      timeLeft: "30 days",
      numberOfDays: "7 days",
      status: "CLOSE",
    },
    {
      useremail: "lisa@example.com",
      place: "New York",
      timeLeft: "2 days",
      numberOfDays: "3 days",
      status: "ACTIVE",
    },
    {
      useremail: "ahmed@example.com",
      place: "Dubai",
      timeLeft: "Expired",
      numberOfDays: "6 days",
      status: "CLOSE",
    },
  ];
}

const Management = () => {
  const [showUserDetailsPopup, setShowUserDetailsPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState<TouristColumn | null>(null);
  const [tableData, setTableData] = useState<TouristColumn[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleRowClick = (user: TouristColumn) => {
    setSelectedUser(user);
    setShowUserDetailsPopup(true);
  };
  // Use the client-side tRPC query hook directly in the component
  const {
    data: trpcUsers,
    isLoading: trpcLoading,
    error: trpcError,
  } = trpc.manageusers.getAllUsers.useQuery();

  // Client-side data fetching with useEffect
  useEffect(() => {
    if (trpcUsers) {
      const currentDate = Date.now();
      const processedUsers: TouristColumn[] = trpcUsers.map(
        (user: typeof Tourists.$inferSelect) => {
          console.log("user trip End",user.tripEnd);
          const timeLeftMs = user.tripEnd - currentDate;
          console.log("Time Left", timeLeftMs);
          const daysLeft = Math.ceil(timeLeftMs / (1000 * 60 * 60 * 24));
          const timeLeftString = daysLeft > 0 ? `${daysLeft} days` : "0 days";
          console.log("result", timeLeftString)
          return {
            useremail: user.email,
            place: user.Triplocation,
            timeLeft: timeLeftString,
            numberOfDays: user.TripDuration,
            status: user.status,
          };
        }
      );
      setTableData(processedUsers);
      setIsLoading(false);
    } else if (trpcError) {
      console.error("Failed to fetch data from tRPC:", trpcError);
      // Fallback to local data on tRPC error
      getLocalData().then((data) => {
        setTableData(data);
        setIsLoading(false);
      });
    } else if (!isLoading && !trpcUsers) {
      // This handles the initial loading state when trpcUsers is undefined but not an error
      getLocalData().then((data) => {
        setTableData(data);
        setIsLoading(false);
      });
    }
  }, [trpcUsers, trpcError, isLoading]);

  // Update isLoading based on trpcLoading
  useEffect(() => {
    setIsLoading(trpcLoading);
  }, [trpcLoading]);

  return (
    <div className="flex flex-col gap-7  text-white ">
      <ManageNavbar />
      <div className="container mx-auto mt-14 px-12 ">
        {isLoading ? (
          <div>Loading users...</div> // Simple loading indicator
        ) : (
          <DataTable
            data={tableData}
            columns={Column}
            onRowClick={handleRowClick}
          />
        )}
      </div>
      <UserDetailsPopUp
        isOpen={showUserDetailsPopup}
        onOpenChange={setShowUserDetailsPopup}
        user={selectedUser}
      />
    </div>
  );
};

export default Management;
