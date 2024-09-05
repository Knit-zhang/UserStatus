"use client";

import EventCard from "@/components/EventCard";
import { STATUS_CONTRACT_ADDRESS } from "@/constants/addresses";
import { lineaSepolia } from "@/utils/linea-sepolia-chains";
import { useParams } from "next/navigation";
import styles from '@/home.module.css';
import { getContract, prepareEvent } from "thirdweb";
import { client } from '@/app/client';
import { useContractEvents } from "thirdweb/react";
import { useRouter } from 'next/navigation';

export default function AccountFeed() {
    const { walletAddress } = useParams();
    const router = useRouter();
    const contract = getContract({
        client,
        address: STATUS_CONTRACT_ADDRESS,
        chain: lineaSepolia
    });

    const StatusEvent = prepareEvent({
        signature: "event StatusUpdated(address indexed user, string newStatus, uint256 timestamp)"
    })

    const { data: userEvents, isLoading: isUserEventsLoading } = useContractEvents({
        contract,
        events: [StatusEvent],
    })

    return (
        <div className={styles.container} style={{ maxWidth: "500px" }}>
            <button
                onClick={() => router.push("/")}
                className={styles.updateButton}
            >Back</button>
            <h1>Account Feed</h1>
            <p style={{ fontSize: "0.75rem" }}>{walletAddress}</p>
            <h3>Latest Updates:</h3>
            {!isUserEventsLoading && userEvents && (
                userEvents.slice(0, 20).filter(({args: {user}}) => user === walletAddress).map((event, index) => (
                    <EventCard
                        key={index}
                        walletAddress={event.args.user}
                        newStatus={event.args.newStatus}
                        timeStamp={event.args.timestamp}
                    />
                ))
            )}
        </div>
    )
}