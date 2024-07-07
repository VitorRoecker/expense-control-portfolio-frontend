import { API_ENDPOINTS } from "@/config/api";
import { BadRequestInterface } from "@/types/interfaces/Response/badRequestResponse.interface";
import { toast } from "react-toastify";

export class UserService {
    private Token: string;

    constructor(token: string) {
        this.Token = token;
    }

    public async Delete(id: string) {
        try {
            await fetch(API_ENDPOINTS.USER + `?userId=${id}`, {
                method: "DELETE",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${this.Token}`
                },
            }).then(async (response) => {
                if (response.status == 200) {
                    toast("Deletado com sucesso!")
                } else {
                    var error = await response.json() as BadRequestInterface
                    toast(error.content)
                }
            })
        }
        catch (error) {
            toast('Erro ao atualizar')
        }
    }
}