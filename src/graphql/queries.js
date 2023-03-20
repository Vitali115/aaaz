/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAttachments = /* GraphQL */ `
  query GetAttachments($id: ID!) {
    getAttachments(id: $id) {
      id
      email
      filename
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listAttachments = /* GraphQL */ `
  query ListAttachments(
    $filter: ModelAttachmentsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAttachments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        filename
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncAttachments = /* GraphQL */ `
  query SyncAttachments(
    $filter: ModelAttachmentsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAttachments(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        email
        filename
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getRequests = /* GraphQL */ `
  query GetRequests($id: ID!) {
    getRequests(id: $id) {
      id
      email
      ragione_sociale
      sede_legale
      codice_fiscale
      partita_iva
      referente
      ruolo
      telefono
      produttore
      conferitore
      intermediario_commerciale
      anga
      anga2
      anga3
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listRequests = /* GraphQL */ `
  query ListRequests(
    $filter: ModelRequestsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRequests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        ragione_sociale
        sede_legale
        codice_fiscale
        partita_iva
        referente
        ruolo
        telefono
        produttore
        conferitore
        intermediario_commerciale
        anga
        anga2
        anga3
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncRequests = /* GraphQL */ `
  query SyncRequests(
    $filter: ModelRequestsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncRequests(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        email
        ragione_sociale
        sede_legale
        codice_fiscale
        partita_iva
        referente
        ruolo
        telefono
        produttore
        conferitore
        intermediario_commerciale
        anga
        anga2
        anga3
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getUsers = /* GraphQL */ `
  query GetUsers($id: ID!) {
    getUsers(id: $id) {
      id
      email
      ragione_sociale
      sede_legale
      codice_fiscale
      partita_iva
      referente
      ruolo
      telefono
      produttore
      conferitore
      intermediario_commerciale
      anga
      anga2
      anga3
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        ragione_sociale
        sede_legale
        codice_fiscale
        partita_iva
        referente
        ruolo
        telefono
        produttore
        conferitore
        intermediario_commerciale
        anga
        anga2
        anga3
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUsersFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        email
        ragione_sociale
        sede_legale
        codice_fiscale
        partita_iva
        referente
        ruolo
        telefono
        produttore
        conferitore
        intermediario_commerciale
        anga
        anga2
        anga3
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
