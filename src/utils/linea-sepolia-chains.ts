import { Chain } from 'thirdweb'

export const lineaSepolia: Chain = {
    id: 59141,
    name: 'Linea Sepolia',
    nativeCurrency: {
        decimals: 18,
        name: 'Linea Ether',
        symbol: 'ETH',
    },
    rpc: 'https://rpc.sepolia.linea.build',
    testnet: true,
    blockExplorers: [
        {
        name: 'LineaScan',
        url: "https://sepolia.lineascan.build",
        }
    ]
}
