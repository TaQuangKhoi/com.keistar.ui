'use client';

import {Dayjs} from "dayjs";
import type {BadgeProps} from "antd";
import {Badge} from 'antd';

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import ProcessHoverCardContent from "@/app/workspace/office/e-leave/process-hover-card-content";

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
export default function DateCellRender(value: Dayjs, listData: LiType[]) {
    return (
        <ul className="events">
            {listData.map((item) => (
                <li key={item.persistenceId_string}>
                    <HoverCard>
                        <HoverCardTrigger>
                            <Badge className="hover:font-bold"
                                   status={item.type as BadgeProps['status']}
                                   text={item.content}/>
                        </HoverCardTrigger>
                        <HoverCardContent>
                            <ProcessHoverCardContent persistenceId_string={item.persistenceId_string}/>
                        </HoverCardContent>
                    </HoverCard>
                </li>
            ))}
        </ul>
    );
};