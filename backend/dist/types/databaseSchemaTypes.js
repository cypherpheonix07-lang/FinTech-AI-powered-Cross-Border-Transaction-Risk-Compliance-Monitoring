"use strict";
/**
 * SECTION 102: DATABASE SCHEMA COMPLETE SPECIFICATION (TypeScript Types)
 * Ultimate Nuclear Spec — 25+ complete table types with all column specs
 * Used for: runtime type safety, API contracts, ORM model definitions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TABLE_METADATA = void 0;
exports.TABLE_METADATA = [
    { tableName: 'users', schemaVersion: '2.0', primaryKey: 'id', indexes: [{ name: 'idx_users_email', columns: ['email'], unique: true }, { name: 'idx_users_phone', columns: ['phone'], unique: false }], foreignKeys: [], retentionDays: 3650 },
    { tableName: 'accounts', schemaVersion: '2.0', primaryKey: 'id', indexes: [{ name: 'idx_accounts_user', columns: ['userId'], unique: false }, { name: 'idx_accounts_number', columns: ['accountNumber'], unique: true }], foreignKeys: [{ column: 'userId', referencesTable: 'users', referencesColumn: 'id' }] },
    { tableName: 'transactions', schemaVersion: '2.0', primaryKey: 'id', partitioned: true, partitionKey: 'transactionDate', indexes: [{ name: 'idx_txn_account', columns: ['accountId', 'transactionDate'], unique: false }, { name: 'idx_txn_status', columns: ['status'], unique: false }], foreignKeys: [{ column: 'accountId', referencesTable: 'accounts', referencesColumn: 'id' }], retentionDays: 2555 /* 7 years */ },
    { tableName: 'cards', schemaVersion: '2.0', primaryKey: 'id', indexes: [{ name: 'idx_cards_user', columns: ['userId'], unique: false }, { name: 'idx_cards_account', columns: ['accountId'], unique: false }], foreignKeys: [{ column: 'userId', referencesTable: 'users', referencesColumn: 'id' }, { column: 'accountId', referencesTable: 'accounts', referencesColumn: 'id' }] },
    { tableName: 'audit_logs', schemaVersion: '2.0', primaryKey: 'id', partitioned: true, partitionKey: 'timestamp', indexes: [{ name: 'idx_audit_user', columns: ['userId', 'timestamp'], unique: false }, { name: 'idx_audit_action', columns: ['action'], unique: false }], foreignKeys: [], retentionDays: 2555 },
    { tableName: 'notifications', schemaVersion: '2.0', primaryKey: 'id', indexes: [{ name: 'idx_notif_user_unread', columns: ['userId', 'isRead'], unique: false }], foreignKeys: [{ column: 'userId', referencesTable: 'users', referencesColumn: 'id' }], retentionDays: 90 },
];
