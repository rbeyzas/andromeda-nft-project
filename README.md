# NFT Certificate Platform

This project combines a Next.js frontend with blockchain NFT functionality to create a certificate platform where educational institutions can issue verifiable certificates as NFTs, and students can collect and manage their educational achievements in a digital portfolio.

## Features

- **NFT Certificates**: Educational certificates are stored as NFTs on the blockchain
- **Institution Profiles**: Educational institutions can create profiles and issue certificates
- **Student Portfolios**: Students can collect and showcase their educational achievements
- **Verification**: All certificates are verifiable on the blockchain

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Main Pages

- **Home**: `/` - Landing page with introduction
- **Certificates Platform**: `/certificate` - Main certificate platform page
- **Institution Page**: `/certificate/institutions/[id]` - View specific institution
- **Collection Page**: `/certificate/collection/[address]` - View certificates in a collection
- **Certificate Detail**: `/certificate/[collection]/[id]` - View certificate details
- **User Portfolio**: `/certificate/portfolio` - View your certificate portfolio

## Educational Use Cases

This platform is designed for:

1. **Educational Institutions** that want to issue verifiable certificates
2. **Students** who want to maintain a verifiable portfolio of achievements
3. **Employers** who want to verify the authenticity of certificates

## Technical Information

The project is built using:

- [Next.js](https://nextjs.org/) - React framework for the frontend
- [Chakra UI](https://chakra-ui.com/) - Component library for UI
- [CosmWasm](https://cosmwasm.com/) - Smart contract platform
- [CW721](https://github.com/CosmWasm/cw-nfts) - NFT standard for certificates

## License

[Terms and Conditions](https://github.com/andromedaprotocol/andromeda-core/blob/development/LICENSE/LICENSE.md)

# andromeda-nft-project
