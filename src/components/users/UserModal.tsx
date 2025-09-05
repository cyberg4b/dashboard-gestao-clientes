import React from "react";
import { Input, Row, Col, Select } from "antd";

const { Option } = Select;

interface UserFormData {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

interface UserModalProps {
  userFormData: UserFormData;
  onInputChange: (field: string, value: string) => void;
  setUserFormData: React.Dispatch<React.SetStateAction<UserFormData>>;
  isMobile: boolean;
}

export const UserModal = ({
  userFormData,
  onInputChange,
  setUserFormData,
  isMobile,
}: UserModalProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>Nome *</label>
        <Input
          placeholder="Nome completo"
          value={userFormData.name}
          onChange={(e) => onInputChange("name", e.target.value)}
        />
      </div>

      <Row gutter={isMobile ? 8 : 16}>
        <Col xs={24} sm={12}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>Email *</label>
          <Input
            placeholder="usuario@email.com"
            value={userFormData.email}
            onChange={(e) => onInputChange("email", e.target.value)}
            type="email"
          />
        </Col>
        <Col xs={24} sm={12}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>Perfil *</label>
            <Select
            value={userFormData.isAdmin ? "Admin" : "Usuário"}
            style={{ width: "100%" }}
            onChange={(value) => setUserFormData(prev => ({ ...prev, isAdmin: value === "Admin" }))}
            >
            <Option value="Admin">Admin</Option>
            <Option value="Usuário">Usuário</Option>
            </Select>
        </Col>
      </Row>

    </div>
  );
};
