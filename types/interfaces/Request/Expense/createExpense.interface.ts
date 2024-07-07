export interface CreateExpenseRequest {
    UserId: string,
    CategoryId: string,
    Description: string,
    Amount: number,
    Type: number,
    ExpirationDate: Date
}