export interface AccountDetails {
  accountId: string
  balance: number
  currentPage: number
  totalPages: number
  pageSize: number
  accountsOperationDTOS: AccountsOperation[]
}

export interface AccountsOperation {
  id: number
  operationDate: string
  amount: number
  type: string
  description: string
}
