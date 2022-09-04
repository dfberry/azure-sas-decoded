import AzureStorageSasDecoded, { SasType } from './azure-storage-sas-decoded';

describe('AzureStorageSasDecoded', () => {
  describe('getSasType', () => {
    test('success - Account', () => {
      const sasToken: Record<string, unknown> = { ss: '123' };

      const type = AzureStorageSasDecoded.getSasType(sasToken);

      expect(type).toEqual(SasType.Account);
    });
    test('success - Service', () => {
      const sasToken: Record<string, unknown> = { sr: 'abc' };

      const type = AzureStorageSasDecoded.getSasType(sasToken);

      expect(type).toEqual(SasType.Service);
    });
    test('success - UserDelegation', () => {
      const sasToken: Record<string, unknown> = { sks: '123' };

      const type = AzureStorageSasDecoded.getSasType(sasToken);

      expect(type).toEqual(SasType.UserDelegation);
    });
    test('success - Unexpected - empty object', () => {
      const sasToken: Record<string, unknown> = {};

      const type = AzureStorageSasDecoded.getSasType(sasToken);

      expect(type).toEqual(SasType.Unexpected);
    });
  });
  describe('arePermissionsInOrder', () => {
    test('success - true', () => {
      const permissions = 'racw';
      const expectResult = true;

      const arePermissionsInOrder =
        AzureStorageSasDecoded.arePermissionsInOrder(permissions);

      expect(arePermissionsInOrder).toEqual(expectResult);
    });
    test('success - false', () => {
      const permissions = 'arcw';
      const expectResult = false;

      const arePermissionsInOrder =
        AzureStorageSasDecoded.arePermissionsInOrder(permissions);

      expect(arePermissionsInOrder).toEqual(expectResult);
    });
    test('success - no permissions - true', () => {
      const permissions = '';
      const expectResult = true;

      const arePermissionsInOrder =
        AzureStorageSasDecoded.arePermissionsInOrder(permissions);

      expect(arePermissionsInOrder).toEqual(expectResult);
    });
  });
});
