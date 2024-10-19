import { Pool, PoolConfig, QueryResult } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

class DatabaseConnection {
    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: parseInt(process.env.DB_PORT || '5432'),
            max: 25
        });
    }

    async connect(): Promise<void> {
        try {
            await this.pool.connect();
            console.log('Successfully connected to the database');
        } catch (error) {
            console.error('Error connecting to the database:', error);
            throw error;
        }
    }

    async query(queryText: string, params?: any[]): Promise<QueryResult> {
        try {
            const result = await this.pool.query(queryText, params);
            return result;
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }

    async queryRows<T>(queryText: string, params?: any[]): Promise<T[]> {
        try {
            const result = await this.pool.query(queryText, params);
            return result.rows as T[];
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }

    async queryWithNamedParams<T = any>(
        queryText: string,
        params: { [key: string]: any }
    ): Promise<T[]> {
        const paramNames = Object.keys(params);
        const paramValues = paramNames.map(name => params[name]);

        const transformedQuery = paramNames.reduce((query, name, index) => {
            return query.replace(`:${name}`, `$${index + 1}`);
        }, queryText);

        try {
            const result = await this.pool.query(transformedQuery, paramValues);
            return result.rows as T[];
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }

    async close(): Promise<void> {
        try {
            await this.pool.end();
            console.log('Database connection closed');
        } catch (error) {
            console.error('Error closing database connection:', error);
            throw error;
        }
    }
}

export default new DatabaseConnection();