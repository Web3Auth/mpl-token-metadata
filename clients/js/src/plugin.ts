import { UmiPlugin } from '@metaplex-foundation/umi';
import { mplToolbox } from '@web3auth/mpl-toolbox';
import { createMplTokenMetadataProgram } from './generated';

export const mplTokenMetadata = (): UmiPlugin => ({
  install(umi) {
    umi.use(mplToolbox());
    umi.programs.add(createMplTokenMetadataProgram(), false);
  },
});
