import React, { useState } from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Card, 
  Typography, 
  Space,
  message
} from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, LoginOutlined } from '@ant-design/icons';
import { useAuth } from '@/contexts/AuthContext';

const { Title, Text } = Typography;

interface LoginFormProps {
  onToggleForm: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onToggleForm }) => {
  const [form] = Form.useForm();
  const { login, isLoading } = useAuth();

  const handleSubmit = async (values: { email: string; password: string }) => {
    const { email, password } = values;
    
    const success = await login(email, password);
    
    if (success) {
      message.success('Login realizado com sucesso!');
    } else {
      message.error('Email ou senha incorretos.');
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
            <LoginOutlined className="text-white text-xl" />
          </div>
          <Title 
            level={2} 
            className="!mb-2"
            style={{ 
              background: 'linear-gradient(to right, var(--brand-primary, #1890ff), var(--brand-secondary, #722ed1))',
              color: "white"
            }}
          >
            Bem-vindo de volta
          </Title>
          <Text 
            className="text-base"
            style={{ color: "white"}}
          >
            Entre com suas credenciais para acessar sua conta
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
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Por favor, insira seu email!' },
              { type: 'email', message: 'Por favor, insira um email válido!' }
            ]}
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
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </Form.Item>
        </Form>

        {/* Footer */}
        <div className="text-center">
          <Text type="secondary">
            Não tem uma conta?{' '}
            <Button 
              type="link" 
              onClick={onToggleForm}
              className="!p-0 !h-auto font-medium shadow-white underline"
            >
              Cadastre-se
            </Button>
          </Text>
        </div>
      </Card>
    </div>
  );
};