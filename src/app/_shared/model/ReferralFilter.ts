export class ReferralFilter {
  constructor(
    public grandRegion: string,
    public referralId: number,
    public referralReceivedDate: string,
    public referralStatus: string,
    public taskQueue: string,
    public taskStatus: string) {  }
}