'use client';

import type {CalendarProps, BadgeProps} from "antd";
import {Dayjs} from "dayjs";
import {Calendar, Badge} from 'antd';
import {useEffect, useState} from "react";
import {findsBusinessData} from "@/bonita/api/bdm/business-data-query";
import {getCurrentUserSession} from "@/bonita/api/system/session";
import {isSameDay} from 'date-fns'

interface E_leave {
    "persistenceId": number,
    "persistenceId_string": string,
    "persistenceVersion": number,
    "persistenceVersion_string": string,
    "status": any,
    "startDate": string,
    "endDate": string,
    "totalDays": number,
    "totalDays_string": string,
    "reason": string,
    "isApprove": any,
    "isCancel": any,
    "isReject": any,
    "cancelReason": any,
    "cancelDate": any,
    "approveDate": any,
    "rejectDate": any,
    "approveComment": any,
    "rejectComment": any,
    "createdDate": string,
    "createdBy": number,
    "createdBy_string": string,
    "links": [
        {
            "rel": string, // "employee"
            "href": string, // "/API/bdm/businessData/com.havako.model.office.Eleave/146/employee"
        },
        {
            "rel": string, // "leaveType"
            "href": string, // "/API/bdm/businessData/com.havako.model.office.Eleave/146/leaveType"
        }
    ]
}

interface LiType {
    persistenceId_string: string,
    type: string,
    content: string,
}

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


export default function E_leaveCalendar() {
    const [listOfE_leaves, setListOfE_leaves] = useState([])

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
            })
        }

        getE_leaves();
    }, []);

    const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {

        // get e_leaves of current date
        const currentDateE_leaves = listOfE_leaves.filter((e_leave: E_leave) => {
            return isSameDay(
                current.toDate(), new Date(e_leave.startDate)
            )
        })

        const listData = currentDateE_leaves.map((e_leave: E_leave) => {
            return {
                persistenceId_string: e_leave.persistenceId_string,
                type: 'success',
                content: e_leave.reason,
            }
        })

        return dateCellRender(current, listData);
    };

    return (
        <div>
            <Calendar cellRender={cellRender}/>
        </div>
    )
}