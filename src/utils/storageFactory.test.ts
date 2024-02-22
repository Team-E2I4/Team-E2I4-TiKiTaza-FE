import { beforeEach, describe, expect, it, vitest } from 'vitest';
import storageFactory from './storageFactory';

const { setItem, getItem, removeItem } = storageFactory(localStorage);

describe('localStorage', () => {
  const mockSetItem = vitest.spyOn(localStorage, 'setItem');
  const mockGetItem = vitest.spyOn(localStorage, 'getItem');
  const mockRemoveItem = vitest.spyOn(localStorage, 'removeItem');

  beforeEach(() => {
    vitest.clearAllMocks();
  });

  it('sets item', () => {
    setItem('testItem', '1234');

    expect(mockSetItem).toHaveBeenCalledWith('testItem', '1234');
  });

  it('gets item', () => {
    getItem('testItem', 'defaultTestItem');

    expect(mockGetItem).toHaveBeenCalledWith('testItem');
  });

  it('removes item', () => {
    removeItem('testItem');

    expect(mockRemoveItem).toHaveBeenCalledWith('testItem');
  });
});
