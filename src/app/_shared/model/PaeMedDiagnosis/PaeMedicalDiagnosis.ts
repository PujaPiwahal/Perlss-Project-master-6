import { PaeOtherMedDiagnosis } from './PaeOtherMedDiagnosis';

export class PaeMedicalDiagnosis {
    constructor(
public reqPageId: string,
public paeId: string,
public intellectualDisabilitySw: string,
public physEvalSw: string,
public iqTestScore: string,
public  iqTestDt: string,
public iqTestDesc: string ,
public chronicDiagnosisSw: string,
public targetPopDiagnosisCd: string,
public docDetailsDesc: string,
public levelIntelDisabilityCd: string,
public personId: string,
public paeOtherMedDiagnosis: PaeOtherMedDiagnosis,
public medDocumentCd: string

/* medDocumentCd: [
    M, N
  ] */

) {  }
}
