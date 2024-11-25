import React from "react";
import { Sidebar } from "flowbite-react";
import Dashboard from "./DashboardMenu";
import ListPegawaiMenu from "./ListPegawaiMenu";
import PegawaiInaktifMenu from "./PegawaiInaktifMenu";
import JabatanKosongMenu from "./JabatanKosongMenu";

const CustomSidebar = () => {
  return (
    <Sidebar aria-label="Sidebar with content separator">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <DashboardMenu />
          <ListPegawaiMenu />
          <PegawaiInaktifMenu />
          <JabatanKosongMenu />
          {/* Tambahkan menu lainnya */}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default CustomSidebar;
