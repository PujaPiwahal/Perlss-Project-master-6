export class RefPlannedTransition {
    constructor(
      public id: number,
      public intakeOutcomeId: number,
      public adaptBehLsaResSw: string,
      public amtTimeCareAsstTxt: string,
      public cannotLiveIndSuppSw: string,
      public caregiverPoorHlthSw: string,
      public caregvrPartiPlanTxt: string,
      public currHlthCondTxt: string,
      public currLvngArrngTxt: string,
      public electronicSignature: string,
      public legalDocumentsSw: string,
      public naturalOnlyFamilySw: string,
      public needSupSmoothTranSw: string,
      public notQualEnrolPcTxt: string,
      public otherDescription: string,
      public otherSupportAvailTxt: string,
      public otherSw: string,
      public personPartiPlanTxt: string,
      public physClinicalNoteSw: string,
      public rsnForPlannTransTxt: string,
      public supCaregvrInhomeTxt: string,
      public verifTargetPopulnSw: string,
      public willPartPlnndTranSw: string
  
    ) { }
}
