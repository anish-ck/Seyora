import React, { Suspense } from "react";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { SidebarButtonSkeleton } from "@/lib/suspenses";
const BottomProfile = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  return (
    <>
      {isSidebarOpen && (
        <div className="border-t border-purple-700/50 p-4 mt-20">
           <Suspense fallback={<SidebarButtonSkeleton/>}>
          <Button
            className={`w-full bottom-6 bg-purple-500 text-white hover:text-purple-600 flex items-center justify-start space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group relative${
              !isSidebarOpen && "justify-center"
            }`}
          >
            <SignedIn>
              <UserButton userProfileUrl="">
                <UserButton.MenuItems>
                  <UserButton.Action label="manageAccount" />
                </UserButton.MenuItems>
              </UserButton>
            </SignedIn>
            {isSidebarOpen && (
              <>
                <span className="font-bold  text-start">User Profile</span>
              </>
            )}
          </Button>
          </Suspense>

        </div>
      )}
    </>
  );
};

export default BottomProfile;
