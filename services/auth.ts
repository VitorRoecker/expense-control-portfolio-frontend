import { API_ENDPOINTS } from "@/config/api";
import { LoginRequest } from "@/types/interfaces/Request/Auth/loginRequest.interface";
import { RegisterRequest } from "@/types/interfaces/Request/Auth/registerRequest.interface";
import { BadRequestInterface } from "@/types/interfaces/Response/badRequestResponse.interface";
import { toast } from "react-toastify";

export async function Login(request: LoginRequest, routerPush: Function) {
  try {
    await fetch(API_ENDPOINTS.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    }).then(async (response) => {
      if (response.status == 200) {
        var data = (await response.json()) as UserToken;
        localStorage.setItem("Authentication", JSON.stringify(data));
        toast.success("Login efetuado com sucesso!");
        routerPush();
      } else if (response.status == 400) {
        var errorData = await response.json() as BadRequestInterface;
        toast.error(errorData.content);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

export async function Register(request: RegisterRequest) {
  try {
    await fetch(API_ENDPOINTS.REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    }).then(async (response) => {
      if (response.status == 200) {
        toast.success("Cadastro realizado com sucesso.")
      } else {
        var error = await response.json() as BadRequestInterface
        toast.error(error.content)
      }
    });
  } catch (error) {
    toast.error('Erro ao se registrar.')
  }
}
