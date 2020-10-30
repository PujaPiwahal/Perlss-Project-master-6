export class RefSubmission {
    constructor(
        public id: string,
        public admissionDt: string,
        public email: string,
        public expeditedReviewSw: string,
        public othRelationshipCd: string,
        public phNum: string,
        public planTransitionDt: string,
        public refContactCd: string,
        public refContactName: string,
        public refId: string,
        public relationshipCd: string,
        public signature: string,
        public whoIsSubmittingCd: string,
        public reqPageId: string
    ) { }

}
