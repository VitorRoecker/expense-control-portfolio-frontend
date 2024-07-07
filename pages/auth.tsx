import { Register, Login } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LoginRequest } from "@/types/interfaces/Request/Auth/loginRequest.interface";
import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import { RegisterRequest } from "@/types/interfaces/Request/Auth/registerRequest.interface";

const Auth = () => {
  const router = useRouter();
  const [documento, setDocumento] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [form] = Form.useForm();

  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    onReset();
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, [form]);

  const login = async () => {
    const loginRequest: LoginRequest = {
      DocumentoFederal: documento,
      Password: password,
    };

    const result = await Login(loginRequest, () => router.replace("/home"));
  };

  const register = async () => {
    if (password !== confirmPassword) {
      toast("As senhas não são iguais", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "error",
      });
      return;
    }

    const registerRequest: RegisterRequest = {
      DocumentoFederal: documento,
      Email: email,
      Password: password,
    };

    await Register(registerRequest);

    toggleVariant()
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className="relative h-full w-full bg-[url('/images/login-background.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <Row
        justify="center"
        align="middle"
        style={{ minHeight: "100vh", padding: "0 20px" }}
      >
        <Col xs={24} sm={20} md={16} lg={12} xl={10} xxl={8}>
          <Card style={{ maxWidth: "100%", marginTop: 20 }}>
            <Typography
              className="text-black text-4xl font-semibold"
              style={{ textAlign: "center" }}
            >
              {variant === "login" ? "Login" : "Registrar-se"}
            </Typography>
            <Form
              form={form}
              style={{ marginTop: 30 }}
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
            >
              {variant === "register" && (
                <Form.Item
                  name="Email"
                  rules={[
                    {
                      type: "email",
                      message: "O E-mail informado não é válido!",
                    },
                    {
                      required: true,
                      message: "Por favor, insira seu E-mail!",
                    },
                  ]}
                >
                  <Input
                    id="email"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>
              )}
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Por favor insira seu Documento Federal!",
                  },
                ]}
              >
                <Input
                  placeholder="Documento Federal"
                  id="documento"
                  type="text"
                  value={documento}
                  onChange={(e) => setDocumento(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Por favor insira sua senha",
                  },
                  {
                    validator: (_, value) => {
                      const passwordRegex =
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
                      if (!passwordRegex.test(value)) {
                        return Promise.reject(
                          new Error(
                            "A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais"
                          )
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input.Password
                  id="password"
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
              {variant === "register" && (
                <Form.Item
                  name="passwordConfirm"
                  rules={[
                    {
                      required: true,
                      message: "Por favor confirme sua senha",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("As senhas não estão iguais!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    placeholder="Confirmar senha"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Item>
              )}

              <Form.Item>
                <Button
                  size="large"
                  style={{
                    width: "100%",
                    backgroundColor: "black",
                    color: "white",
                  }}
                  onClick={variant === "login" ? login : register}
                >
                  {variant === "login" ? "Entrar" : "Registrar"}
                </Button>
              </Form.Item>
              <Form.Item style={{ textAlign: "center" }}>
                {variant === "login"
                  ? "Primeira vez aqui?"
                  : "Já possui uma conta?"}
                <span
                  onClick={toggleVariant}
                  className="text-black ml-1 hover:underline cursor-pointer"
                >
                  {variant === "login" ? "Registre-se" : "Entrar"}
                </span>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Auth;
