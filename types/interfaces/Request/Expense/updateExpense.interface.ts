export interface UpdateExpenseRequest {
    UserId: string,
    CategoryId: string,
    Description: string,
    Amount: number,
    Type: number,
    ExpirationDate: Date
}