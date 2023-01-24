/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  AccountMeta,
  Context,
  PublicKey,
  Serializer,
  Signer,
  WrappedInstruction,
  checkForIsWritableOverride as isWritable,
  mapSerializer,
  publicKey,
} from '@lorisleiva/js-core';
import { findMasterEditionPda, findMetadataPda } from '../accounts';
import { UpdateArgs, UpdateArgsArgs, getUpdateArgsSerializer } from '../types';

// Accounts.
export type UpdateInstructionAccounts = {
  /** Update authority or delegate */
  authority?: Signer;
  /** Delegate record PDA */
  delegateRecord?: PublicKey;
  /** Token account */
  token?: PublicKey;
  /** Mint account */
  mint: PublicKey;
  /** Metadata account */
  metadata?: PublicKey;
  /** Edition account */
  edition?: PublicKey;
  /** Payer */
  payer?: Signer;
  /** System program */
  systemProgram?: PublicKey;
  /** System program */
  sysvarInstructions?: PublicKey;
  /** Token Authorization Rules Program */
  authorizationRulesProgram?: PublicKey;
  /** Token Authorization Rules account */
  authorizationRules?: PublicKey;
};

// Arguments.
export type UpdateInstructionData = {
  discriminator: number;
  updateArgs: UpdateArgs;
};

export type UpdateInstructionArgs = { updateArgs: UpdateArgsArgs };

export function getUpdateInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<UpdateInstructionArgs, UpdateInstructionData> {
  const s = context.serializer;
  return mapSerializer<
    UpdateInstructionArgs,
    UpdateInstructionData,
    UpdateInstructionData
  >(
    s.struct<UpdateInstructionData>(
      [
        ['discriminator', s.u8],
        ['updateArgs', getUpdateArgsSerializer(context)],
      ],
      'UpdateInstructionArgs'
    ),
    (value) => ({ discriminator: 50, ...value } as UpdateInstructionData)
  ) as Serializer<UpdateInstructionArgs, UpdateInstructionData>;
}

// Instruction.
export function update(
  context: Pick<
    Context,
    'serializer' | 'programs' | 'eddsa' | 'identity' | 'payer'
  >,
  input: UpdateInstructionAccounts & UpdateInstructionArgs
): WrappedInstruction {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId: PublicKey =
    context.programs.get('mplTokenMetadata').publicKey;

  // Resolved accounts.
  const authorityAccount = input.authority ?? context.identity;
  const delegateRecordAccount = input.delegateRecord;
  const tokenAccount = input.token;
  const mintAccount = input.mint;
  const metadataAccount =
    input.metadata ??
    findMetadataPda(context, { mint: publicKey(mintAccount) });
  const editionAccount =
    input.edition ??
    findMasterEditionPda(context, { mint: publicKey(mintAccount) });
  const payerAccount = input.payer ?? context.payer;
  const systemProgramAccount = input.systemProgram ?? {
    ...context.programs.get('splSystem').publicKey,
    isWritable: false,
  };
  const sysvarInstructionsAccount =
    input.sysvarInstructions ??
    publicKey('Sysvar1nstructions1111111111111111111111111');
  const authorizationRulesProgramAccount = input.authorizationRulesProgram;
  const authorizationRulesAccount = input.authorizationRules;

  // Authority.
  signers.push(authorityAccount);
  keys.push({
    pubkey: authorityAccount.publicKey,
    isSigner: true,
    isWritable: isWritable(authorityAccount, false),
  });

  // Delegate Record (optional).
  if (delegateRecordAccount) {
    keys.push({
      pubkey: delegateRecordAccount,
      isSigner: false,
      isWritable: isWritable(delegateRecordAccount, false),
    });
  }

  // Token (optional).
  if (tokenAccount) {
    keys.push({
      pubkey: tokenAccount,
      isSigner: false,
      isWritable: isWritable(tokenAccount, false),
    });
  }

  // Mint.
  keys.push({
    pubkey: mintAccount,
    isSigner: false,
    isWritable: isWritable(mintAccount, false),
  });

  // Metadata.
  keys.push({
    pubkey: metadataAccount,
    isSigner: false,
    isWritable: isWritable(metadataAccount, true),
  });

  // Edition.
  keys.push({
    pubkey: editionAccount,
    isSigner: false,
    isWritable: isWritable(editionAccount, true),
  });

  // Payer.
  signers.push(payerAccount);
  keys.push({
    pubkey: payerAccount.publicKey,
    isSigner: true,
    isWritable: isWritable(payerAccount, true),
  });

  // System Program.
  keys.push({
    pubkey: systemProgramAccount,
    isSigner: false,
    isWritable: isWritable(systemProgramAccount, false),
  });

  // Sysvar Instructions.
  keys.push({
    pubkey: sysvarInstructionsAccount,
    isSigner: false,
    isWritable: isWritable(sysvarInstructionsAccount, false),
  });

  // Authorization Rules Program (optional).
  if (authorizationRulesProgramAccount) {
    keys.push({
      pubkey: authorizationRulesProgramAccount,
      isSigner: false,
      isWritable: isWritable(authorizationRulesProgramAccount, false),
    });
  }

  // Authorization Rules (optional).
  if (authorizationRulesAccount) {
    keys.push({
      pubkey: authorizationRulesAccount,
      isSigner: false,
      isWritable: isWritable(authorizationRulesAccount, false),
    });
  }

  // Data.
  const data = getUpdateInstructionDataSerializer(context).serialize(input);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return {
    instruction: { keys, programId, data },
    signers,
    bytesCreatedOnChain,
  };
}
