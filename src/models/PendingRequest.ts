import API from '../API';

class PendingRequest {
  API: API;
  requestId: string;

  constructor(API: API, requestId: string) {
    this.API = API;
    this.requestId = requestId;
  }

  // check to see if request that generated this pending request is completed
  async isCompleted(): Promise<boolean> {
    const { data } = await this.API.request(`/mutationStatus/${this.requestId}`);
    return data.completed;
  }
}

export default PendingRequest;
