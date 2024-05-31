import { API_ENDPOINTS } from "@/config/api";
import { LoginRequest } from "@/types/interfaces/Request/loginRequest.interface";
import { RegisterRequest } from "@/types/interfaces/Request/registerRequest.interface";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export async function Login(request: LoginRequest, routerPush: Function) {
    try {
        debugger
        await fetch(API_ENDPOINTS.LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request)
        }).then(async (response) => {
            debugger
            if (response.status == 200) {
                var data = await response.json() as ILoginResponse;
                localStorage.setItem("Authentication", JSON.stringify(data));
                toast.success('Login efetuado com sucesso!')
                routerPush()
            } else if (response.status == 400) {
                var errorData = await response.json()
                toast.error(`${errorData.message}`)
            }
        });

    } catch (error) {
        console.log(error);
    }
}

export async function Register(request: RegisterRequest) {
    debugger
    return await fetch(API_ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)
    });
}