import Input from "@/components/input";
import { Register } from "@/services/auth";
import { RegisterRequest } from "@/types/interfaces/Request/registerRequest.interface";
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from "react";
import { getSession, signIn } from "next-auth/react";
import { clearCpfCnpj } from "@/utils/clearDocument";
import { toast } from "react-toastify";


const Auth = () => {
    const router = useRouter();

    const [documento, setDocumento] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [variant, setVariant] = useState('login');

    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
    }, []);

    useEffect(() => {

    }, [])

    const login = async () => {
        debugger
        const result = await signIn("credentials", {
            document: clearCpfCnpj(documento),
            password: password
        });

        if (result?.ok) {
            var session = await getSession();
            router.replace("")
        } else {
            toast(result?.error, { type: "error", autoClose: 2000 });
        }
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
            <div className="flex h-3/4 justify-center items-center">
                <div className="bg-white bg-opacity-90 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                    <h2 className="text-black text-4xl mb-8 font-semibold"> {variant == 'login' ? 'Login' : 'Registrar-se'}</h2>
                    <div className="flex flex-col gap-4">
                        {variant == 'register' && (
                            <Input
                                id="email"
                                type="text"
                                label="Email"
                                value={email}
                                onChange={(e: any) => setEmail(e.target.value)}
                            />
                        )}
                        <Input
                            id="documento"
                            type="text"
                            label="Documento"
                            value={documento}
                            onChange={(e: any) => setDocumento(e.target.value)}
                        />
                        <Input
                            id="password"
                            type="password"
                            label="Senha"
                            value={password}
                            onChange={(e: any) => setPassword(e.target.value)}
                        />
                        {variant == 'register' && (
                            <Input
                                id="confirmPassword"
                                type="password"
                                label="Confirme a senha"
                                value={confirmPassword}
                                onChange={(e: any) => setConfirmPassword(e.target.value)}
                            />
                        )}
                    </div>
                    <button className="bg-black py-3 text-white rounded-md w-full mt-10 hover:bg-black transition" onClick={variant == 'login' ? login : register}>
                        {variant == 'login' ? 'Entrar' : 'Registrar'}
                    </button>
                    <p className="text-neutral-500 mt-12">
                        {variant == 'login' ? 'Primeira vez aqui?' : 'Ja possui uma conta?'}
                        <span onClick={toggleVariant} className="text-black ml-1 hover:underline cursor-pointer">
                            {variant == 'login' ? 'Registre-se' : 'Entrar'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Auth;