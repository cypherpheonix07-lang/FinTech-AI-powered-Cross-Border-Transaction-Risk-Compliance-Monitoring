import { IngestionService } from '../ingestion.service';
import { TransactionService } from '../../transaction/transaction.service';
import { EncryptionService } from '../../../services/encryption-service';

jest.mock('../../transaction/transaction.service');
jest.mock('../../../services/encryption-service', () => {
    const original = jest.requireActual('../../../services/encryption-service');
    return {
        EncryptionService: {
            ...original.EncryptionService,
            encrypt: jest.fn().mockImplementation((text) => `enc_${text}`),
            encryptObject: jest.fn().mockImplementation((obj, fields) => {
                const res = { ...obj };
                fields.forEach((f: string) => { if(res[f]) res[f] = `enc_${res[f]}`; });
                return res;
            })
        }
    };
});

describe('IngestionService', () => {
  const tenantId = 't1';
  const swiftMsg = `
{1:F01BANKBEBBAXXX0000000000}
{2:I103BANKDEFFXXXXN}
{4:
:20:REF123
:32A:230415USD1000,
:50K:/12345678
JOHN DOE
:59:/87654321
JANE SMITH
-}`;

  it('should parse, encrypt and store SWIFT message', async () => {
    (TransactionService.create as jest.Mock).mockResolvedValue({ id: 'tx-123' });

    const result = await IngestionService.ingestSWIFT(swiftMsg, tenantId);

    expect(result).toBeDefined();
    expect(EncryptionService.encryptObject).toHaveBeenCalled();
    expect(TransactionService.create).toHaveBeenCalledWith(
      expect.objectContaining({
        transactionRef: 'REF123',
        amount: 1000,
        currency: 'USD',
        senderName: 'enc_JOHN DOE',
      }),
      tenantId
    );
  });
});
