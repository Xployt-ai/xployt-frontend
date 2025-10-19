export interface CreditTopup {

    transaction_id: string;
    amount: number;
    new_balance: number;
    message: string;

}

export interface CreditBalance {

    balance: number;
    user_id: number;
    last_updated: string;

}

export interface CreditTransaction {

      amount: number;
      transaction_type: string;
      description: string;
      id: number;
      user_id: number;
      created_at: string;
      status: string;

  }
