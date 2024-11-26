import React from "react";
import { Sidebar } from "flowbite-react";
import { Link } from "react-router-dom";
import Dropdown from "./dropDown";
import { sidebarData } from "./dataSidebar";

const CustomSidebar = () => {
  return (
    <Sidebar aria-label="Sidebar with content separator">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {sidebarData.map((item, index) =>
            item.dropdown ? (
              <Dropdown
                key={index}
                label={item.label}
                icon={item.icon}
                children={item.children} // Kirim children ke Dropdown
              />
            ) : (
              <Sidebar.Item
                key={index}
                as={Link}
                to={item.to}
                icon={item.icon}
                className="hover:bg-white hover:text-teal-500 hover:border-teal-500 border border-transparent"
              >
                {item.label}
              </Sidebar.Item>
            )
          )}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default CustomSidebar;
