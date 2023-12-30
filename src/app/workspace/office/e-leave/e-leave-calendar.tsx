'use client';

import type {CalendarProps, BadgeProps} from "antd";
import {Dayjs} from "dayjs";
import {Calendar, Badge} from 'antd';
import {useEffect, useState} from "react";
import {findsBusinessData} from "@/bonita/api/bdm/business-data-query";
import {getCurrentUserSession} from "@/bonita/api/system/session";
import {isSameDay, eachDayOfInterval} from 'date-fns'

interface E_leave {
    persistenceId?: number | any,
    persistenceId_string?: string | any,
    persistenceVersion?: number | any,
    persistenceVersion_string?: string | any,
    status?: any,
    startDate?: string | any,
    endDate?: string | any,
    totalDays?: number | any,
    totalDays_string?: string | any,
    reason?: string | any,
    isApprove?: any,
    isCancel?: any,
    isReject?: any,
    cancelReason?: any,
    cancelDate?: any,
    approveDate?: any,
    rejectDate?: any,
    approveComment?: any,
    rejectComment?: any,
    createdDate?: string | any,
    createdBy?: number | any,
    createdBy_string?: string | any,
    links?: [
        {
            "rel": string, // "employee"
            "href": string, // "/API/bdm/businessData/com.havako.model.office.Eleave/146/employee"
        },
        {
            "rel": string, // "leaveType"
            "href": string, // "/API/bdm/businessData/com.havako.model.office.Eleave/146/leaveType"
        }
    ],
}

interface LiType {
    persistenceId_string: string,
    type: string,
    content: string,
}

/**
 * Render one cell of calendar
 * @param value
 * @param listData
 */
const dateCellRender = (value: Dayjs, listData: LiType[]) => {
    return (
        <ul className="events">
            {listData.map((item) => (
                <li key={item.persistenceId_string}>
                    <Badge status={item.type as BadgeProps['status']} text={item.content}/>
                </li>
            ))}
        </ul>
    );
};

// type extends E_leave
interface processedE_leave extends E_leave {
    date: Date,
}


export default function E_leaveCalendar() {
    const [listOfE_leaves, setListOfE_leaves] = useState([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    function processData() {
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
        return processedData;
    }

    useEffect(() => {
        const getE_leaves = async () => {
            const session = await getCurrentUserSession().then(function (response) {
                return response.data;
            })

            const user_id = session.user_id

            await findsBusinessData(
                "com.havako.model.office.Eleave", "findByCreatedBy", 0, 20,
                {
                    "createdBy": user_id
                }
            ).then(function (response) {
                setListOfE_leaves(response.data);
                setIsLoading(false);
            })
        }

        getE_leaves();
    }, []);

    /**
     * Render processed cells of calendar
     * @param current
     * @param info
     */
    const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
        const processedData = processData();

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

        if (processedData.length === 0 && isLoading) {
            return <p>Loading...</p>;
        }

        if (processedData.length > 0 && !isLoading) {
            return dateCellRender(current, listData);
        }
    };

    return (
        <div>
            <Calendar cellRender={cellRender}/>
        </div>
    )
}