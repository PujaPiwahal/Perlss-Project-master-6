import { Person } from "./Person";

export class AdjudicationSearch {
    constructor(
      public person: string,
      public paeId: string,
      public assignedUser: string,
      public paeSubmisstionFromDate: any,
      public paeSubmisstionToDate:any,
      public adjudicationDueDays: string,
      public enrollmentGroup: string,
      public adjudicationStatus: string,
      public queueName: string,
      public taskStatus: string) {  }
  }
  