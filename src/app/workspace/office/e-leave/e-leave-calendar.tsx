'use client';

import type {CalendarProps} from "antd";
import type {Dayjs} from "dayjs";
import {Calendar} from 'antd';

export default function E_leaveCalendar() {
    const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
        return <div>Hảo Có Nhớ Khôi Không?</div>;
    };

    return (
        <div>
            <Calendar cellRender={cellRender}/>
        </div>
    )
}