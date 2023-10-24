import Input from "@/components/input";
import { API_ENDPOINTS } from "@/config/api";
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from "react";

const Auth = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [variant, setVariant] = useState('login');

    const router = useRouter();

    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
    }, []);

    useEffect(() => {

    }, [])

    const login = useCallback(async () => {
        try {
            const loginRequest: LoginRequest = { Name: name, Password: password }
            console.log('login endpoint', API_ENDPOINTS.LOGIN);

            await fetch(API_ENDPOINTS.LOGIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginRequest)
            }).then(async (response) => {
                if (response.status == 200) {
                    var data = await response.json() as ILoginResponse;
                    localStorage.setItem("Authentication", JSON.stringify(data));
                    router.push("/home")
                }
            }, (error) => {
                console.log(error);
            });

        } catch (error) {

        }

    }, [email, password,]);

    const register = useCallback(async () => { }, []);

    return (
        <div className="relative h-full w-full bg-[url('/images/login-background.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="flex h-3/4 justify-center items-center">
                <div className="bg-white bg-opacity-90 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                    <h2 className="text-black text-4xl mb-8 font-semibold"> {variant == 'login' ? 'Sign In' : 'Sign Up'}</h2>
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
                            id="name"
                            type="text"
                            label="Username"
                            value={name}
                            onChange={(e: any) => setName(e.target.value)}
                        />
                        <Input
                            id="name"
                            type="password"
                            label="Password"
                            value={password}
                            onChange={(e: any) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="bg-black py-3 text-white rounded-md w-full mt-10 hover:bg-black transition" onClick={variant == 'login' ? login : register}>
                        {variant == 'login' ? 'Login' : 'Sign up'}
                    </button>
                    <p className="text-neutral-500 mt-12">
                        {variant == 'login' ? 'First time using?' : 'Already have an account?'}
                        <span onClick={toggleVariant} className="text-black ml-1 hover:underline cursor-pointer">
                            {variant == 'login' ? 'Create an account' : 'Login'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Auth;