import { API_ENDPOINTS } from "@/config/api";
import { LoginRequest } from "@/types/interfaces/Request/loginRequest.interface";
import { RegisterRequest } from "@/types/interfaces/Request/registerRequest.interface";

export async function Login(request: LoginRequest, routerPush: Function) {
    var Url = API_ENDPOINTS.LOGIN;

    try {
        console.log('login endpoint', Url);

        await fetch(Url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request)
        }).then(async (response) => {
            if (response.status == 200) {
                var data = await response.json() as ILoginResponse;
                localStorage.setItem("Authentication", JSON.stringify(data));
                routerPush();
            }
        }, (error) => {
            console.log(error);
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