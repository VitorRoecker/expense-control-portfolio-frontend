import Input from "@/components/input";
import { useCallback, useState } from "react";

const Auth = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [variant, setVariant] = useState('login');

    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
    }, []);

    return (
        <div className="relative h-full w-full bg-[url('/images/login-background.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="flex h-3/4 justify-center items-center">
                <div className="bg-white bg-opacity-90 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                    <h2 className="text-black text-4xl mb-8 font-semibold"> {variant == 'login' ? 'Sign in' : 'Register'}</h2>
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
                    <button className="bg-black py-3 text-white rounded-md w-full mt-10 hover:bg-black transition">
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