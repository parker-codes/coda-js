class Control {
  constructor(data: any) {
    // set properties (docId, id, type, href, name, parent, controlType, value)
    Object.assign(this, data);
  }
}

export default Control;