import { QueryRunner } from "../../query-runner/QueryRunner";
import { TableColumn } from "../../schema-builder/table/TableColumn";
import { Table } from "../../schema-builder/table/Table";
import { TableIndex } from "../../schema-builder/table/TableIndex";
import { TableForeignKey } from "../../schema-builder/table/TableForeignKey";
import { PostgresDriver } from "./PostgresDriver";
import { ReadStream } from "../../platform/PlatformTools";
import { TableUnique } from "../../schema-builder/table/TableUnique";
import { BaseQueryRunner } from "../../query-runner/BaseQueryRunner";
import { TableCheck } from "../../schema-builder/table/TableCheck";
import { IsolationLevel } from "../types/IsolationLevel";
/**
 * Runs queries on a single postgres database connection.
 */
export declare class PostgresQueryRunner extends BaseQueryRunner implements QueryRunner {
    /**
     * Database driver used by connection.
     */
    driver: PostgresDriver;
    /**
     * Promise used to obtain a database connection for a first time.
     */
    protected databaseConnectionPromise: Promise<any>;
    /**
     * Special callback provided by a driver used to release a created connection.
     */
    protected releaseCallback: Function;
    constructor(driver: PostgresDriver, mode?: "master" | "slave");
    /**
     * Creates/uses database connection from the connection pool to perform further operations.
     * Returns obtained database connection.
     */
    connect(): Promise<any>;
    /**
     * Releases used database connection.
     * You cannot use query runner methods once its released.
     */
    release(): Promise<void>;
    /**
     * Starts transaction.
     */
    startTransaction(isolationLevel?: IsolationLevel): Promise<void>;
    /**
     * Commits transaction.
     * Error will be thrown if transaction was not started.
     */
    commitTransaction(): Promise<void>;
    /**
     * Rollbacks transaction.
     * Error will be thrown if transaction was not started.
     */
    rollbackTransaction(): Promise<void>;
    /**
     * Executes a given SQL query.
     */
    query(query: string, parameters?: any[]): Promise<any>;
    /**
     * Returns raw data stream.
     */
    stream(query: string, parameters?: any[], onEnd?: Function, onError?: Function): Promise<ReadStream>;
    /**
     * Returns all available database names including system databases.
     */
    getDatabases(): Promise<string[]>;
    /**
     * Returns all available schema names including system schemas.
     * If database parameter specified, returns schemas of that database.
     */
    getSchemas(database?: string): Promise<string[]>;
    /**
     * Checks if database with the given name exist.
     */
    hasDatabase(database: string): Promise<boolean>;
    /**
     * Checks if schema with the given name exist.
     */
    hasSchema(schema: string): Promise<boolean>;
    /**
     * Checks if table with the given name exist in the database.
     */
    hasTable(tableOrName: Table | string): Promise<boolean>;
    /**
     * Checks if column with the given name exist in the given table.
     */
    hasColumn(tableOrName: Table | string, columnName: string): Promise<boolean>;
    /**
     * Creates a new database.
     * Postgres does not supports database creation inside a transaction block.
     */
    createDatabase(database: string, ifNotExist?: boolean): Promise<void>;
    /**
     * Drops database.
     * Postgres does not supports database drop inside a transaction block.
     */
    dropDatabase(database: string, ifExist?: boolean): Promise<void>;
    /**
     * Creates a new table schema.
     */
    createSchema(schema: string, ifNotExist?: boolean): Promise<void>;
    /**
     * Drops table schema.
     */
    dropSchema(schemaPath: string, ifExist?: boolean, isCascade?: boolean): Promise<void>;
    /**
     * Creates a new table.
     */
    createTable(table: Table, ifNotExist?: boolean, createForeignKeys?: boolean, createIndices?: boolean): Promise<void>;
    /**
     * Drops the table.
     */
    dropTable(target: Table | string, ifExist?: boolean, dropForeignKeys?: boolean, dropIndices?: boolean): Promise<void>;
    /**
     * Renames the given table.
     */
    renameTable(oldTableOrName: Table | string, newTableName: string): Promise<void>;
    /**
     * Creates a new column from the column in the table.
     */
    addColumn(tableOrName: Table | string, column: TableColumn): Promise<void>;
    /**
     * Creates a new columns from the column in the table.
     */
    addColumns(tableOrName: Table | string, columns: TableColumn[]): Promise<void>;
    /**
     * Renames column in the given table.
     */
    renameColumn(tableOrName: Table | string, oldTableColumnOrName: TableColumn | string, newTableColumnOrName: TableColumn | string): Promise<void>;
    /**
     * Changes a column in the table.
     */
    changeColumn(tableOrName: Table | string, oldTableColumnOrName: TableColumn | string, newColumn: TableColumn): Promise<void>;
    /**
     * Changes a column in the table.
     */
    changeColumns(tableOrName: Table | string, changedColumns: {
        newColumn: TableColumn;
        oldColumn: TableColumn;
    }[]): Promise<void>;
    /**
     * Drops column in the table.
     */
    dropColumn(tableOrName: Table | string, columnOrName: TableColumn | string): Promise<void>;
    /**
     * Drops the columns in the table.
     */
    dropColumns(tableOrName: Table | string, columns: TableColumn[]): Promise<void>;
    /**
     * Creates a new primary key.
     */
    createPrimaryKey(tableOrName: Table | string, columnNames: string[]): Promise<void>;
    /**
     * Updates composite primary keys.
     */
    updatePrimaryKeys(tableOrName: Table | string, columns: TableColumn[]): Promise<void>;
    /**
     * Drops a primary key.
     */
    dropPrimaryKey(tableOrName: Table | string): Promise<void>;
    /**
     * Creates new unique constraint.
     */
    createUniqueConstraint(tableOrName: Table | string, uniqueConstraint: TableUnique): Promise<void>;
    /**
     * Creates new unique constraints.
     */
    createUniqueConstraints(tableOrName: Table | string, uniqueConstraints: TableUnique[]): Promise<void>;
    /**
     * Drops unique constraint.
     */
    dropUniqueConstraint(tableOrName: Table | string, uniqueOrName: TableUnique | string): Promise<void>;
    /**
     * Drops unique constraints.
     */
    dropUniqueConstraints(tableOrName: Table | string, uniqueConstraints: TableUnique[]): Promise<void>;
    /**
     * Creates new check constraint.
     */
    createCheckConstraint(tableOrName: Table | string, checkConstraint: TableCheck): Promise<void>;
    /**
     * Creates new check constraints.
     */
    createCheckConstraints(tableOrName: Table | string, checkConstraints: TableCheck[]): Promise<void>;
    /**
     * Drops check constraint.
     */
    dropCheckConstraint(tableOrName: Table | string, checkOrName: TableCheck | string): Promise<void>;
    /**
     * Drops check constraints.
     */
    dropCheckConstraints(tableOrName: Table | string, checkConstraints: TableCheck[]): Promise<void>;
    /**
     * Creates a new foreign key.
     */
    createForeignKey(tableOrName: Table | string, foreignKey: TableForeignKey): Promise<void>;
    /**
     * Creates a new foreign keys.
     */
    createForeignKeys(tableOrName: Table | string, foreignKeys: TableForeignKey[]): Promise<void>;
    /**
     * Drops a foreign key from the table.
     */
    dropForeignKey(tableOrName: Table | string, foreignKeyOrName: TableForeignKey | string): Promise<void>;
    /**
     * Drops a foreign keys from the table.
     */
    dropForeignKeys(tableOrName: Table | string, foreignKeys: TableForeignKey[]): Promise<void>;
    /**
     * Creates a new index.
     */
    createIndex(tableOrName: Table | string, index: TableIndex): Promise<void>;
    /**
     * Creates a new indices
     */
    createIndices(tableOrName: Table | string, indices: TableIndex[]): Promise<void>;
    /**
     * Drops an index from the table.
     */
    dropIndex(tableOrName: Table | string, indexOrName: TableIndex | string): Promise<void>;
    /**
     * Drops an indices from the table.
     */
    dropIndices(tableOrName: Table | string, indices: TableIndex[]): Promise<void>;
    /**
     * Clears all table contents.
     * Note: this operation uses SQL's TRUNCATE query which cannot be reverted in transactions.
     */
    clearTable(tableName: string): Promise<void>;
    /**
     * Removes all tables from the currently connected database.
     */
    clearDatabase(): Promise<void>;
    /**
     * Loads all tables (with given names) from the database and creates a Table from them.
     */
    protected loadTables(tableNames: string[]): Promise<Table[]>;
    /**
     * Builds create table sql.
     */
    protected createTableSql(table: Table, createForeignKeys?: boolean): string;
    /**
     * Extracts schema name from given Table object or table name string.
     */
    protected extractSchema(target: Table | string): string | undefined;
    /**
     * Drops ENUM type from given schemas.
     */
    protected dropEnumTypes(schemaNames: string): Promise<void>;
    /**
     * Checks if enum with the given name exist in the database.
     */
    protected hasEnumType(table: Table, column: TableColumn): Promise<boolean>;
    /**
     * Builds create ENUM type sql.
     */
    protected createEnumTypeSql(table: Table, column: TableColumn, enumName?: string): string;
    /**
     * Builds create ENUM type sql.
     */
    protected dropEnumTypeSql(table: Table, column: TableColumn, enumName?: string): string;
    /**
     * Builds drop table sql.
     */
    protected dropTableSql(tableOrPath: Table | string): string;
    /**
     * Builds create index sql.
     */
    protected createIndexSql(table: Table, index: TableIndex): string;
    /**
     * Builds drop index sql.
     */
    protected dropIndexSql(table: Table, indexOrName: TableIndex | string): string;
    /**
     * Builds create primary key sql.
     */
    protected createPrimaryKeySql(table: Table, columnNames: string[]): string;
    /**
     * Builds drop primary key sql.
     */
    protected dropPrimaryKeySql(table: Table): string;
    /**
     * Builds create unique constraint sql.
     */
    protected createUniqueConstraintSql(table: Table, uniqueConstraint: TableUnique): string;
    /**
     * Builds drop unique constraint sql.
     */
    protected dropUniqueConstraintSql(table: Table, uniqueOrName: TableUnique | string): string;
    /**
     * Builds create check constraint sql.
     */
    protected createCheckConstraintSql(table: Table, checkConstraint: TableCheck): string;
    /**
     * Builds drop check constraint sql.
     */
    protected dropCheckConstraintSql(table: Table, checkOrName: TableCheck | string): string;
    /**
     * Builds create foreign key sql.
     */
    protected createForeignKeySql(table: Table, foreignKey: TableForeignKey): string;
    /**
     * Builds drop foreign key sql.
     */
    protected dropForeignKeySql(table: Table, foreignKeyOrName: TableForeignKey | string): string;
    /**
     * Builds sequence name from given table and column.
     */
    protected buildSequenceName(table: Table, columnOrName: TableColumn | string, currentSchema?: string, disableEscape?: true, skipSchema?: boolean): string;
    /**
     * Builds ENUM type name from given table and column.
     */
    protected buildEnumName(table: Table, columnOrName: TableColumn | string, withSchema?: boolean, disableEscape?: boolean, toOld?: boolean): string;
    /**
     * Escapes given table path.
     */
    protected escapeTableName(target: Table | string, disableEscape?: boolean): string;
    /**
     * Returns object with table schema and table name.
     */
    protected parseTableName(target: Table | string): {
        schema: string;
        tableName: string;
    };
    /**
     * Builds a query for create column.
     */
    protected buildCreateColumnSql(table: Table, column: TableColumn): string;
}
