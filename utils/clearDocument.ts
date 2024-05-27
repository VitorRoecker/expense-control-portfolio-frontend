export const clearCpfCnpj = (value: string) => {
    const cleanedValue = value.replace(/\D/g, "");

    return cleanedValue
};