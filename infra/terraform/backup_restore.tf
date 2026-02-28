provider "aws" {
  region = "us-east-1"
}

# S3 Bucket for Immutable Audit Log Backups
resource "aws_s3_bucket" "audit_backups" {
  bucket = "kubera-trace-audit-backups-${var.environment}"
}

resource "aws_s3_bucket_versioning" "audit_versioning" {
  bucket = aws_s3_bucket.audit_backups.id
  versioning_configuration {
    status = "Enabled"
  }
}

# KMS Key for Envelope Encryption of Evidence Packs
resource "aws_kms_key" "evidence_encryption" {
  description             = "Encryption key for forensic evidence packs"
  deletion_window_in_days = 30
  enable_key_rotation     = true
}

# Variables
variable "environment" {
  type    = string
  default = "production"
}
