"use client";
import React, { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import BottomProfile from "../component/bottomProfile";
import { SidebarButtonSkeleton } from "@/lib/suspenses";
import { menuItems } from "@/lib/constant";

const DashBoard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("dashboard");
  const [activeItemTitle, setActiveItemTitle] = useState("dashboard");

  const changeSection =async (value: string, label: string) => {
    setActiveItem(value);
    setActiveItemTitle(label);
    await router.push(`/${value}`);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50/50">
      <div
        className={`${
          isSidebarOpen ? "w-69" : "w-33"
        } transition-all duration-300 ease-in-out`}
      >
        <div
          className="fixed top-0 left-0 h-full bg-gradient-to-b from-indigo-900 via-purple-800 to-violet-900 shadow-2xl transition-all duration-300 ease-in-out z-50"
          style={{ width: isSidebarOpen ? "17rem" : "7rem" }}
        >
          <div className="flex items-center justify-between p-6 border-b border-purple-700/50">
            <div
              className={`flex items-center space-x-3 ${
                !isSidebarOpen && "justify-center"
              }`}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 via-purple-400 to-violet-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2ZM7 9C7 6.24 9.24 4 12 4S17 6.24 17 9C17 11.88 12 16.19 12 16.19S7 11.88 7 9Z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>
              {isSidebarOpen && (
                <div>
                  <h1 className="text-xl font-bold text-white">Truvenia</h1>
                  <p className="text-xs text-purple-300">Web3 Tourism</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 text-purple-300 hover:text-white hover:bg-purple-700/50 rounded-lg transition-colors"
            >
              {isSidebarOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
          <ScrollArea className="h-full w-full rounded-md pt-4   top-5 bottom-16 overflow-visible">
            <nav className="flex-1 px-4 py-3 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.id;

                return (
                  <Suspense key={item.id} fallback={<SidebarButtonSkeleton/>}>

                  <button
                    key={item.id}
                    onClick={() => changeSection(item.id, item.label)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                      isActive
                        ? "bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-cyan-500/20 text-white shadow-lg border border-violet-400/30"
                        : "text-purple-200 hover:text-white hover:bg-purple-700 cursor-pointer"
                    } ${!isSidebarOpen && "justify-center"}`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        isActive
                          ? "text-violet-300"
                          : "text-purple-300 group-hover:text-violet-300"
                      } transition-colors`}
                    />
                    {isSidebarOpen && (
                      <>
                        <span className="font-medium">{item.label}</span>
                        {isActive && (
                          <ChevronRight className="w-4 h-4 text-violet-300 ml-auto" />
                        )}
                      </>
                    )}

                    {isActive && (
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-violet-400 to-purple-500 rounded-r-full"></div>
                    )}
                  </button>
                    </Suspense>
                );

              })}
            </nav>

            <BottomProfile isSidebarOpen={isSidebarOpen} />
            <div className="absolute top-1/4 right-4 w-2 h-2 bg-violet-400/30 rounded-full animate-pulse"></div>
            <div className="absolute top-1/3 right-6 w-1 h-1 bg-purple-400/50 rounded-full animate-pulse delay-1000"></div>

            <div className="absolute bottom-1/4 right-3 w-3 h-3 bg-indigo-400/20 rounded-full animate-pulse delay-2000"></div>
          </ScrollArea>
        </div>
      </div>

      <div className="flex-1 relative">
          {children}
      </div>
    </div>
  );
};

export default DashBoard;
