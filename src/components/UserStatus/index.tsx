"use client";

import { useActiveAccount, useActiveWallet, useDisconnect, useReadContract, ConnectButton, TransactionButton } from "thirdweb/react";
import { lineaSepolia } from "@/utils/linea-sepolia-chains";
import styles from "@/home.module.css";
import { client } from "@/app/client";
import { useState } from "react";
import { getContract, prepareContractCall } from "thirdweb";
import { STATUS_CONTRACT_ADDRESS } from "@/constants/addresses";
import { truncateAddress } from "@/utils/truncateAddress";
import Link  from 'next/link';

export default function UserStatus() {
    const account = useActiveAccount();
    const { disconnect } = useDisconnect();
    const wallet = useActiveWallet()
    const [newStatus, setNewStatus] = useState("");
    const [characterCount, setCharacterCount] = useState(0);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const characterDecoration = characterCount >= 140 ? styles.characterCountOver : styles.characterCountUnder;

    const contract = getContract({
        client,
        address: STATUS_CONTRACT_ADDRESS,
        chain: lineaSepolia
    });
    const address = account?.address;

    const { data: myStatus, isLoading: isMyStatusLoading } = useReadContract({
        contract,
        method: "function getStatus(address _user) view returns (string)",
        params: [address!],
    });

    if (!account?.address || !wallet) {
        return (
            <div>
                <p>Please Connect your wallet.</p>
                <ConnectButton client={client} chain={lineaSepolia} />
            </div>
        )
    }

    

    return (
        <div className={styles.userContainer}>
            <div className={styles.statusHeader}>
                {/* 展示当前账户地址 */}
                <Link href={`/account/${address}`} style={{ color: "white"}}>
                    <p className={styles.connectedAddress}>{truncateAddress(address!)}</p>
                </Link>
                {/* 推出登陆按钮 */}
                <button
                    className={styles.logoutButton}
                    onClick={() => disconnect(wallet)}
                >Logout</button>
            </div>
            
            {/* 展示当前账户的状态 */}
            {!isMyStatusLoading && myStatus && (
                <div>
                    <p className={styles.statusText}>{myStatus}</p>
                </div>
            )}

            <button 
                className={styles.updateButton}
                onClick={() => setIsStatusModalOpen(true)}
            >Update</button>

            {isStatusModalOpen && (
                <div className={styles.statusModalContainer}>
                    <div className={styles.statusModal}>
                        <div className={styles.statusModalHeader}>
                            <p>New Status:</p>
                            <button
                                onClick={() => setIsStatusModalOpen(false)}
                            >Close</button>
                        </div>
                        <textarea
                            value={newStatus}
                            onChange={(e) => {
                                setNewStatus(e.target.value)
                                setCharacterCount(e.target.value.length)
                            }}
                            placeholder="Enter your status"
                        />
                        <div className={styles.characterCountContainer}>
                            <p className={characterDecoration}>{characterCount}/140</p>
                        </div>
                        <TransactionButton
                            className={styles.statusModalButton}
                            transaction={() => prepareContractCall({contract, method: "function setStatus(string _status)", params: [newStatus]})}
                            disabled={characterCount === 0 || characterCount > 140}
                            onTransactionConfirmed={() => {
                                setIsStatusModalOpen(false);
                                setNewStatus("");
                            }}
                        >Update Status</TransactionButton>
                    </div>
                </div>
            )}
        </div>
    )
}