class Column {
  constructor(data) {
    // set properties (docId, tableId, id, type, href, name, display, calculated)
    // TODO: possibly need to set calculated to false if the property doesn't exist
    Object.assign(this, data);
  }
}

export default Column;
