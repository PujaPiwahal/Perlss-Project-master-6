export class CommitteeReviewForm {
    constructor(
      public id: string,
      public intakeOutcomeId: string,
      public credentialsCd: string,
      public ecfQualAssessor: string,
      public electronicSignature: string,
      public indvAgingOutFosterSw: string,
      public indvAgingOutFosterTxt: string,
      public indvTransCrimJustSw: string,
      public indvTransCrimJustTxt: string,
      public indvTransFamilyHmSw: string,
      public indvTransFamilyHmTxt: string,
      public refIntakeOutcomeVO: string
      ) {  }
}
