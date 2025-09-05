import React from "react";
import { Input, Row, Col, Select } from "antd";
import { UserOutlined, PhoneOutlined, MailOutlined, IdcardOutlined } from "@ant-design/icons";

const { Option } = Select;

interface ClientFormData {
  nome: string;
  cpfCnpj: string;
  telefone: string;
  email: string;
  tipo: "CPF" | "CNPJ";
}

interface ClientModalProps {
  clientFormData: ClientFormData;
  onInputChange: (field: string, value: string) => void;
  setClientFormData: React.Dispatch<React.SetStateAction<ClientFormData>>;
  isMobile: boolean;
}

export const ClientModal = ({
  clientFormData,
  onInputChange,
  setClientFormData,
  isMobile,
}: ClientModalProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>
          Nome *
        </label>
        <Input
          prefix={<UserOutlined />}
          placeholder="Nome completo"
          value={clientFormData?.nome}
          onChange={(e) => onInputChange("nome", e.target.value)}
        />
      </div>

      <Row gutter={isMobile ? 8 : 16}>
        <Col xs={24} sm={8}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>
            Tipo *
          </label>
          <Select
            value={clientFormData?.tipo}
            style={{ width: "100%" }}
            onChange={(value) =>
              setClientFormData((prev) => ({ ...prev, tipo: value, cpfCnpj: "" }))
            }
          >
            <Option value="CPF">CPF</Option>
            <Option value="CNPJ">CNPJ</Option>
          </Select>
        </Col>
        <Col xs={24} sm={16}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>
            CPF/CNPJ *
          </label>
          <Input
            prefix={<IdcardOutlined />}
            placeholder={
              clientFormData?.tipo === "CPF" ? "000.000.000-00" : "00.000.000/0000-00"
            }
            value={clientFormData?.cpfCnpj}
            onChange={(e) => onInputChange("cpfCnpj", e.target.value)}
            maxLength={clientFormData?.tipo === "CPF" ? 14 : 18}
          />
        </Col>
      </Row>

      <Row gutter={isMobile ? 8 : 16}>
        <Col xs={24} sm={12}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>
            Telefone *
          </label>
          <Input
            prefix={<PhoneOutlined />}
            placeholder="(11) 99999-9999"
            value={clientFormData?.telefone}
            onChange={(e) => onInputChange("telefone", e.target.value)}
            maxLength={15}
          />
        </Col>
        <Col xs={24} sm={12}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>
            Email *
          </label>
          <Input
            prefix={<MailOutlined />}
            placeholder="cliente@email.com"
            value={clientFormData?.email}
            onChange={(e) => onInputChange("email", e.target.value)}
            type="email"
          />
        </Col>
      </Row>
    </div>
  );
};
