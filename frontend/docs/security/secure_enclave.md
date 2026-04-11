# Confidential Computing Architecture: Kubera Secure Enclave

Kubera Trace supports **Privacy Preserving Forensics** via Secure Enclaves.

## Mapping Prototype to Production

| Local Mock Phase | Production Architecture (AWS/Azure) |
| :--- | :--- |
| `attune_enclave()` | **AWS Nitro Attestation**: Validates PCRs (Platform Configuration Registers) against known good hashes on initialization. |
| `secure_execute()` | **KMIP + Intel SGX**: Keys are decrypted only within the hardware-isolated enclave CPU cache. |
| Fernet Encryption | **Envelope Encryption**: Data is encrypted with a unique DEK (Data Encryption Key) which is itself encrypted with a CMK (Customer Master Key) stored in Hardware Security Modules (HSM). |

## Integration Flow

1. **Provisioning**: Spin up an EC2 instance with `enclave_enabled: true`.
2. **Attestation**: The `kubera-gateway` verify's the enclave's PCRs before sending PII.
3. **Execution**: Symmetric keys are handed over via a secure channel (VSOCK).
4. **Scoring**: Risk models run on decrypted data; output is encrypted before being sent to the public relational DB.

## Benefits
- **Zero-Knowledge Ops**: Platform administrators cannot view raw transaction PII.
- **Tamper Evidence**: Any alteration to the risk model code results in an attestation failure.
