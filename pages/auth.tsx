'use client'

import { Register, Login } from "@/services/auth";
import { RegisterRequest } from "@/types/interfaces/Request/registerRequest.interface";
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { LoginRequest } from "@/types/interfaces/Request/loginRequest.interface";
import { Button, Card, Checkbox, Col, Drawer, Form, Input, Row } from "antd";
import { EyeInvisibleOutlined, EyeOutlined, EyeTwoTone, LockOutlined, UserOutlined } from "@ant-design/icons";

const Auth = () => {
    const router = useRouter();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [documento, setDocumento] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [variant, setVariant] = useState('login');

    const toggleVariant = useCallback(() => {
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
    }, []);

    const login = async () => {
        debugger
        const loginRequest: LoginRequest = { DocumentoFederal: documento, Password: password }

        const result = await Login(loginRequest, () => router.replace('/home'))
    };

    const register = async () => {
        debugger
        if (password !== confirmPassword) {
            toast('As senhas não são iguais', { hideProgressBar: true, autoClose: 2000, type: 'error' })
            return
        }

        const registerRequest: RegisterRequest = { DocumentoFederal: documento, Email: email, Password: password }

        const res = await Register(registerRequest);

        if (!res.ok) {
            toast('Erro ao cadastrar')
            return
        }

        toast('Cadastro realizado com sucesso', { type: 'success', autoClose: 2000 })
        setVariant('login')
    };

    return (
        <div className="relative h-full w-full bg-[url('/images/login-background.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <Row>
                <Col span={18}>
                    <Card style={{ marginLeft: 450, marginRight: 450, marginTop: 120 }}>
                        <h2 className="text-black text-4xl mb-8 font-semibold"> {variant == 'login' ? 'Login' : 'Registrar-se'}</h2>


                        <Form
                            style={{ marginTop: 50 }}
                            name="normal_login"
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                        >
                            {variant === 'register' &&
                                <Form.Item
                                    name="Email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Por favor insira seu email',
                                        },
                                        // {
                                        //     // pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/,
                                        //     message: 'Por favor insira um email válido'
                                        // }

                                    ]}
                                >
                                    <Input id="email"
                                        type="text"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e: any) => setEmail(e.target.value)}
                                    />
                                </Form.Item>
                            }
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Por favor insira seu Documento Federal!',
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Documento Federal"
                                    id="documento"
                                    type="text"
                                    value={documento}
                                    onChange={(e: any) => setDocumento(e.target.value)}
                                />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Por favor insira sua senha',
                                    },
                                ]}
                            >
                                <Input.Password
                                    id="password"
                                    type="password"
                                    placeholder="Senha"
                                    value={password}
                                    onChange={(e: any) => setPassword(e.target.value)}
                                />
                            </Form.Item>
                            {variant === 'register' &&

                                <Form.Item
                                    name="passwordConfirm"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Por favor insira sua senha',
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        id="confirmPassword"
                                        type="password"
                                        value={confirmPassword}
                                        placeholder="Confirmar senha"
                                        onChange={(e: any) => setConfirmPassword(e.target.value)}

                                    />
                                </Form.Item>
                            }

                            <Form.Item>
                                <Button size="large" style={{ width: '100%', backgroundColor: 'black', color: 'white' }} onClick={variant == 'login' ? login : register}  >
                                    {variant == 'login' ? 'Entrar' : 'Registrar'}
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                {variant == 'login' ? 'Primeira vez aqui?' : 'Ja possui uma conta?'}

                                <span onClick={toggleVariant} className="text-black ml-1 hover:underline cursor-pointer"> {variant == 'login' ? 'Registre-se' : 'Entrar'}</span>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Auth;