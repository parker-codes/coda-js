class Column {
  // TODO: possibly need to set calculated to false if the property doesn't exist
  constructor(data) {
    // set properties (docId, tableId, id, type, href, name, display, calculated)
    Object.assign(this, data);
  }
}

export default Column;
