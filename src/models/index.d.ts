import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerAttachments = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Attachments, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email: string;
  readonly filename?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAttachments = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Attachments, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email: string;
  readonly filename?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Attachments = LazyLoading extends LazyLoadingDisabled ? EagerAttachments : LazyAttachments

export declare const Attachments: (new (init: ModelInit<Attachments>) => Attachments) & {
  copyOf(source: Attachments, mutator: (draft: MutableModel<Attachments>) => MutableModel<Attachments> | void): Attachments;
}

type EagerRequests = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Requests, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email: string;
  readonly ragione_sociale?: string | null;
  readonly sede_legale?: string | null;
  readonly codice_fiscale?: string | null;
  readonly partita_iva?: string | null;
  readonly referente?: string | null;
  readonly ruolo?: string | null;
  readonly telefono?: string | null;
  readonly produttore?: string | null;
  readonly conferitore?: string | null;
  readonly intermediario_commerciale?: string | null;
  readonly anga?: (string | null)[] | null;
  readonly anga2?: (string | null)[] | null;
  readonly anga3?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRequests = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Requests, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email: string;
  readonly ragione_sociale?: string | null;
  readonly sede_legale?: string | null;
  readonly codice_fiscale?: string | null;
  readonly partita_iva?: string | null;
  readonly referente?: string | null;
  readonly ruolo?: string | null;
  readonly telefono?: string | null;
  readonly produttore?: string | null;
  readonly conferitore?: string | null;
  readonly intermediario_commerciale?: string | null;
  readonly anga?: (string | null)[] | null;
  readonly anga2?: (string | null)[] | null;
  readonly anga3?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Requests = LazyLoading extends LazyLoadingDisabled ? EagerRequests : LazyRequests

export declare const Requests: (new (init: ModelInit<Requests>) => Requests) & {
  copyOf(source: Requests, mutator: (draft: MutableModel<Requests>) => MutableModel<Requests> | void): Requests;
}

type EagerUsers = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Users, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email: string;
  readonly ragione_sociale: string;
  readonly sede_legale: string;
  readonly codice_fiscale?: string | null;
  readonly partita_iva?: string | null;
  readonly referente?: string | null;
  readonly ruolo?: string | null;
  readonly telefono?: string | null;
  readonly produttore?: boolean | null;
  readonly conferitore?: boolean | null;
  readonly intermediario_commerciale?: boolean | null;
  readonly anga?: (string | null)[] | null;
  readonly anga2?: (string | null)[] | null;
  readonly anga3?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUsers = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Users, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email: string;
  readonly ragione_sociale: string;
  readonly sede_legale: string;
  readonly codice_fiscale?: string | null;
  readonly partita_iva?: string | null;
  readonly referente?: string | null;
  readonly ruolo?: string | null;
  readonly telefono?: string | null;
  readonly produttore?: boolean | null;
  readonly conferitore?: boolean | null;
  readonly intermediario_commerciale?: boolean | null;
  readonly anga?: (string | null)[] | null;
  readonly anga2?: (string | null)[] | null;
  readonly anga3?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Users = LazyLoading extends LazyLoadingDisabled ? EagerUsers : LazyUsers

export declare const Users: (new (init: ModelInit<Users>) => Users) & {
  copyOf(source: Users, mutator: (draft: MutableModel<Users>) => MutableModel<Users> | void): Users;
}