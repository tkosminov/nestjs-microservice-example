import { ObjectLiteral, Repository } from 'typeorm';

export function transactionMock<T extends ObjectLiteral>(repositoty: Repository<T>) {
  const transaction = jest.fn((fn) => Promise.resolve(fn()));
  const manager: any = { transaction };

  jest.replaceProperty(repositoty, 'manager', manager);

  return {
    manager,
    transaction,
  };
}

export function insertQueryBuilderMock<T extends ObjectLiteral>(repositoty: Repository<T>, result: T[] = []) {
  const execute = jest.fn(() => Promise.resolve({ raw: result }));
  const returning = jest.fn(() => ({ execute }));
  const orIgnore = jest.fn(() => ({ returning, execute }));
  const orUpdate = jest.fn(() => ({ returning, execute }));
  const values = jest.fn(() => ({ returning, execute, orIgnore, orUpdate }));
  const into = jest.fn(() => ({ values }));
  const insert = jest.fn(() => ({ values, into }));
  const query_builder: any = { insert };

  jest.spyOn(repositoty, 'createQueryBuilder').mockReturnValueOnce(query_builder);

  return {
    query_builder,
    insert,
    into,
    values,
    orIgnore,
    orUpdate,
    returning,
    execute,
  };
}

export function updateQueryBuilderMock<T extends ObjectLiteral>(repositoty: Repository<T>, result: T[] = []) {
  const execute = jest.fn(() => Promise.resolve({ raw: result }));
  const returning = jest.fn(() => ({ execute }));
  const andWhere = jest.fn(() => ({ returning, execute }));
  const where = jest.fn(() => ({ returning, execute, andWhere }));
  const set = jest.fn(() => ({ where, returning }));
  const update = jest.fn(() => ({ set }));
  const query_builder: any = { update };

  jest.spyOn(repositoty, 'createQueryBuilder').mockReturnValueOnce(query_builder);

  return {
    query_builder,
    update,
    set,
    where,
    andWhere,
    returning,
    execute,
  };
}

export function deleteQueryBuilderMock<T extends ObjectLiteral>(repositoty: Repository<T>, result: T[] = []) {
  const execute = jest.fn(() => Promise.resolve({ raw: result }));
  const returning = jest.fn(() => ({ execute }));
  const andWhere = jest.fn(() => ({ returning, execute }));
  const where = jest.fn(() => ({ returning, execute, andWhere }));
  const deleteFn = jest.fn(() => ({ where }));
  const query_builder: any = { delete: deleteFn };

  jest.spyOn(repositoty, 'createQueryBuilder').mockReturnValueOnce(query_builder);

  return {
    query_builder,
    delete: deleteFn,
    where,
    andWhere,
    returning,
    execute,
  };
}

export function insertMock<T extends ObjectLiteral>(repositoty: Repository<T>, result: T[] = []) {
  const insert: any = jest.fn(() => Promise.resolve({ raw: result }));

  jest.spyOn(repositoty, 'insert').mockImplementationOnce(insert);

  return {
    insert,
  };
}

export function updateMock<T extends ObjectLiteral>(repositoty: Repository<T>, result: T[] = []) {
  const update: any = jest.fn(() => Promise.resolve({ raw: result }));

  jest.spyOn(repositoty, 'update').mockImplementationOnce(update);

  return {
    update,
  };
}

export function deleteMock<T extends ObjectLiteral>(repositoty: Repository<T>, result: T[] = []) {
  const delete_fn: any = jest.fn(() => Promise.resolve({ raw: result }));

  jest.spyOn(repositoty, 'delete').mockImplementationOnce(delete_fn);

  return {
    delete: delete_fn,
  };
}

export function findMock<T extends ObjectLiteral>(repositoty: Repository<T>, result: T[] = []) {
  const find: any = jest.fn(() => Promise.resolve(result));

  jest.spyOn(repositoty, 'find').mockImplementationOnce(find);

  return {
    find,
  };
}

export function findOneMock<T extends ObjectLiteral>(repositoty: Repository<T>, result: T | null = null) {
  const find_one: any = jest.fn(() => Promise.resolve(result));

  jest.spyOn(repositoty, 'findOne').mockImplementationOnce(find_one);

  return {
    findOne: find_one,
  };
}

export function findOneOrFailMock<T extends ObjectLiteral>(repositoty: Repository<T>, result?: T) {
  const find_one_or_fail: any = jest.fn(() => Promise.resolve(result));

  jest.spyOn(repositoty, 'findOneOrFail').mockImplementationOnce(find_one_or_fail);

  return {
    findOneOrFail: find_one_or_fail,
  };
}

export function countMock<T extends ObjectLiteral>(repositoty: Repository<T>, result: number = 0) {
  const count: any = jest.fn(() => Promise.resolve(result));

  jest.spyOn(repositoty, 'count').mockImplementationOnce(count);

  return {
    count,
  };
}
