"use client";

import Link from 'next/link';
import styles from '@/home.module.css';
import { truncateAddress } from '@/utils/truncateAddress';

type EventCardProps = {
    // 账户地址
    walletAddress: string;
    // 账户状态信息
    newStatus: string;
    // 账户发布状态的时间
    timeStamp: bigint;
};

export default function EventCard(props: EventCardProps) {
    const date = new Date(Number(props.timeStamp) * 1000) 
    return (
        <div className={styles.eventCard}>
            <div className={styles.eventHeader}>
		            {/* 设置账户地址的链接 */}
                <Link href={`account/${props.walletAddress}`} style={{ color: "white" }}>
		                {/* 通过截取地址，以便更友好地展示 */}
                    <p className={styles.connectedAddress}>{truncateAddress(props.walletAddress)}</p>
                </Link>
                {/* 格式化日期 */}
                <p style={{ fontSize: "0.75rem" }}>{date.toLocaleString()}</p>
            </div>
            {/* 当前用户的状态 */}
            <p style={{ fontSize: "16px"}}>{props.newStatus}</p>
        </div>
    );   
}