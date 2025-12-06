import { create } from 'ipfs-http-client';

const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
});

export const uploadToIPFS = async (data: any) => {
  const { cid } = await client.add(data);
  return cid;
};
