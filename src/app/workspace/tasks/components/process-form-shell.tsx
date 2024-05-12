'use client'

import {useEffect, useState} from "react";
import {useWindowSize} from "@uidotdev/usehooks";

export default function ProcessFormShell(
    {
        children,
        extraHeight = 0
    }: {
        children: React.ReactNode,
        extraHeight?: number
    }
) {
    const [height, setHeight] = useState<number>(0);
    const windowsSize = useWindowSize();

    /**
     * Dynamic height
     */
    useEffect(() => {
        if (windowsSize.height === null) {
            return;
        }
        let newHeight = 0;
        if (windowsSize.height >= 774) {
            newHeight = windowsSize.height - 390;
            setHeight(newHeight);
        }
        if (windowsSize.height < 774) {
            newHeight = windowsSize.height - 400;
        }
        setHeight(newHeight + extraHeight);
    }, [windowsSize]);

    return (
        <div className="flex-1 whitespace-pre-wrap p-4 text-sm overflow-auto"
             style={
                 {maxHeight: height}
             }
        >
            {children}
        </div>
    )
}