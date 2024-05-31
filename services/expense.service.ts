import { API_ENDPOINTS } from "@/config/api";
import { Expense } from "@/types/interfaces/expense.interface";
import { toast } from "react-toastify";


export class ExpenseService {
    private Token: string;

    constructor(token: string) {
        this.Token = token
    }

    public async GetAll(): Promise<Expense[]> {
        var data: Expense[] = [];
        try {
            await fetch(API_ENDPOINTS.EXPENSE,
                {
                    method: "GET",
                    headers: {
                        'Content-type': 'application/json',
                        'Authentication': `Bearer ${this.Token}`
                    }
                }).then(async (response) => {
                    if (response.status == 200) {
                        data = await response.json() as Expense[]
                    } else {
                        toast('Erro ao buscar gastos.');
                    }

                    return data;
                })
            return data;
        }
        catch (error) {
            console.log(error)
            return data;
        }
    }
}