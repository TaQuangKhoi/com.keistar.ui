import {FullHumanTask} from "@/bonita/api/bpm/human-task/types";
import ProcessFormInput, {ProcessForInput} from "@/app/workspace/tasks/components/process-form-input";
import {useGetContextByUserTaskId} from "@/bonita/api/bpm/user-task/definitions/finds-context-by-user-task-id";
import {useEffect, useState} from "react";
import callLink from "@/bonita/api/bdm/call-link";
import Travel_Item from "@/app/workspace/office/travel/types/travel-interface";

export default function TravelForm({task}: { task: FullHumanTask }) {
    const [context, ,] = useGetContextByUserTaskId(task.id);
    const [travelRequest, setTravelRequest] = useState<Travel_Item>()

    useEffect(() => {
        if (context != undefined) {
            const getData = async () => {
                const data = await callLink(context.newTravelRequest_ref.link)
                setTravelRequest(data)
            }
            getData()
        }
    }, [context]);

    // console.debug("TravelForm", task)
    let data: ProcessForInput[] = [
        {
            key: "Start Date",
            value: travelRequest?.startDate,
        },
        {
            key: "End Date",
            value: travelRequest?.endDate,
        },
        {
            key: "Total Days",
            value: travelRequest?.totalDays,
        },
        {
            key: "Country",
            value: travelRequest?.country?.name,
        },
        {
            key: "Location",
            value: travelRequest?.location,
        },

    ]

    return <>
        <ProcessFormInput data={data}/>
    </>
}