import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import NavBar from "@/features/nav/NavBar";
import logo from '../../assets/x logo.png';

import React from "react";

const projectsData = [
  {
    id: 1,
    name: "Automatisch",
    lastScan: "2025-07-20",
    icon: logo,
  },
  {
    id: 2,
    name: "Xployt.ai",
    lastScan: "2024-06-2",
    icon: logo,
  },
];

const Dashboard = (): JSX.Element => {
  return (
    <div>
      <NavBar />
      <div className="bg-[#000000]  w-full min-h-screen p-8">
      <div className="bg-[#000000] flex flex-row justify-center w-full ">
        <div className="flex flex-col w-[948px] items-start gap-8 relative">
          <div className="flex items-start justify-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex h-[52px] items-center justify-around gap-9 relative flex-1 grow rounded-lg border border-solid border-gray-600">
              <div className="flex-col items-start gap-[23px] flex-1 grow flex relative">
                <div className="flex items-center gap-2 p-4 relative self-stretch w-full flex-[0_0_auto] rounded-md">
              <div className="relative w-4 h-4 opacity-50">
                <Search className="w-4 h-4 text-gray-600" />
              </div>
<Input
  placeholder="Search Projects ..."
  className="border-0 bg-transparent text-muted-foreground text-sm font-medium focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
/>

            </div>
          </div>
        </div>

        <Button className="h-12 bg-white text-black text-sm font-medium rounded-lg hover:bg-white/90">
          Start Scan
        </Button>

      </div>

      <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
<h2 className="text-lg font-semibold text-white tracking-tight">
  Projects
</h2>


        {projectsData.map((project) => (
          <Card
            key={project.id}
            className="items-center justify-between px-[22px] py-4 self-stretch w-full flex-[0_0_auto] bg-[#ffffff0d] rounded-lg border border-solid border-gray-600 backdrop-blur-[100px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(100px)_brightness(100%)]"
          >
            <CardContent className="flex items-center justify-between w-full p-0">
              <div className="inline-flex items-center gap-4 relative self-stretch flex-[0_0_auto]">
                <img
                  className="relative w-[42px] h-9 object-cover"
                  alt={`${project.name} logo`}
                  src={project.icon}
                />

                <div className="inline-flex flex-col items-start justify-center relative flex-[0_0_auto]">
<div className="text-white text-base font-medium leading-tight">
  {project.name}
</div>


                  <div className="inline-flex items-start gap-1 relative flex-[0_0_auto]">
<span className="text-muted-foreground text-sm font-medium">
  Last scan -
</span>
<span className="text-muted-foreground text-sm font-medium">
  {project.lastScan}
</span>

                  </div>
                </div>
              </div>

            <Button className="h-12 bg-slate-200 text-black text-sm font-medium rounded-lg hover:bg-slate-200/90">
              Scan Again
            </Button>

            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    </div>
    </div>
      </div>
  );
};

export default Dashboard;
