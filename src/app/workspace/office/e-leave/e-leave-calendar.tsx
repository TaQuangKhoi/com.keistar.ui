'use client';

import type {CalendarProps, BadgeProps} from "antd";
import {Dayjs} from "dayjs";
import {Calendar, Badge} from 'antd';
import {useEffect, useState} from "react";
import findsBusinessData from "@/bonita/api/bdm/business-data-query";
import {useSession} from "@/bonita/api/system/get-the-current-user-session";
import {isSameDay, eachDayOfInterval} from 'date-fns'
import DateCellRender from "@/app/workspace/office/e-leave/date-cell-render";
import E_leave from "@/app/workspace/office/e-leave/e_leave_type";

// type extends E_leave
interface processedE_leave extends E_leave {
    date: Date,
}


export default function E_leaveCalendar() {
    const [listOfE_leaves, setListOfE_leaves] = useState([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [session]: [Session, boolean, any] = useSession()
    const [processedE_leaves, setProcessedE_leaves] = useState<processedE_leave[]>()

    /**
     * Get all process
     */
    useEffect(() => {
        let processedData: processedE_leave[] = [];
        listOfE_leaves.forEach((e_leave: E_leave, index: number) => {
            const dates = eachDayOfInterval(
                {
                    start: new Date(e_leave.startDate),
                    end: new Date(e_leave.endDate),
                }
            );

            dates.forEach((date: Date) => {
                processedData.push({
                    date: date,
                    reason: e_leave.reason,
                    persistenceId_string: e_leave.persistenceId_string,
                })
            });
        })
        setProcessedE_leaves(processedData);
    }, [listOfE_leaves]);

    /**
     * Get all eleaves of current user
     */
    useEffect(() => {
        const getE_leaves = async () => {
            const user_id = session.user_id as unknown as string;

            if (user_id === undefined) {
                return;
            }

            const eLeave = await findsBusinessData(
                "com.keistar.model.office.Eleave", "findByCreatedBy", 0, 20,
                {
                    "createdBy": user_id
                }
            )

            if (eLeave.length !== 0) {
                setListOfE_leaves(eLeave);
            }
            setIsLoading(false);
        }

        getE_leaves();
    }, [session]);

    /**
     * Render processed cells of calendar
     * @param current
     * @param info
     */
    const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
        const processedData = processedE_leaves as processedE_leave[];

        if (processedData === undefined) {
            return;
        }

        // get e_leaves of current date
        const currentDateE_leaves = processedData.filter((e_leave: processedE_leave) => {
            return isSameDay(
                current.toDate(), new Date(e_leave.date)
            )
        })

        const listData = currentDateE_leaves.map((e_leave: E_leave) => {
            return {
                persistenceId_string: e_leave.persistenceId_string,
                type: 'success',
                content: e_leave.reason,
            }
        })

        if (processedData.length === 0) {
            if (isLoading)
                return <p>Loading...</p>;
            else
                return <p></p>;
        }

        if (processedData.length > 0 && !isLoading) {
            return DateCellRender(current, listData);
        }
    };

    return (
        <div>
            <Calendar cellRender={cellRender}/>
        </div>
    )
}