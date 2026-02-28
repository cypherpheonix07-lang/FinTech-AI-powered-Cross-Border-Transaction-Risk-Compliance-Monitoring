# Regulatory Compliance Mapping: KUBERA TRACE

This document maps platform capabilities to specific **Financial Action Task Force (FATF)** and **AML/CFT** requirements globally.

## 1. Customer Due Diligence (CDD) & Monitoring
- **Requirement**: Consistent monitoring of transactions to ensure alignment with customer profile.
- **Platform Capability**: **Model Explainability (SHAP)** provides reasons for risk escalations based on entity profiles and behavioral velocity.

## 2. Suspicious Transaction Reporting (SAR/STR)
- **Requirement**: Prompt reporting of suspicious activities to FIUs.
- **Platform Capability**: **Investigator Workspace** allows 1-click generation of **Forensic Evidence Packs** (ZIP bundles) for regulatory submission.

## 3. Targeted Financial Sanctions (Evasion Detection)
- **Requirement**: Identify and freeze assets of sanctioned individuals/entities.
- **Platform Capability**: **Geo-Trace Map** plus **Scenario Intelligence** specifically flags evasion rings and sanctioned corridor movement.

## 4. Record Keeping & Auditability
- **Requirement**: Retain transaction and investigation records for at least 5 years.
- **Platform Capability**: **Immutable Governance Ledger** records every analyst action and model decision in an append-only, chained hash store.

## 5. Risk-Based Approach (RBA)
- **Requirement**: Allocate higher resources to high-risk corridors.
- **Platform Capability**: **Multi-Tenant Control Plane** allows institutional admins to set corridor-specific risk thresholds and GNN model weights.
