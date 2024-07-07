export interface Expense {
    id: string,
    inclusionDate: Date,
    description: string,
    amount: number,
    type: number,
    userId: string,
    categoryId: string,
    expirationDate: Date
}