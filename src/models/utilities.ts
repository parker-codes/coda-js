// formats each row based on whether it is in object or array format
const formatRows = (rows: any[]) => {
  // error handling
  if (!Array.isArray(rows)) throw new Error('`rows` must be an array');
  if (!rows.length) throw new Error('Must include at least one row when calling `insertRows`');

  const formattedRows = rows.map((row) => {
    // detect if array (containing column objects) - the alternative being one object
    if (Array.isArray(row)) {
      // detect if rows already have column and value as separate properties
      const hasBoth = row.some((column) => column.hasOwnProperty('column') && column.hasOwnProperty('value'));
      if (hasBoth) return { cells: row };
      throw new Error('A row must either be an array of objects for each column, or else one object of column/value pairs..');
    }

    // keys are acting as column ID/name
    const columns: any[] = [];

    Object.keys(row).forEach((column) => {
      columns.push({ column, value: row[column] });
    });

    return { cells: columns };
  });

  return formattedRows;
};

export { formatRows };
