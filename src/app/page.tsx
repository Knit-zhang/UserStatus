"use client";

import styles from '@/home.module.css';
import UserStatus from "@/components/UserStatus";
import StatusEvents from '@/components/StatusEvents';

export default function Home() {
  return (
    <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.statusContainer}>
            <UserStatus />
          </div>
          {/* 增加状态流组件 */}
          <h3>Status Feed:</h3>
          <StatusEvents />
        </div>
    </main>
  );
}

