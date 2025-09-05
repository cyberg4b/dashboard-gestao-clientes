import React from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Card, 
  Typography, 
  message 
} from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserAddOutlined } from '@ant-design/icons';
import { useAuth } from '@/contexts/AuthContext';

const { Title, Text } = Typography;

interface RegisterFormProps {
  onToggleForm: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onToggleForm }) => {
  const [form] = Form.useForm();
  const { register, isLoading } = useAuth();

  const handleSubmit = async (values: { name: string; email: string; password: string; confirmPassword: string }) => {
    const { name, email, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      message.error('As senhas não coincidem.');
      return;
    }

    if (password.length < 6) {
      message.error('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    const success = await register(name, email, password);

    if (success) {
      message.success('Conta criada com sucesso! Você já está logado.');
    } else {
      message.error('Este email já está sendo usado.');
    }
  };

  const handleSubmitFailed = () => {
    message.error('Por favor, preencha todos os campos.');
  };

  return (
    <div className="w-[360px] max-w-md">
      <Card
        className="backdrop-blur-lg bg-auth-card border-0 shadow-2xl"
        style={{
          background: 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(10px)',
          border: 'none'
        }}
      >
        {/* Header */}
        <div className="text-center pb-6">
          <div className="mx-auto w-12 h-12 bg-[#1677FF] rounded-xl flex items-center justify-center mb-4 shadow-[var(--shadow-glow)]">
            <UserAddOutlined className="text-white text-xl" />
          </div>
          <Title
            level={2}
            className="!mb-2"
            style={{
              background: 'linear-gradient(to right, var(--brand-primary, #1890ff), var(--brand-secondary, #722ed1))',
              color: "white"
            }}
          >
            Criar conta
          </Title>
          <Text 
            className="text-base"
            style={{ color: "white" }}
            >
            Preencha os dados para criar sua conta
          </Text>
        </div>

        {/* Form */}
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          onFinishFailed={handleSubmitFailed}
          size="small"
        >
          <Form.Item
            label="Nome completo"
            name="name"
            rules={[{ required: true, message: 'Por favor, insira seu nome!' }]}
          >
            <Input
              placeholder="Seu nome"
              className="bg-auth-input border-1 h-11"
              disabled={isLoading}
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Por favor, insira seu email!' },
              { type: 'email', message: 'Por favor, insira um email válido!' }
            ]}
            // style={{ marginBottom: 25 }}
          >
            <Input
              placeholder="seu@email.com"
              className="bg-auth-input border-1 h-11"
              disabled={isLoading}
            />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="password"
            rules={[
              { required: true, message: 'Por favor, insira sua senha!' },
              { min: 6, message: 'A senha deve ter pelo menos 6 caracteres!' }
            ]}
            // style={{ marginBottom: 25 }}
          >
            <Input.Password
              placeholder="••••••••"
              className="bg-auth-input border-1 h-11"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              disabled={isLoading}
            />
          </Form.Item>

          <Form.Item
            label="Confirmar senha"
            name="confirmPassword"
            rules={[{ required: true, message: 'Por favor, confirme sua senha!' }]}
            style={{ marginBottom: 40 }}
          >
            <Input.Password
              placeholder="••••••••"
              className="bg-auth-input border-1 h-11"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              disabled={isLoading}
            />
          </Form.Item>

          <Form.Item className="!mb-4">
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              className="w-full h-11 font-medium rounded-lg"
            >
              {isLoading ? 'Criando conta...' : 'Criar conta'}
            </Button>
          </Form.Item>
        </Form>

        {/* Footer */}
        <div className="text-center">
          <Text type="secondary">
            Já tem uma conta?{' '}
            <Button
              type="link"
              onClick={onToggleForm}
              className="!p-0 !h-auto font-medium"
            >
              Entrar
            </Button>
          </Text>
        </div>
      </Card>
    </div>
  );
};
