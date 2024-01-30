/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Context,
  Pda,
  PublicKey,
  Signer,
  TransactionBuilder,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  mapSerializer,
  struct,
  u8,
} from '@metaplex-foundation/umi/serializers';
import { findMetadataPda } from '../accounts';
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  expectPublicKey,
  getAccountMetasAndSigners,
} from '../shared';

// Accounts.
export type SetTokenStandardInstructionAccounts = {
  /** Metadata account */
  metadata?: PublicKey | Pda;
  /** Metadata update authority */
  updateAuthority?: Signer;
  /** Mint account */
  mint: PublicKey | Pda;
  /** Edition account */
  edition?: PublicKey | Pda;
};

// Data.
export type SetTokenStandardInstructionData = { discriminator: number };

export type SetTokenStandardInstructionDataArgs = {};

export function getSetTokenStandardInstructionDataSerializer(): Serializer<
  SetTokenStandardInstructionDataArgs,
  SetTokenStandardInstructionData
> {
  return mapSerializer<
    SetTokenStandardInstructionDataArgs,
    any,
    SetTokenStandardInstructionData
  >(
    struct<SetTokenStandardInstructionData>([['discriminator', u8()]], {
      description: 'SetTokenStandardInstructionData',
    }),
    (value) => ({ ...value, discriminator: 35 })
  ) as Serializer<
    SetTokenStandardInstructionDataArgs,
    SetTokenStandardInstructionData
  >;
}

// Instruction.
export function setTokenStandard(
  context: Pick<Context, 'eddsa' | 'identity' | 'programs'>,
  input: SetTokenStandardInstructionAccounts
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplTokenMetadata',
    'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
  );

  // Accounts.
  const resolvedAccounts = {
    metadata: {
      index: 0,
      isWritable: true as boolean,
      value: input.metadata ?? null,
    },
    updateAuthority: {
      index: 1,
      isWritable: false as boolean,
      value: input.updateAuthority ?? null,
    },
    mint: { index: 2, isWritable: false as boolean, value: input.mint ?? null },
    edition: {
      index: 3,
      isWritable: false as boolean,
      value: input.edition ?? null,
    },
  } satisfies ResolvedAccountsWithIndices;

  // Default values.
  if (!resolvedAccounts.metadata.value) {
    resolvedAccounts.metadata.value = findMetadataPda(context, {
      mint: expectPublicKey(resolvedAccounts.mint.value),
    });
  }
  if (!resolvedAccounts.updateAuthority.value) {
    resolvedAccounts.updateAuthority.value = context.identity;
  }

  // Accounts in order.
  const orderedAccounts: ResolvedAccount[] = Object.values(
    resolvedAccounts
  ).sort((a, b) => a.index - b.index);

  // Keys and Signers.
  const [keys, signers] = getAccountMetasAndSigners(
    orderedAccounts,
    'omitted',
    programId
  );

  // Data.
  const data = getSetTokenStandardInstructionDataSerializer().serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
