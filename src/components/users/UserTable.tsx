import { Table, Button, Card, Typography, Space, Popconfirm, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Title } = Typography;

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface UserTableProps {
  users: User[];
  currentUser: User; // usuário logado
  onAdd?: () => void;
  onEdit?: (user: User) => void;
  onDelete?: (id: string) => void;
}

export const UserTable = ({ users, currentUser, onAdd, onEdit, onDelete }: UserTableProps) => {
  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      sorter: (a: User, b: User) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Perfil",
      dataIndex: "isAdmin",
      key: "isAdmin",
      render: (isAdmin: boolean) => (isAdmin ? "Admin" : "Usuário"),
    },
    {
      title: "Ações",
      key: "actions",
      render: (_: any, record: User) => {
        if (!currentUser.isAdmin) return null; // apenas admins veem ações
        return (
          <Space>
            <Button type="text" icon={<EditOutlined />} onClick={() => onEdit?.(record)} />
            <Popconfirm
              title="Tem certeza que deseja excluir este usuário?"
              onConfirm={() => {
                if (onDelete) {
                  onDelete(record.id);
                  message.success("Usuário excluído com sucesso!");
                }
              }}
              okText="Sim"
              cancelText="Não"
            >
              <Button type="text" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        );
      },
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
        <Title level={3}>Gerenciamento de Usuários</Title>
        {currentUser.isAdmin && (
          <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
            Adicionar Usuário
          </Button>
        )}
      </div>

      <Table
        columns={columns}
        dataSource={users}
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
