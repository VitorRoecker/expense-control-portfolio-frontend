interface CreateIncomeRequest {
    userId: string;
    categoryId: string;
    description: string;
    amount: number;
    type: number;
    entryDate: Date;
}