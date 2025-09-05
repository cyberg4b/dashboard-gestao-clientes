import { Card, Avatar, Typography, Dropdown } from "antd";
import { UserOutlined, LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import { useAuth } from "@/contexts/AuthContext";

const { Title } = Typography;

interface HeaderBarProps {
  isMobile: boolean;
  selectedMenu: string;
  onMenuToggle: () => void;
}

export const HeaderBar = ({ isMobile, selectedMenu, onMenuToggle }: HeaderBarProps) => {
  const { user, logout } = useAuth();

  return (
    <div
      style={{
        background: "#f5f7fa",
        padding: "0 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        height: "80px"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {isMobile ? (
          <span onClick={onMenuToggle} style={{ cursor: "pointer" }}>
            <MenuOutlined
            style={{
              fontSize: 15,
              marginLeft: 10
            }} 
            />
          </span>
        ) : (
          <Title level={3} style={{ margin: 0 }}>
            {selectedMenu === "clientes" ? "Clientes" : "Usuários"}
          </Title>
        )}
      </div>

      <Dropdown
        menu={{
          items: [
            {
              key: "logout",
              icon: <LogoutOutlined />,
              label: "Sair",
              onClick: logout,
              style: { color: "red" },
            },
          ],
        }}
        placement="bottomRight"
        trigger={["click"]}
      >
        <Card
          hoverable
          style={{
            borderRadius: 12,
            padding: "4px 12px",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            minWidth: 180,
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
            height: "55px"
          }}
          bodyStyle={{
            padding: 0,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <Avatar size="large" icon={<UserOutlined />} style={{ backgroundColor: "#1677ff" }} />
          <div style={{ lineHeight: 1.2 }}>
            <span style={{ fontWeight: 600, color: "#333" }}>{user.name.split(" ")[0]}</span>
            <br />
            <span style={{ fontSize: 12, color: "#888" }}>{user.email}</span>
          </div>
        </Card>
      </Dropdown>
    </div>
  );
};
