export class ApplicantAddress {
  constructor(
      public addressFormatCd: string,
      public addressLine1: string,
      public addressLine2: string,
      public addressTypeCd: string,
      public city: string,
      public countyCd: string,

      public mailAddrLine1: string,
      public mailAddrLine2: string,
      public mailAddressFormatCd: string,
      public mailAddressSw: string,
      public mailCity: string,
      public mailCounty: string,
      public mailState: string,
      public mailValidatedAddressCd: string,
      public mailZip: string,
      public mailZipExtn: string,

      public militaryPoCd: string,
      public militaryStateCd: string,

      public personId: string,
      public reqPageId: string,
      public stateCd: string,
      public validatedAddressCd: string,
      public zipExt: string,
      public zipcode: string
    ) {  }
}
