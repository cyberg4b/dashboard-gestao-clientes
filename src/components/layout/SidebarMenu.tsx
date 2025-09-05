import React from "react";
import { Layout, Menu, Button, Typography } from "antd";
import { TeamOutlined, UserOutlined, CloseOutlined } from "@ant-design/icons";

const { Sider } = Layout;
const { Title } = Typography;

interface SidebarMenuProps {
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
  mobile?: boolean;
  onClose?: () => void;
}

export const SidebarMenu = ({
  selectedMenu,
  setSelectedMenu,
  mobile = false,
  onClose,
}: SidebarMenuProps) => {
  if (mobile) {
    return (
      <div className="absolute z-[1000] h-full w-full bg-[#001529]">
        <div className="p-5 text-center flex justify-between">
          <Title level={4} style={{ color: "white", margin: 0 }}>
            Dashboard
          </Title>
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={onClose}
            style={{
              color: "white",
              fontSize: 15,
              backgroundColor: "rgba(255,255,255,0.1)",
            }}
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedMenu]}
          onClick={({ key }) => setSelectedMenu(key)}
        >
          <Menu.Item key="clientes" icon={<TeamOutlined />}>
            Clientes
          </Menu.Item>
          <Menu.Item key="usuarios" icon={<UserOutlined />}>
            Usuários
          </Menu.Item>
        </Menu>
      </div>
    );
  }

  return (
    <Sider width={250} theme="dark">
      <div style={{ padding: "20px", textAlign: "center" }}>
        <Title level={4} style={{ color: "white", margin: 0 }}>
          Dashboard
        </Title>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedMenu]}
        onClick={({ key }) => setSelectedMenu(key)}
      >
        <Menu.Item key="clientes" icon={<TeamOutlined />}>
          Clientes
        </Menu.Item>
        <Menu.Item key="usuarios" icon={<UserOutlined />}>
          Usuários
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
