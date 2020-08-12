class Page {
  constructor(data: any) {
    // set properties (docId, id, type, href, name, browserLink)
    Object.assign(this, data);
  }
}

export default Page;
