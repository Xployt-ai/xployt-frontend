export interface CreditTopup {

    transaction_id: number;
    amount: number;
    new_balance: number;

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
