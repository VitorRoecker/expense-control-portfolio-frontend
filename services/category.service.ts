import { API_ENDPOINTS } from "@/config/api";
import { BadRequestInterface } from "@/types/interfaces/Response/badRequestResponse.interface";
import { toast } from "react-toastify";

export class ExpenseService {
    private Token: string;

    constructor(token: string) {
        this.Token = token
    }

    public async GetAll(userId: string): Promise<Category[]> {
        var data: Category[] = [];
        try {
            await fetch(API_ENDPOINTS.CATEGORY + `?userId==${userId}`,
                {
                    method: "GET",
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${this.Token}`
                    },
                }).then(async (response) => {
                    if (response.status == 200) {
                        data = await response.json() as Category[]
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

    public async Get(id: string): Promise<Category> {
        try {
            await fetch(API_ENDPOINTS.EXPENSE + `/${id}`,
                {
                    method: "GET",
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${this.Token}`
                    },
                }).then(async (response) => {
                    if (response.status == 200) {
                        return await response.json() as Category;
                    } else {
                        var error = await response.json() as BadRequestInterface
                        toast(error.content)
                    }

                    return {} as Category;
                })
            return {} as Category;
        }
        catch (error) {
            toast('Erro ao buscar gasto');
            return {} as Category;
        }
    }

    public async Post(request: CreateCategoryRequest): Promise<string> {
        try {
            await fetch(API_ENDPOINTS.EXPENSE,
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
            toast('Erro ao criar gasto')
            return ""
        }
    }

    public async Put(request: UpdateCategoryRequest, id: string) {
        try {
            await fetch(API_ENDPOINTS.EXPENSE + `?categoryId=${id}`,
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
            await fetch(API_ENDPOINTS.EXPENSE + `?expenseId=${id}`, {
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