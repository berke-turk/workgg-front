interface UpdateStmtObject {
    table: string;
    fields: Record<string, any>;
    conditions: Record<string, any>;
}

interface Query {
    text: string;
    values: any[];
}

const addComma = (len: number): string => len > 1 ? ',' : '';
const addCommaWhere = (len: number): string => len > 1 ? 'AND' : '';

/**
 * Builds an SQL UPDATE query
 * @param {string} table - The name of the table to update
 * @param {Record<string, any>} fields - An object containing the fields to update and their new values
 * @param {Record<string, any>} conditions - An object containing the conditions for the WHERE clause
 * @returns {Query | null} The built query object or null if no changes are to be made
 */
function buildUpdateQuery(table: string, fields: Record<string, any>, conditions: Record<string, any>): Query | null {
    let query: Query = {
        text: `UPDATE ${table} SET`,
        values: []
    };

    Object.keys(fields).forEach((col, index) => {
        query.values.push(fields[col]);
        query.text += `${addComma(index + 1)} ${col} = $${query.values.length}`;
    });

    if (query.values.length > 0) {
        const conditionEntries = Object.entries(conditions);
        if (conditionEntries.length > 0) {
            query.text += ` WHERE`;
            
            conditionEntries.forEach(([col, value], index) => {
                query.values.push(value);
                query.text += ` ${col} = $${query.values.length}`;
                if (index < conditionEntries.length - 1) {
                    query.text += ` ${addCommaWhere(query.values.length)}`;
                }
            });
        }
        return query;
    } else {
        // No changes to be made
        return null;
    }
}

export default buildUpdateQuery;