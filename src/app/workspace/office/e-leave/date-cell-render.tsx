import {Dayjs} from "dayjs";
import type {BadgeProps} from "antd";
import {Badge} from 'antd';

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
                    <Badge status={item.type as BadgeProps['status']} text={item.content}/>
                </li>
            ))}
        </ul>
    );
};