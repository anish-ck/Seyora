"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { TouristColumn } from "./column"; // Import TouristColumn type

interface UserDetailsPopUpProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  user: TouristColumn | null;
}

const UserDetailsPopUp: React.FC<UserDetailsPopUpProps> = ({
  isOpen,
  onOpenChange,
  user,
}) => {
  if (!user) return null; // Don't render if no user is selected

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-neutral-800 text-neutral-100 border-neutral-700 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            User Details
          </DialogTitle>
          <DialogDescription className="text-neutral-400 text-center">
            Detailed information for {user.useremail}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="text-neutral-300 text-right">Email:</span>
            <span className="col-span-2 font-medium text-neutral-50">
              {user.useremail}
            </span>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="text-neutral-300 text-right">Place:</span>
            <span className="col-span-2 font-medium text-neutral-50">
              {user.place}
            </span>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="text-neutral-300 text-right">Days Left:</span>
            <span className="col-span-2 font-medium text-neutral-50">
              {user.timeLeft}
            </span>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="text-neutral-300 text-right">Trip Duration:</span>
            <span className="col-span-2 font-medium text-neutral-50">
              {user.numberOfDays}
            </span>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="text-neutral-300 text-right">Status:</span>
            <span className="col-span-2 font-medium text-neutral-50">
              {user.status}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsPopUp;
