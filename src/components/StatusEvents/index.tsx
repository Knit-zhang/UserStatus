"use client";

import { STATUS_CONTRACT_ADDRESS } from "@/constants/addresses";
import EventCard from "@/components/EventCard";
import React from "react";
import { getContract, getContractEvents, prepareEvent } from "thirdweb";
import { client } from "@/app/client";
import { useContractEvents } from "thirdweb/react";
import { lineaSepolia } from "@/utils/linea-sepolia-chains";


export default function StatusEvents() {
    const contract = getContract({
        address: STATUS_CONTRACT_ADDRESS,
        chain: lineaSepolia,
        client
    })
    const StatusEvent = prepareEvent({
        signature: "event StatusUpdated(address indexed user, string newStatus, uint256 timestamp)" 
    })

    const { data: events, isLoading: isEventsLoading } = useContractEvents({
        contract,
        events: [StatusEvent],
    })

    return (
        <div>
            {!isEventsLoading && events && (
                events.slice(0, 30).map((event, index) => (
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
};