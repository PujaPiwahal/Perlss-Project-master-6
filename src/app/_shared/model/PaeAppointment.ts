
export class PaeAppointment {
    constructor(
      public addrLine1: string,
      public addrLine2: string,
      public city: string,
      public county: string,
      public ext: string,
      public id: number,
      public state: string,
      public zip: string,
      public appointmentDt: string,
      public appointmentTypeCd: string,
      public cancelReasonCd: string,
      public contactPersonSw: string,
      public contactMethodCd: string,
      public locOrNumber: string,
      public paeId: string,
      public personId: number,
      public reqPageId: number
      ) {  }
  }
