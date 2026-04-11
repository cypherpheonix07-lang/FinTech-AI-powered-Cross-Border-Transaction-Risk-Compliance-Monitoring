"use strict";
/**
 * SECTION 111: DECENTRALIZED IDENTITY & SELF-SOVEREIGN IDENTITY (SSI)
 * Ultimate Nuclear Spec — W3C DID Core spec, Verifiable Credentials (VC),
 * Verifiable Presentations (VP), selective disclosure SD-JWT / ZK proofs,
 * DID method support (did:ethr, did:key, did:web, did:ion, did:sovrin),
 * credential revocation (Status List 2021), KYC portability, and
 * DIDComm messaging for inter-institutional identity exchange
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecentralizedIdentityService = void 0;
// ======================================================================
// DECENTRALIZED IDENTITY SERVICE
// ======================================================================
class DecentralizedIdentityService {
    didDocuments = new Map();
    credentials = new Map();
    trustRegistry = new Map();
    revocationLists = new Map();
    pendingRequests = new Map();
    // ---- DID MANAGEMENT --------------------------------------------------
    createDID(method, controller) {
        const keyId = `key-${Date.now().toString(16)}`;
        const publicKey = this._generatePublicKey();
        const did = `${method}:${publicKey.slice(0, 42)}`;
        const doc = {
            '@context': ['https://www.w3.org/ns/did/v1', 'https://w3id.org/security/suites/ed25519-2020/v1'],
            id: did,
            controller: controller ?? did,
            verificationMethod: [{
                    id: `${did}#${keyId}`,
                    type: 'Ed25519VerificationKey2020',
                    controller: did,
                    publicKeyMultibase: `z${publicKey}`,
                }],
            authentication: [`${did}#${keyId}`],
            assertionMethod: [`${did}#${keyId}`],
            keyAgreement: [`${did}#${keyId}`],
            service: [{
                    id: `${did}#didcomm`,
                    type: 'DIDCommMessaging',
                    serviceEndpoint: `https://pathguard.io/didcomm/${did.slice(-16)}`,
                    accept: ['didcomm/v2', 'didcomm/aip2;env=rfc587'],
                }],
            created: new Date().toISOString(),
            updated: new Date().toISOString(),
        };
        this.didDocuments.set(did, doc);
        this.revocationLists.set(did, new Array(131072).fill(false));
        return doc;
    }
    resolveDID(did) {
        // Production: query DID method-specific resolver (Universal Resolver)
        return this.didDocuments.get(did) ?? null;
    }
    deactivateDID(did) {
        const doc = this.didDocuments.get(did);
        if (doc) {
            doc.deactivated = true;
            doc.updated = new Date().toISOString();
        }
    }
    updateDIDKeys(did, newPublicKeyMultibase) {
        const doc = this.didDocuments.get(did);
        if (!doc)
            return null;
        const newKeyId = `key-rotation-${Date.now().toString(16)}`;
        doc.verificationMethod.push({ id: `${did}#${newKeyId}`, type: 'Ed25519VerificationKey2020', controller: did, publicKeyMultibase: newPublicKeyMultibase });
        doc.authentication = [`${did}#${newKeyId}`];
        doc.assertionMethod = [`${did}#${newKeyId}`];
        doc.updated = new Date().toISOString();
        return doc;
    }
    // ---- VERIFIABLE CREDENTIAL ISSUANCE ----------------------------------
    issueCredential(params) {
        const issuer = this.didDocuments.get(params.issuerDID);
        if (!issuer)
            throw new Error(`Issuer DID ${params.issuerDID} not found`);
        const vcId = `urn:uuid:${this._uuid()}`;
        const now = new Date();
        const expiresAt = params.expiresInDays ? new Date(now.getTime() + params.expiresInDays * 864e5).toISOString() : undefined;
        const listIndex = params.statusListIndex ?? Math.floor(Math.random() * 100000);
        const vc = {
            '@context': ['https://www.w3.org/2018/credentials/v1', 'https://w3id.org/vc/status-list/2021/v1'],
            id: vcId,
            type: ['VerifiableCredential', params.vcType],
            issuer: { id: params.issuerDID, name: 'PathGuard Identity Authority' },
            issuanceDate: now.toISOString(),
            expirationDate: expiresAt,
            credentialSubject: { id: params.holderDID, ...params.claims },
            credentialStatus: {
                id: `https://pathguard.io/status/${params.issuerDID}#${listIndex}`,
                type: 'STATUS_LIST_2021',
                statusListIndex: String(listIndex),
                statusListCredential: `https://pathguard.io/status/${params.issuerDID}`,
            },
            credentialSchema: { id: `https://schema.pathguard.io/vc/${params.vcType}`, type: 'JsonSchemaValidator2018' },
            proof: this._signCredential(vcId, params.issuerDID, params.claims),
        };
        this.credentials.set(vcId, vc);
        return vc;
    }
    // ---- VERIFICATION -----------------------------------------------------
    verifyCredential(vc) {
        const errors = [];
        // Expiry check
        const expired = vc.expirationDate ? new Date(vc.expirationDate) < new Date() : false;
        if (expired)
            errors.push('Credential has expired');
        // Signature verification (stub — production: Ed25519 / BBS+ verify)
        const sigValid = vc.proof?.proofValue?.length > 0;
        if (!sigValid)
            errors.push('Invalid credential signature');
        // Revocation check
        const statusIdx = parseInt(vc.credentialStatus?.statusListIndex ?? '-1', 10);
        const issuerDID = typeof vc.issuer === 'string' ? vc.issuer : vc.issuer.id;
        const revList = this.revocationLists.get(issuerDID) ?? [];
        const revoked = statusIdx >= 0 && revList[statusIdx] === true;
        if (revoked)
            errors.push('Credential has been revoked');
        // Issuer trust check
        const trusted = this.trustRegistry.has(issuerDID);
        if (!trusted)
            errors.push(`Issuer ${issuerDID} not in trust registry`);
        return { valid: errors.length === 0, errors, issuerTrusted: trusted, revoked, expired };
    }
    // ---- VERIFIABLE PRESENTATIONS ----------------------------------------
    createPresentation(holderDID, vcIds, challenge, domain) {
        const vcs = vcIds.map(id => this.credentials.get(id)).filter(Boolean);
        return {
            '@context': ['https://www.w3.org/2018/credentials/v1'],
            type: ['VerifiablePresentation'],
            id: `urn:uuid:${this._uuid()}`,
            holder: holderDID,
            verifiableCredential: vcs,
            proof: {
                type: 'Ed25519Signature2020',
                created: new Date().toISOString(),
                verificationMethod: `${holderDID}#key-1`,
                proofPurpose: 'authentication',
                proofValue: this._generateProofValue(`${holderDID}${challenge}${domain}`),
                challenge, domain,
            },
        };
    }
    // ---- SELECTIVE DISCLOSURE (BBS+ / SD-JWT) ----------------------------
    createSelectiveDisclosureRequest(params) {
        const req = {
            requestId: `sdr-${this._uuid()}`,
            requesterDID: params.requesterDID,
            requestedAttributes: params.requestedAttributes,
            purpose: params.purpose,
            challenge: `chal-${this._generateProofValue('challenge').slice(0, 32)}`,
            domain: 'pathguard.io',
            expiresAt: new Date(Date.now() + (params.validMinutes ?? 10) * 60000).toISOString(),
        };
        this.pendingRequests.set(req.requestId, req);
        return req;
    }
    respondToSelectiveDisclosure(requestId, holderDID, credentialId) {
        const req = this.pendingRequests.get(requestId);
        if (!req)
            throw new Error(`Request ${requestId} not found or expired`);
        const vc = this.credentials.get(credentialId);
        if (!vc)
            throw new Error(`Credential ${credentialId} not found`);
        // BBS+ selective disclosure: reveal only requested attributes
        const subj = vc.credentialSubject;
        const disclosed = {};
        for (const attr of req.requestedAttributes) {
            if (attr === 'age_over_18' && subj.dateOfBirth) {
                const dob = new Date(subj.dateOfBirth);
                const age = (Date.now() - dob.getTime()) / (365.25 * 864e5);
                disclosed[attr] = age >= 18;
            }
            else if (subj[attr] !== undefined) {
                disclosed[attr] = subj[attr];
            }
        }
        // Generate BBS+ proof (stub — production: @mattrglobal/bbs-signatures)
        const zkProof = this._generateProofValue(JSON.stringify({ requestId, disclosed, challenge: req.challenge }));
        this.pendingRequests.delete(requestId);
        return { requestId, holderDID, disclosedAttributes: disclosed, zkProof, verifiedAt: new Date().toISOString() };
    }
    // ---- REVOCATION -------------------------------------------------------
    revokeCredential(issuerDID, statusListIndex) {
        const list = this.revocationLists.get(issuerDID);
        if (!list)
            throw new Error(`No revocation list for ${issuerDID}`);
        list[statusListIndex] = true;
        console.log(`[DID] Credential at index ${statusListIndex} for issuer ${issuerDID} revoked`);
    }
    // ---- TRUST REGISTRY --------------------------------------------------
    registerTrustedIssuer(entry) {
        this.trustRegistry.set(entry.issuerDID, entry);
    }
    getTrustedIssuers(vcType) {
        const all = Array.from(this.trustRegistry.values()).filter(e => !e.revoked);
        return vcType ? all.filter(e => e.trustedVCTypes.includes(vcType)) : all;
    }
    // ---- DIDCOMM MESSAGING -----------------------------------------------
    sendDIDCommMessage(from, to, type, body) {
        return {
            id: `didcomm-${this._uuid()}`, type, from, to,
            created_time: new Date().toISOString(),
            expires_time: new Date(Date.now() + 86400000).toISOString(),
            body,
        };
    }
    // ---- KYC PORTABILITY -------------------------------------------------
    exportKYCBundle(holderDID) {
        const holderCreds = Array.from(this.credentials.values()).filter(vc => {
            const subj = vc.credentialSubject;
            return subj.id === holderDID;
        });
        const presentation = this.createPresentation(holderDID, holderCreds.map(c => c.id), 'export-nonce', 'export.pathguard.io');
        return { holderDID, credentials: holderCreds, presentation, exportedAt: new Date().toISOString() };
    }
    // ---- PRIVATE HELPERS -------------------------------------------------
    _signCredential(vcId, issuerDID, claims) {
        return {
            type: 'Ed25519Signature2020',
            created: new Date().toISOString(),
            verificationMethod: `${issuerDID}#key-1`,
            proofPurpose: 'assertionMethod',
            proofValue: this._generateProofValue(`${vcId}${JSON.stringify(claims)}`),
        };
    }
    _generatePublicKey() {
        return Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    }
    _generateProofValue(data) {
        // Production: actual Ed25519 sign with private key
        const hash = data.split('').reduce((h, c) => Math.imul(31, h) + c.charCodeAt(0) | 0, 0);
        return Buffer.from(`proof-${Math.abs(hash).toString(16).padStart(8, '0')}-${Date.now()}`).toString('base64url');
    }
    _uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0;
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
    // ---- ANALYTICS -------------------------------------------------------
    getStats() {
        let revoked = 0;
        this.revocationLists.forEach(list => { revoked += list.filter(Boolean).length; });
        return { totalDIDs: this.didDocuments.size, totalCredentials: this.credentials.size, trustedIssuers: this.trustRegistry.size, revokedCredentials: revoked };
    }
}
exports.DecentralizedIdentityService = DecentralizedIdentityService;
