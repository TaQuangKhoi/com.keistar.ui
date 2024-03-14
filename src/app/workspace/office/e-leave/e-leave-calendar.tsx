'use client';

import type {CalendarProps, BadgeProps} from "antd";
import {Dayjs} from "dayjs";
import {Calendar, Badge} from 'antd';
import {useEffect, useState} from "react";
import {findsBusinessData} from "@/bonita/api/bdm/business-data-query";
import {getCurrentUserSession} from "@/bonita/api/system/get-the-current-user-session";
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

    /**
     * Get all process
     */
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
            return DateCellRender(current, listData);
        }
    };

    return (
        <div>
            <Calendar cellRender={cellRender}/>
        </div>
    )
}