class Folder {
  constructor(data: any) {
    // set properties (docId, id, type, href, name, children)
    Object.assign(this, data);
  }
}

export default Folder;
