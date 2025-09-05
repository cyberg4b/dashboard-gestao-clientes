import { useState, useEffect } from "react";
import { Layout, Modal, message } from "antd";

import { useIsMobile } from "@/hooks/useIsMobile";
import {
  formatCpfCnpj,
  formatTelefone,
  validarCPF,
  validarCNPJ,
} from "@/utils/validators";

import { HeaderBar } from "@/components/layout/HeaderBar";
import { SidebarMenu } from "@/components/layout/SidebarMenu";
import { ClientTable } from "@/components/clients/ClientTable";
import { UserTable } from "@/components/users/UserTable";
import { ClientModal } from "@/components/clients/ClientModal";
import { UserModal } from "./users/UserModal";
import { useAuth } from "@/contexts/AuthContext";

const { Content } = Layout;

export const Dashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState("clientes");
  const [collapsed, setCollapsed] = useState(false);
  
  const [clientes, setClientes] = useState<any[]>([]);
  const [editingClient, setEditingClient] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [users, setUsers] = useState<any>([]);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);

  const isMobile = useIsMobile();
  const { user } = useAuth();

  const [clientFormData, setClientFormData] = useState({
    nome: "",
    cpfCnpj: "",
    telefone: "",
    email: "",
    tipo: "CPF",
  });

  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: false,
  });

  const handleAddUser = () => {
    setEditingUser(null);
    setUserFormData({ name: "", email: "", password: "", isAdmin: false });
    setIsUserModalVisible(true);
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setUserFormData(user);
    setIsUserModalVisible(true);
  };

  const handleSubmitUser = () => {
    const { name, email, password } = userFormData;
    if (!name || !email || !password) {
      message.error("Todos os campos são obrigatórios!");
      return;
    }

    if (editingUser) {
      setUsers(prev => prev.map(u => u.id === editingUser.id ? userFormData : u));
      message.success("Usuário atualizado com sucesso!");
    } else {
      setUsers(prev => [...prev, { ...userFormData, id: Date.now().toString() }]);
      message.success("Usuário adicionado com sucesso!");
    }

    setIsUserModalVisible(false);
  };


  useEffect(() => {
    const savedClientes = JSON.parse(localStorage.getItem("clientes") || "[]");
    setClientes(savedClientes);
  }, []);

  useEffect(() => {
    localStorage.setItem("clientes", JSON.stringify(clientes));
  }, [clientes]);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    if (savedUsers.length) {
      setUsers(savedUsers);
    } else {
      // Cria um usuário admin padrão
      const adminUser = {
        id: Date.now().toString(),
        name: "Admin",
        email: "admin@email.com",
        password: "$2b$10$9YD5b9vggAD9BgBK9DcuS./GfOU3PjcZhwcYSoT2gQLyYGwAPykuK",
        isAdmin: true,
      };
      setUsers([adminUser]);
      localStorage.setItem("users", JSON.stringify([adminUser]));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Validação do formulário
  const validateForm = () => {
    const { nome, cpfCnpj, telefone, email, tipo } = clientFormData;

    if (!nome.trim()) {
      message.error("Nome é obrigatório!");
      return false;
    }
    if (!cpfCnpj.trim()) {
      message.error("CPF/CNPJ é obrigatório!");
      return false;
    }
    const isDocValid = tipo === "CPF" ? validarCPF(cpfCnpj) : validarCNPJ(cpfCnpj);
    if (!isDocValid) {
      message.error(`${tipo} inválido!`);
      return false;
    }
    if (!telefone.trim()) {
      message.error("Telefone é obrigatório!");
      return false;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      message.error("Email inválido!");
      return false;
    }
    return true;
  };

  // Ações
  const handleAddClient = () => {
    setEditingClient(null);
    setClientFormData({
      nome: "",
      cpfCnpj: "",
      telefone: "",
      email: "",
      tipo: "CPF",
    });
    setIsModalVisible(true);
  };

  const handleEditClient = (client: any) => {
    setEditingClient(client);
    setClientFormData({
      ...client,
      cpfCnpj: formatCpfCnpj(client.cpfCnpj, client.tipo),
      telefone: formatTelefone(client.telefone),
    });
    setIsModalVisible(true);
  };

  const handleDeleteClient = (id: string) => {
    setClientes((prev) => prev.filter((client) => client.id !== id));
    message.success("Cliente excluído com sucesso!");
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const { nome, cpfCnpj, telefone, email, tipo } = clientFormData;
    const cleanCpfCnpj = cpfCnpj.replace(/\D/g, "");
    const cleanTelefone = telefone.replace(/\D/g, "");

    const clientData = {
      id: editingClient?.id || Date.now().toString(),
      nome,
      cpfCnpj: cleanCpfCnpj,
      telefone: cleanTelefone,
      email,
      tipo,
    };

    if (editingClient) {
      setClientes((prev) =>
        prev.map((client) => (client.id === editingClient.id ? clientData : client))
      );
      message.success("Cliente atualizado com sucesso!");
    } else {
      setClientes((prev) => [...prev, clientData]);
      message.success("Cliente adicionado com sucesso!");
    }

    setIsModalVisible(false);
  };

  const handleInputChange = (field: string, value: string) => {
    let processedValue = value;
    if (field === "cpfCnpj") {
      processedValue = formatCpfCnpj(value, clientFormData.tipo as "CPF" | "CNPJ");
    } else if (field === "telefone") {
      processedValue = formatTelefone(value);
    }
    setClientFormData((prev) => ({ ...prev, [field]: processedValue }));
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      {!isMobile && (
        <SidebarMenu selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
      )}

      {collapsed && isMobile && (
        <SidebarMenu
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          mobile
          onClose={() => setCollapsed(false)}
        />
      )}

      {/* Main */}
      <Layout>
        <HeaderBar
          isMobile={isMobile}
          selectedMenu={selectedMenu}
          onMenuToggle={() => setCollapsed(!collapsed)}
        />

        <Content style={{ margin: isMobile ? "12px" : "24px", overflowX: "auto" }}>
          {selectedMenu === "clientes" ? (
            <>
              <ClientTable
                clientes={clientes}
                onAdd={handleAddClient}
                onEdit={handleEditClient}
                onDelete={handleDeleteClient}
              />

              {/* Modal de cliente */}
              <Modal
                title={editingClient ? "Editar Cliente" : "Adicionar Cliente"}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={handleSubmit}
                width={isMobile ? "95vw" : 600}
                okText="Salvar"
                cancelText="Cancelar"
                centered={isMobile}
                style={isMobile ? { top: 20 } : {}}
              >
                <ClientModal
                  clientFormData={clientFormData}
                  onInputChange={handleInputChange}
                  setClientFormData={setClientFormData}
                  isMobile={isMobile}
                />
              </Modal>
            </>
          ) : (
            <>
              <UserTable
                users={users}
                currentUser={user}
                onAdd={handleAddUser}
                onEdit={handleEditUser}
                onDelete={(id) => setUsers(prev => prev.filter(u => u.id !== id))}
              />

              <Modal
                title={editingUser ? "Editar Usuário" : "Adicionar Usuário"}
                open={isUserModalVisible}
                onCancel={() => setIsUserModalVisible(false)}
                onOk={handleSubmitUser}
                width={isMobile ? "95vw" : 600}
                okText="Salvar"
                cancelText="Cancelar"
                centered={isMobile}
                style={isMobile ? { top: 20 } : {}}
              >
                <UserModal
                  userFormData={userFormData}
                  onInputChange={(field, value) => {
                    setUserFormData(prev => ({ ...prev, [field]: value }));
                  }}
                  setUserFormData={setUserFormData}
                  isMobile={isMobile}
                />
              </Modal>
            </>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};
