# Subscription Validation Flow

## Overview
The subscription system uses **transaction history** as the source of truth for Pro status validation. This ensures accuracy and fairness.

## Transaction-Based Validation

### How It Works

```
┌─────────────────────────────────────────────────────────────┐
│ 1. User Subscribes ($20)                                    │
│    ↓                                                         │
│    Backend creates pro_monthly transaction                  │
│    Amount: +500 tokens                                      │
│    Date: 2025-01-15                                         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 2. Subscription Validity Check                              │
│    ↓                                                         │
│    Frontend calls getProStatus()                            │
│    ↓                                                         │
│    Fetches all credit transactions                          │
│    ↓                                                         │
│    Finds last pro_monthly transaction                       │
│    Date: 2025-01-15                                         │
│    ↓                                                         │
│    Calculates end date: 2025-01-15 + 1 month = 2025-02-15  │
│    ↓                                                         │
│    Checks: Is today between 2025-01-15 and 2025-02-15?     │
│    ↓                                                         │
│    Result: is_pro = true, days_remaining = 15               │
└─────────────────────────────────────────────────────────────┘
```

## Cancellation Flow

```
Day 1 (Jan 15):
  ┌────────────────────────────────┐
  │ User Subscribes                │
  │ - Charged $20                  │
  │ - Receives 500 tokens          │
  │ - is_pro = true                │
  │ - is_cancelled = false         │
  └────────────────────────────────┘

Day 15 (Jan 30):
  ┌────────────────────────────────┐
  │ User Cancels Subscription      │
  │ - is_cancelled = true          │
  │ - is_pro = STILL TRUE          │
  │ - Access until Feb 15          │
  │ - Shows "15 days remaining"    │
  └────────────────────────────────┘

Day 30 (Feb 15):
  ┌────────────────────────────────┐
  │ Subscription Expires           │
  │ - 1 month since last payment   │
  │ - is_pro = false               │
  │ - Keeps all tokens             │
  │ - Can resubscribe anytime      │
  └────────────────────────────────┘
```

## UI States

### State 1: Non-Pro User
```
┌──────────────────────────────────────────┐
│ Pro Plan                    $20/month    │
│                                          │
│ Includes 500 tokens per month            │
│ Unlock all pro features                  │
│                                          │
│                    [Subscribe Now]       │
└──────────────────────────────────────────┘
```

### State 2: Active Pro User
```
┌──────────────────────────────────────────┐
│ Pro Plan                    $20/month    │
│                                          │
│ Includes 500 tokens per month            │
│ Automatic renewal every month            │
│ Next billing: Feb 15, 2025               │
│                                          │
│                [Cancel Subscription]     │
└──────────────────────────────────────────┘
```

### State 3: Cancelled (Still Active)
```
┌──────────────────────────────────────────┐
│ Pro Plan                    Cancelled    │
│                                          │
│ Includes 500 tokens per month            │
│ Access expires on Feb 15, 2025           │
│ 15 days remaining                        │
│                                          │
│                    [Resubscribe]         │
└──────────────────────────────────────────┘
```

## Code Flow

### calculateSubscriptionValidity Function

```typescript
function calculateSubscriptionValidity(transactions) {
  // Step 1: Filter pro_monthly transactions
  const proPayments = transactions.filter(
    tx => tx.transaction_type === 'pro_monthly'
  );
  
  // Step 2: Get most recent payment
  const lastPayment = proPayments.sort(byDateDesc)[0];
  
  if (!lastPayment) {
    return { isValid: false };
  }
  
  // Step 3: Calculate dates
  const startDate = parseDate(lastPayment.created_at);
  const endDate = addMonths(startDate, 1);
  const now = new Date();
  
  // Step 4: Check validity
  const isValid = now >= startDate && now < endDate;
  
  // Step 5: Calculate remaining days
  const daysRemaining = Math.ceil(
    (endDate - now) / (1000 * 60 * 60 * 24)
  );
  
  return {
    isValid,
    endDate,
    startDate,
    daysRemaining
  };
}
```

## Backend Requirements

### pro_monthly Transaction Format

```json
{
  "id": 12345,
  "user_id": 67890,
  "transaction_type": "pro_monthly",
  "amount": 500,
  "description": "Monthly Pro subscription - 500 tokens",
  "created_at": "2025-01-15T10:00:00Z"
}
```

### Key Points

1. **transaction_type must be exactly "pro_monthly"**
2. **amount should be positive (500 tokens added)**
3. **created_at is the subscription start date**
4. **Description should indicate monthly subscription**

### Database Schema

```sql
-- Users table should have:
is_cancelled: BOOLEAN DEFAULT FALSE

-- Transactions table already has:
transaction_type: VARCHAR (includes 'pro_monthly')
amount: INTEGER
created_at: TIMESTAMP
```

## Advantages

### 1. Tamper-Proof
- Subscription status derived from immutable transaction history
- Can't be manipulated by changing a single flag

### 2. Fair to Users
- Users get exactly 30 days per payment
- Cancellation doesn't cut off access immediately
- Clear visibility of remaining days

### 3. Simple Backend
- No complex expiration logic
- No scheduled jobs to update flags
- Transactions are already recorded for billing

### 4. Self-Healing
- Even if backend flag is wrong, frontend calculates correctly
- Recalculated on every status check
- Based on blockchain-like immutable records

### 5. Audit Trail
- Full history of all payments
- Easy to see when user subscribed/renewed
- Transparent for both user and support

## Edge Cases Handled

✅ **Multiple Subscriptions**: Only the most recent pro_monthly counts  
✅ **Clock Skew**: Uses backend transaction timestamps  
✅ **Cancellation**: User keeps access until period ends  
✅ **Resubscription**: New pro_monthly transaction extends access  
✅ **Failed Renewals**: No auto-deduction, user gets grace period  
✅ **Token Balance**: Separate from Pro status (kept after expiry)  

## Security Considerations

1. **Server-Side Validation**: Backend must also check transaction history
2. **API Protection**: Pro-only endpoints must validate status
3. **Transaction Integrity**: Use database transactions for consistency
4. **Payment Security**: Never expose payment details to frontend
5. **Audit Logging**: Log all subscription events

## Monitoring

Track these metrics:
- Active Pro users (last pro_monthly < 30 days)
- Cancelled but active users (is_cancelled = true, still within period)
- Expired subscriptions (last pro_monthly > 30 days)
- Failed renewals
- Resubscription rate after cancellation
