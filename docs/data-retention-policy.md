# Data Retention Policy

## Overview

This document outlines the data retention policies for Balance, ensuring compliance with regulatory requirements while maintaining data security and user privacy.

## Retention Periods

### Financial Data
- **Transaction Records**: 7 years from transaction date
  - Required for tax compliance and financial reporting
  - Includes all transaction metadata, amounts, and categorization data
  - Stored with AES-256 encryption at rest

- **Categorization Attempts**: Same as associated transaction (7 years)
  - Learning data for AI improvement
  - Automatically cleaned up when transaction is deleted

### Security and Audit Data
- **Audit Logs**: 3 years from log entry date
  - Tracks all user actions for security monitoring
  - Includes login attempts, data access, and system changes
  - Critical for incident investigation and compliance

### User Consent Data
- **Active Consents**: Retained indefinitely while consent is active
  - Privacy policy acceptance
  - Terms of service acceptance
  - Marketing consent (if given)

- **Withdrawn Consents**: Deleted immediately upon withdrawal
  - No historical record kept after withdrawal
  - Ensures right to be forgotten

### Account Data
- **Active Accounts**: Retained while account is active
  - User profile information
  - Account settings and preferences

- **Deleted Accounts**: Data deleted within 30 days of account deletion
  - All associated financial data, consents, and audit logs
  - Permanent deletion with no recovery possible

### Temporary Data
- **Rate Limiting Data**: 30 days
- **Session Data**: 30 days after session expiration
- **Failed Authentication Attempts**: 30 days

## Automated Cleanup

Data retention is enforced through automated processes:

1. **Daily Cleanup**: Removes expired temporary data
2. **Monthly Cleanup**: Processes audit log retention
3. **Annual Cleanup**: Handles financial data retention (7-year cycle)
4. **On-Demand Cleanup**: Administrative trigger for immediate processing

### Cleanup Procedures

```typescript
// Example cleanup execution
import { runDataRetentionCleanup } from '@/lib/data-retention';

const result = await runDataRetentionCleanup();
// Returns counts of deleted records by type
```

## Data Deletion Methods

### Permanent Deletion
- Data is permanently removed from all storage systems
- No backups retained beyond retention period
- Cryptographic erasure where possible

### Account Deletion
When a user requests account deletion:

1. All personal data flagged for deletion
2. Financial data retained for regulatory period
3. User notified of retention timeline
4. Complete deletion after retention period expires

## Compliance

### Regulatory Requirements
- **Tax Compliance**: 7-year retention for financial transactions
- **GDPR**: User consent management and right to erasure
- **Data Protection**: Encryption and access controls

### Audit Trail
- All data deletion activities are logged
- Retention policy changes are tracked
- Administrative access to cleanup functions is audited

## Monitoring and Reporting

### Retention Statistics
The system provides real-time statistics on data retention:

```typescript
import { getRetentionStats } from '@/lib/data-retention';

const stats = await getRetentionStats();
// Returns counts of current vs. expired data
```

### Alerts
- Alerts when cleanup processes fail
- Notifications for data approaching retention limits
- Compliance reporting for regulatory bodies

## Policy Updates

This retention policy will be reviewed annually or when:
- Regulatory requirements change
- System architecture changes
- New data types are introduced

All changes to this policy will be communicated to users and documented in the change log.

## Contact

For questions about data retention or to request data deletion, contact:
- Email: privacy@balanceapp.com
- Support Portal: User account settings
