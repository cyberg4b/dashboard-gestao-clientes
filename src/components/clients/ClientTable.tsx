import { Table, Button, Card, Typography, Space, Popconfirm } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Title } = Typography;

interface Client {
  id: string;
  nome: string;
  cpfCnpj: string;
  telefone: string;
  email: string;
  tipo: "CPF" | "CNPJ";
}

interface ClientTableProps {
  clientes: Client[];
  onAdd: () => void;
  onEdit: (client: Client) => void;
  onDelete: (id: string) => void;
}

export const ClientTable = ({ clientes, onAdd, onEdit, onDelete }: ClientTableProps) => {
  const columns = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
      sorter: (a: Client, b: Client) => a.nome.localeCompare(b.nome),
    },
    {
      title: "CPF/CNPJ",
      dataIndex: "cpfCnpj",
      key: "cpfCnpj",
    },
    {
      title: "Telefone",
      dataIndex: "telefone",
      key: "telefone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Tipo",
      dataIndex: "tipo",
      key: "tipo",
      filters: [
        { text: "CPF", value: "CPF" },
        { text: "CNPJ", value: "CNPJ" },
      ],
      onFilter: (value: any, record: Client) => record.tipo === value,
    },
    {
      title: "Ações",
      key: "actions",
      render: (_: any, record: Client) => (
        <Space>
          <Button type="text" icon={<EditOutlined />} onClick={() => onEdit(record)} />
          <Popconfirm
            title="Tem certeza que deseja excluir este cliente?"
            onConfirm={() => onDelete(record.id)}
            okText="Sim"
            cancelText="Não"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <Title level={3} style={{ margin: 0 }}>
          Gerenciamento de Clientes
        </Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
          Adicionar Cliente
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={clientes}
        rowKey="id"
        scroll={{ x: "max-content" }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />
    </Card>
  );
};
