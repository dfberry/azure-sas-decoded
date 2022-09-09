import { arePermissionsInOrder } from './service-sas-decode';

describe('arePermissionsInOrder', () => {
  test('success - true', () => {
    const permissions = 'racw';
    const expectResult = true;

    const arePermissionsInOrderResult = arePermissionsInOrder(permissions);

    expect(arePermissionsInOrderResult).toEqual(expectResult);
  });
  test('success - false', () => {
    const permissions = 'arcw';
    const expectResult = false;

    const arePermissionsInOrderResult = arePermissionsInOrder(permissions);

    expect(arePermissionsInOrderResult).toEqual(expectResult);
  });
  test('success - no permissions - true', () => {
    const permissions = '';
    const expectResult = true;

    const arePermissionsInOrderResult = arePermissionsInOrder(permissions);

    expect(arePermissionsInOrderResult).toEqual(expectResult);
  });
});
