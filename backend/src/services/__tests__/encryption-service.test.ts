import { EncryptionService } from '../encryption-service';

describe('EncryptionService', () => {
  const tenantId = 'test-tenant-123';
  const secretData = 'Ultra secret transaction payload';

  it('should encrypt and decrypt correctly', () => {
    const encrypted = EncryptionService.encrypt(secretData, tenantId);
    expect(encrypted).toContain(':');
    
    const decrypted = EncryptionService.decrypt(encrypted, tenantId);
    expect(decrypted).toBe(secretData);
  });

  it('should produce different ciphertexts for the same data (due to IV)', () => {
    const enc1 = EncryptionService.encrypt(secretData, tenantId);
    const enc2 = EncryptionService.encrypt(secretData, tenantId);
    expect(enc1).not.toBe(enc2);
  });

  it('should fail decryption if tenantId is different', () => {
    const encrypted = EncryptionService.encrypt(secretData, tenantId);
    expect(() => {
      EncryptionService.decrypt(encrypted, 'wrong-tenant');
    }).toThrow();
  });

  it('should fail decryption if data is tampered', () => {
    const encrypted = EncryptionService.encrypt(secretData, tenantId);
    const tampered = encrypted.slice(0, -1) + (encrypted.endsWith('0') ? '1' : '0');
    expect(() => {
      EncryptionService.decrypt(tampered, tenantId);
    }).toThrow();
  });

  it('should encrypt and decrypt objects', () => {
    const obj = {
      senderName: 'John Doe',
      amount: 1000,
      note: 'Transfer for rent'
    };
    const fields = ['senderName', 'note'];
    
    const encryptedObj = EncryptionService.encryptObject(obj, fields, tenantId);
    expect(encryptedObj.senderName).not.toBe(obj.senderName);
    expect(encryptedObj.amount).toBe(obj.amount);
    
    const decryptedObj = EncryptionService.decryptObject(encryptedObj, fields, tenantId);
    expect(decryptedObj).toEqual(obj);
  });
});
