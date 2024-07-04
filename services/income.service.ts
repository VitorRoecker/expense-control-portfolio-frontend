import { API_ENDPOINTS } from "@/config/api";
import { Income } from "@/types/interfaces/income.interface";
import { BadRequestInterface } from "@/types/interfaces/Response/badRequestResponse.interface";
import { toast } from "react-toastify";

export class IncomeService {
    private Token: string;

    constructor(token: string) {
        this.Token = token;
    }

    public async GetAll(userId: string): Promise<Income[]> {
        var data: Income[] = [];
        try {
            await fetch(API_ENDPOINTS.INCOME + `?userId==${userId}`,
                {
                    method: "GET",
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${this.Token}`
                    },
                }).then(async (response) => {
                    if (response.status == 200) {
                        data = await response.json() as Income[]
                    } else {
                        var error = await response.json() as BadRequestInterface
                        toast(error.content)
                    }

                    return data;
                })
            return data;
        }
        catch (error) {
            return data;
        }
    }

    public async Get(id: string): Promise<Income> {
        try {
            await fetch(API_ENDPOINTS.INCOME + `/${id}`,
                {
                    method: "GET",
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${this.Token}`
                    },
                }).then(async (response) => {
                    if (response.status == 200) {
                        return await response.json() as Income;
                    } else {
                        var error = await response.json() as BadRequestInterface
                        toast(error.content)
                    }

                    return {} as Income;
                })
            return {} as Income;
        }
        catch (error) {
            toast('Erro ao buscar renda');
            return {} as Income;
        }
    }

    public async Post(request: CreateIncomeRequest): Promise<string> {
        try {
            await fetch(API_ENDPOINTS.INCOME,
                {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${this.Token}`
                    },
                    body: JSON.stringify(request)
                }).then(async (response) => {
                    if (response.status == 200) {
                        return await response.json() as string
                    } else {
                        var error = await response.json() as BadRequestInterface
                        toast(error.content)
                    }

                    return ""
                })

            return ""
        }
        catch (error) {
            toast('Erro ao criar renda')
            return ""
        }
    }

    public async Put(request: UpdateIncomeRequest, id: string) {
        try {
            await fetch(API_ENDPOINTS.INCOME + `?incomeId=${id}`,
                {
                    method: "PUT",
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${this.Token}`
                    },
                    body: JSON.stringify(request)
                }).then(async (response) => {
                    if (response.status == 200) {
                        toast("Atualizado com sucesso!")
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

    public async Delete(id: string) {
        try {
            await fetch(API_ENDPOINTS.INCOME + `?expenseId=${id}`, {
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